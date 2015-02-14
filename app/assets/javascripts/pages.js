$(document).ready(function() {
  var channel = pusher.subscribe('twitter_handles');
  channel.bind('result', function(data) {
    var twitterHandle = data.twitter_handle;
    var $twitterHandle = $('.' + data.name).find('.twitter-handle');

    if (twitterHandle) {
      $twitterHandle.text(twitterHandle);
    } else {
      $twitterHandle.text('Not Found.');
    }
  });

  var query = window.location.search.split('=').pop();
  $('.query').val(query);
});
