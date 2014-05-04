# Mobster
# Sean Canton (@SeanCanton)
# Chris Scott(@CyberStrike)
# Emerge Hack 2014

## Google Map Init

map = {}
@coordinates = {}
@user = {}

# Geolocation
navigator.geolocation.getCurrentPosition (data) =>
  @coordinates = data.coords
  console.log(
    "Accuracy: " + @coordinates.accuracy
    "Altitude: " + @coordinates.altitude
    "Altitude Accuracy: " + @coordinates.altitudeAccuracy
    "Heading: " + @coordinates.heading
    "Latitude: " + @coordinates.latitude
    "Longitude: " + @coordinates.longitude
    "Speed: " + @coordinates.speed)

  userId = 12

  @user = {
    userId: userId,
    userName: "testUser",
    lon: @coordinates.longitude - 2,
    lat: @coordinates.latitude - 2
  }

  # Init
  socket.emit('init', { userId: @user.userId, lat: @coordinates.latitude, lon: @coordinates.longitude })

# Start Maps

@googlemaps = ->
  console.log 'hello'

  # Geolocation
  navigator.geolocation.getCurrentPosition (data) =>
    @coordinates = data.coords
    console.log(
      "Accuracy: " + @coordinates.accuracy
      "Altitude: " + @coordinates.altitude
      "Altitude Accuracy: " + @coordinates.altitudeAccuracy
      "Heading: " + @coordinates.heading
      "Latitude: " + @coordinates.latitude
      "Longitude: " + @coordinates.longitude
      "Speed: " + @coordinates.speed)

    #Configure Maps

    @myLatlng = new google.maps.LatLng(@coordinates.latitude, @coordinates.longitude)
    mapOptions =
      center: @myLatlng
      zoom: 13
      styles: @Midnight_Commander

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)

    marker = new google.maps.Marker(
      position: @myLatlng,
      animation: google.maps.Animation.DROP,
      map: map)

#Resize Listener
google.maps.event.addDomListener window, "resize", ->
  center = map.getCenter()
  google.maps.event.trigger map, "resize"
  map.setCenter @myLatlng

$(document).ready => @googlemaps()

$('.testbtn').click ()->
  contentString =
    '<div id="content">'+'<div id="siteNotice">'+'</div>'+
    '<h1 id="firstHeading" class="firstHeading">Test Player</h1>'+
    '<div id="bodyContent">'+
    '<p>Test Content </p>' +
    '</div>'+'</div>'
  infowindow = new google.maps.InfoWindow(content: contentString)
  marker = new google.maps.Marker(
    position: new google.maps.LatLng(coordinates.latitude - 0.01, coordinates.longitude - 0.01)
    animation: google.maps.Animation.DROP,
    map: map
    title: "Test Player"
  )
  google.maps.event.addListener marker, "click", ->
    console.log marker
    infowindow.open map, marker

###
  Socket.io
###

socket = io.connect('107.170.141.208')

#navigator.geolocation.getCurrentPosition (data) =>
#  window.pos = data.coords

# New User

socket.emit("update", user)

socket.on 'newUser', (data)->
  console.log('NewUser', data)
  console.log data.lat, data.lon
  latlng = new google.maps.LatLng(data.lat, data.lon)
  @player2 = new google.maps.Marker(
    position: latlng,
    map: map
  )

# Send Msg
$('#msg').keypress (e)->
  if e.which == 13
    socket.emit 'chat',
      userName: 'webUser'
      msg: $('#msg').val()
    $('#msg').val('')
#    if $('#chat p').length >= 4
#      $('#chat p').first().remove()

socket.on 'chat', (data)->
  console.log("chat", data)
  $('#chat').append($('<p>', {text: data.msg}))

$('#update').click ()->
  console.log(user)
  socket.emit( 'update', user)
  marker = new google.maps.Marker(
    position: new google.maps.LatLng(coordinates.latitude - 0.01, coordinates.longitude - 0.01)
    animation: google.maps.Animation.DROP,
    map: map
  )

# Update

socket.on 'update', (data)->
  console.log('update', data)
  console.log data.lat, data.lon
  marker = new google.maps.Marker(
    position: new google.maps.LatLng(coordinates.latitude, coordinates.longitude)
    animation: google.maps.Animation.DROP,
    map: map
  )


i = 0
socket.on 'init', (data)->
  users = data
  while i < users.length
    users[i]
    users[i].location[0].lat
    users[i].location[0].lon
    console.log users[i].location[0].lat, users[i].location[0].lon
    latlng = new google.maps.LatLng(users[i].location[0].lat, users[i].location[0].lon)
    users[i].userId = new google.maps.Marker(
      position: latlng
      animation: google.maps.Animation.DROP
    )
    users[i].userId.setMap(map)
    i++


## Push Menu

$menuButton = $('.navbar-toggle')
$menuLeft = $('.menu-left')
$menuRight = $('.menu-right')
$body = $('body')
$el = $(this)

$menuButton.click ->
  $el.toggleClass "active"
  $body.toggleClass " menu-push-toleft"
  $('#overlay').toggleClass "overlay"
  $menuRight.toggleClass "menu-open"

$('#overlay').click ->
  $menuButton.removeClass "active"
  $body.removeClass "menu-push-toleft"
  $body.removeClass "menu-push-toright"
  $menuRight.removeClass "menu-open"
  $menuLeft.removeClass "menu-open"
  $('#overlay').removeClass "overlay"
  $('.navbar-toggle').removeClass('disabled')













