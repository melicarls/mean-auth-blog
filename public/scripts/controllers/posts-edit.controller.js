PostsEditController.$inject = ["$location", "$http", "$routeParams", "PostService"]; // minification protection
function PostsEditController ($location, $http, $routeParams, PostService) {
  var vm = this;
  vm.post = {}; // form data

  vm.update = update;
  vm.destroy = destroy;

  var postId = $routeParams.id;

  showPost(postId);

  function destroy() {
    PostService.destroy(postId).then(onDeleteSuccess, onError);
    function onDeleteSuccess(response) {
      console.log("Deleted!");
      $location.path('/');
    }
    function onError(error) {
      console.log("There was an error deleting the post", error);
    }
  }

  function update() {
    PostService.update(vm.post).then(onEditSuccess, onError);
    function onEditSuccess(response) {
      console.log("Got this back from the edit", response);
      $location.path('/api/posts/' + response.id);
    }
    function onError(error) {
      console.log("There was an error editing the post", error);
    }
  }

  function showPost(id) {
    PostService.get(id).then(onShowSuccess, onError);
    function onShowSuccess(response) {
      console.log("Here's the post you're looking at after the request", response);
      vm.post = response;

      //Might want to break this out into a service (post.service) since it will probably be used elsewhere
      vm.buttonShow = function (currentUser) {
        console.log("Checking this user", currentUser, "against this post", vm.post);
        return (vm.post.user._id === currentUser.user_id);
      };
    }
    function onError(error) {
      console.log("There was an error", error);
      $location.path('/');
    }
  }

}
