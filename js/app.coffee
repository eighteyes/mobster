# DFRAG v0.2
# by Chris Scott(@CyberStrike)
# Initial build during Global Game Jam 2014

## Google Map Init

map = {}
@coordinates = {}

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


$('.testbtn').click =>

  contentString =
    '<div id="content">'+'<div id="siteNotice">'+'</div>'+
    '<h1 id="firstHeading" class="firstHeading">Test Player</h1>'+
    '<div id="bodyContent">'+
    '<p>Test Content </p>' +
    '</div>'+'</div>'
  infowindow = new google.maps.InfoWindow(content: contentString)
  marker = new google.maps.Marker(
    position: new google.maps.LatLng(@coordinates.latitude - 0.01, @coordinates.longitude - 0.01)
    animation: google.maps.Animation.DROP,
    map: map
    title: "Test Player"
  )
  google.maps.event.addListener marker, "click", ->
    console.log marker
    infowindow.open map, marker

# Push
#
#@key = 'ab3c98158c6fe5aeb9cd'
#secret = 'e8e70748d47475f9b50d'
#app_id = '61730'
#
#Pusher.log = (message) ->
#  window.console.log message  if window.console and window.console.log
#
#@pusher = new Pusher(@key, authEndpoint: "//immense-waters-5603.herokuapp.com/auth")

#channel = pusher.subscribe("players")
#channel.bind "my_event", (data) ->
#  console.log data
#  alert data.message

#@channel = @pusher.subscribe("presence-geo")
#
#
#@updateloc = -> channel.trigger('client-geo', coordinates)
#
#channel.bind "pusher:subscription_succeeded", ->
#  console.log "Location Listening"
#  updateloc()
#
#channel.bind "client-geo", (data) ->
#  console.log data.latitude, data.longitude
#  latlng = new google.maps.LatLng(data.latitude, data.longitude)
#  @player2 = new google.maps.Marker(
#    position: latlng,
#    map: map
#  )
#
#$pingbtn = $('.pingbtn')
#$pingbtn.click ->
#  channel.trigger 'client-ping', ""
#
#channel.bind "client-ping", (data) ->
#  updateloc()

@msg = 'message':'test'

$event = $('.event')
$event.click ->
  channel.trigger('client-geo', coordinates)

#
#//@ sourceMappingURL=app.map
#













