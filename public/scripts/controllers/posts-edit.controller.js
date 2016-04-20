PostsEditController.$inject = ["$location", "$http", "$routeParams"]; // minification protection
function PostsEditController ($location, $http, $routeParams) {
  var vm = this;
  vm.post = {}; // form data

  vm.update = update;

  var postId = $routeParams.id;

  showPost(postId);

  function update() {
    $http({
      method: 'PUT',
      url: '/api/posts/' + postId,
      data: vm.post,
    }).then(onEditSuccess, onError);

    function onEditSuccess(response) {
      console.log("Got this back from the edit", response);
      $location.path('/api/posts/' + response.data.id);
    }

    function onError(error) {
      console.log("There was an error editing the post", error);
    }
  }

  function showPost(id) {
    console.log("Show post called from the edit screen");
    $http({
      method: 'GET',
      url: '/api/posts/' + id
    }).then(onShowSuccess, onError);

    function onShowSuccess(response) {
      console.log("Here's the post you're looking at", response);
      vm.post = response.data;
    }

    function onError(error) {
      console.log("There was an error getting the post data", error);
      $location.path('/');
    }
  }

}
