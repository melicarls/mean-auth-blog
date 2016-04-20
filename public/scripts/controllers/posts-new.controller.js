PostsNewController.$inject = ["$location", "$http"]; // minification protection
function PostsNewController ($location, $http) {
  var vm = this;
  vm.post = {}; // form data
  vm.create = create;

  function create() {
    $http({
      method: 'POST',
      url: '/api/posts',
      data: vm.post
    }).then(onNewSuccess, onError);

    function onNewSuccess(response) {
      console.log("Controller got this new post info", response);
      $location.path('/posts/' + response.data._id);
    }

    function onError(response) {
      console.log("There was an error creating the post", response);
    }
  }

}
