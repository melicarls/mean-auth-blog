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
    }

    function onError(error) {
      console.log("There was an error", error);
      $location.path('/');
    }
  }
}
