var request = function(url, callback) {
  $.ajax({
    url: url,
    dataType: 'jsonp',
    jsonp: 'jsonp',
    success: function(data) {
      callback(data);
    }
  });
};

var renderUser = function(user) {
  request('http://www.reddit.com/user/'+user+'/about.json', function(data) {
    var tmp = $('[data-template=user]').html();
    $("#user").template(tmp, { user: data.data });
  });
};

var renderLinks = function(links) {
  var tmp = $('[data-template=links]').html();
  $("#links").template(tmp, { links: links });
};

var renderComments = function(comments) {

};

var renderDetails = function(user) {
  request('http://www.reddit.com/user/'+user+'.json', function(data) {
    console.log(data);
    var comments = [];
    var links = [];
    for (var i = 0, c = data.data.children.length; i < c; i++) {
      var item = data.data.children[i];
      if (item.kind == 't1') {
        comments.push(item.data);
      } else if (item.kind == 't3') {
        links.push(item.data);
      }
    }
    console.log(comments, links);
    renderLinks(links);
  });
};

!function() {
  var qs = parseQueryString();
  var user = qs.user;
  if (user) {
    $('form').hide();
    renderUser(user);
    renderDetails(user);
  }
}();

