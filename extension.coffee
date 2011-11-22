$ = $jquery  # common jquery!

# on the app side
# in this case helps make cross domain ajax!
Ajax = (e) ->
  e.removeClass 'open'
  e.addClass 'processed'
  $.ajax
    url: e.attr 'url'
    context: document.body
    success: (response) ->
      console.log(response)
      e.attr 'response', response
      e.removeClass 'processed'
      e.addClass 'done'

# AppGatos (app side)
# it listens to 'open' events and acts accordingly
AppGatos = (t) -> 
  setTimeout ->
    $('.gatos.open').each ->
      e = $(this)
      switch e.attr('action')
        when 'ajax' then Ajax(e)
        else console.log this

    AppGatos()
  ,t || 100

# ClientGatos (website side)
# it listens to 'done' events and acts accordingly
ClientGatos = (t) ->
  setTimeout ->
    $('.gatos.done').each ->
      e = $(this)
      switch e.attr('action')
        when 'ajax' then console.log e.attr('response')
        else console.log this
      e.removeClass 'done'
      e.addClass 'closed'
    ClientGatos()
  ,t || 100

# send_gatos (website side)
# sends actions to the widget side
send_gatos = (params) ->
  $("body").append $("<input>").addClass("gatos open").attr($.extend(
    type: "hidden"
  , params))


$(document).ready ->
  ClientGatos() # should be run on the client side only < not here
  AppGatos()    # shoold be run here

  # demo action
  send_gatos
    action: "ajax"
    url: "http://192.168.1.1"