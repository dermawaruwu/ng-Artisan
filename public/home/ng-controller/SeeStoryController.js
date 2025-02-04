angular.module('SeeStoryController', [])

.controller('SeeStoryController', function($scope, Story, Comment, $routeParams) {


        $scope.storyLoading = true;
        $scope.loved = false;
        $scope.commentLoading = true;

        /**
        * used to get story data
        * use function from StoryService
        */
        var story_id = $routeParams.storyId;

        Story.see(story_id)
            .success(function (response) {
                $scope.story = response;
                $scope.storyLoading = false;
            });

        Comment.get(story_id)
            .success(function (response) {
                $scope.comments = response;
                $scope.commentLoading = false;
            });

        $scope.love = function (story_id) {

            Story.love(story_id)
                .success(function (response) {
                    $scope.loved = true;
                })

        };


        $scope.postComment = function (story_id) {

            var storyId = story_id;
            $scope.commentLoading = true;
            $scope.dataComment.story_id =  storyId;
            console.log($scope.dataComment);
            Comment.save($scope.dataComment)
                .success(function (response) {
                    $scope.dataComment = {};

                    Comment.get(story_id)
                        .success(function (response) {
                            $scope.comments = response;
                            $scope.commentLoading = false;
                        });

                })

        };

});
