PostsIndexController.$inject = ["$http", "PostService"]; // minification protection
function PostsIndexController ($http, PostService) {
  var vm = this;
  vm.posts = [];

  query(); // fetch all the posts (index)

  ////

  function query() {
    PostService.query().then(onSuccess, onError);
      function onSuccess(response) {
        vm.posts = response;
      }
      function onError(error) {
        vm.posts = error;
      }
  }
}
