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
    var user = data.data;
    getDelta(user, 'link_karma');
    getDelta(user, 'comment_karma');
    $("#user").template(tmp, { user: user });
  });
};

var getDelta = function(item, key) {
  var fullKey = item.id+'_'+key;
  var current = item[key];
  var value = localStorage.getItem(fullKey);
  var delta = 0;
  if (value && value != current) {
    delta = current - value;
  }
  localStorage.setItem(fullKey, current);
  item[key+'_delta'] = delta;
};

var renderLinks = function(links) {
  var tmp = $('[data-template=links]').html();
  for (var i = 0, c = links.length; i < c; i++) {
    var item = links[i];
    getDelta(item, 'score');
    getDelta(item, 'ups');
    getDelta(item, 'downs');
    getDelta(item, 'num_comments');
  }
  $("#links").template(tmp, { links: links });
  showDeltas();
};

var renderComments = function(comments) {

};

var renderDetails = function(user) {
  request('http://www.reddit.com/user/'+user+'.json', function(data) {
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
    renderLinks(links);
  });
};

var showDeltas = function() {
  $('.delta').each(function(i, item) {
    var el = $(this);
    var val = parseInt(el.text(), 10);
    if (val === 0)
      return;

    if (val > 0) {
      el.addClass('label-success');
    } else {
      el.addClass('label-important');
    }
    el.show();
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

