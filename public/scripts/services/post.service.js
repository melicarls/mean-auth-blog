PostService.$inject = ["$http", "$q", "$auth"];
function PostService($http, $q, $auth) {
  var self = this;
  self.post = {};
  self.posts = [];
  self.query = query;
  self.get = get;
  self.create = create;
  self.destroy = destroy;
  self.update = update;

  function query() {
    var def = $q.defer();
    $http({
      method: 'GET',
      url: '/api/posts'
    }).then(onSuccess, onError);
    return def.promise;
    function onSuccess(response) {
      self.posts = response.data;
      def.resolve(self.posts);
    }
    function onError(error) {
      console.log("There was an error getting all posts", error);
      self.posts = {error: error};
      def.reject(self.posts);
    }
  }


///
  function get(id) {
    var def = $q.defer();
    console.log("Show post called");
    $http({
      method: 'GET',
      url: '/api/posts/' + id
    }).then(getSuccess, onError);
    return def.promise;

    function getSuccess(response) {
      console.log("Here's the post you're looking at", response);
      self.post = response.data;
      def.resolve(self.post);
    }

    function onError(error) {
      console.log("There was an error", error);
      self.post = {error: error};
      def.reject(self.post);
    }
  }

////
  function create(newPost) {
    var def = $q.defer();
    $http({
      method: 'POST',
      url: '/api/posts',
      data: newPost
    }).then(onCreateSuccess, onError);
    return def.promise;

    function onCreateSuccess(response) {
      self.post = response.data;
      def.resolve(self.post);
    }
    function onError(response) {
      self.post = response.data;
      def.resolve(self.post);
    }
  }

/////
  function destroy(postId) {
    var def = $q.defer();
    $http({
      method: 'DELETE',
      url: '/api/posts/' + postId,
    }).then(onDeleteSuccess, onError);
    return def.promise;

    function onDeleteSuccess(response) {
      self.post = {};
      def.resolve(self.post);
    }
    function onError(error) {
      self.post = response.data;
      def.resolve(self.post);
    }
  }

  ////
  function update(thisPost) {
    var def = $q.defer();
    $http({
      method: 'PUT',
      url: '/api/posts/' + thisPost._id,
      data: thisPost,
    }).then(onEditSuccess, onError);
    return def.promise;
    function onEditSuccess(response) {
      self.post = response.data;
      def.resolve(self.post);
    }

    function onError(error) {
      self.post = response.data;
      def.resolve(self.post);  }
  }

}
