PostsShowController.$inject = ["$location", "$http", "$routeParams"]; // minification protection
function PostsShowController ($location, $http, $routeParams) {
  var vm = this;
  vm.post = {};

  var postId = $routeParams.id;

  showPost(postId);

  function showPost(id) {
    console.log("Show post called");
    $http({
      method: 'GET',
      url: '/api/posts/' + id
    }).then(onShowSuccess, onError);

    function onShowSuccess(response) {
      console.log("Here's the post you're looking at", response);
      vm.post = response.data;

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
