(function() {
  var $, Ajax, AppGatos, ClientGatos, send_gatos;

  $ = $jquery;

  Ajax = function(e) {
    e.removeClass('open');
    e.addClass('processed');
    return $.ajax({
      url: e.attr('url'),
      context: document.body,
      success: function(response) {
        console.log(response);
        e.attr('response', response);
        e.removeClass('processed');
        return e.addClass('done');
      }
    });
  };

  AppGatos = function(t) {
    return setTimeout(function() {
      $('.gatos.open').each(function() {
        var e;
        e = $(this);
        switch (e.attr('action')) {
          case 'ajax':
            return Ajax(e);
          default:
            return console.log(this);
        }
      });
      return AppGatos();
    }, t || 100);
  };

  ClientGatos = function(t) {
    return setTimeout(function() {
      $('.gatos.done').each(function() {
        var e;
        e = $(this);
        switch (e.attr('action')) {
          case 'ajax':
            console.log(e.attr('response'));
            break;
          default:
            console.log(this);
        }
        e.removeClass('done');
        return e.addClass('closed');
      });
      return ClientGatos();
    }, t || 100);
  };

  send_gatos = function(params) {
    return $("body").append($("<input>").addClass("gatos open").attr($.extend({
      type: "hidden"
    }, params)));
  };

  $(document).ready(function() {
    ClientGatos();
    AppGatos();
    return send_gatos({
      action: "ajax",
      url: "http://192.168.1.1"
    });
  });

}).call(this);
