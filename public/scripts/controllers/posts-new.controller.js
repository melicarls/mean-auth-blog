PostsNewController.$inject = ["$location", "$http", "PostService"]; // minification protection
function PostsNewController ($location, $http, PostService) {
  var vm = this;
  vm.post = {}; // form data
  vm.create = create;

  function create() {
    PostService.create(vm.post).then(onNewSuccess, onError);
    function onNewSuccess(response) {
      console.log("Controller got this new post info", response);
      $location.path('/posts/' + response._id);
    }
    function onError(response) {
      console.log("There was an error creating the post", response);
    }
  }

}
