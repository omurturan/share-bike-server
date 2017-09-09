<template>
  <div id="map" class="pusher"></div>
</template>
<script>
  import locationHelper from '@/helpers/location'
  import request from '@/helpers/request'

  export default {
    name: 'gmap',
    created() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA0TVr8uXfy-QZOiBXA1rv7Mpzq798YLFU&libraries=drawing';
      script.onload = this.initMap;
      document.body.appendChild(script);
    },
    data() {
      return {
        map: null
      }
    },
    methods: {
      getStyles: function () {
        return [{
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]
        }, {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
        }, {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#000000"}, {"lightness": 20}]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]
        }, {
          "featureType": "administrative.locality",
          "elementType": "labels",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "administrative.neighborhood",
          "elementType": "labels",
          "stylers": [{"visibility": "simplified"}]
        }, {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.fill",
          "stylers": [{"lightness": "17"}]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{"color": "#000000"}, {"lightness": 20}]
        }, {
          "featureType": "landscape",
          "elementType": "labels",
          "stylers": [{"visibility": "on"}]
        }, {
          "featureType": "landscape.man_made",
          "elementType": "labels",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "landscape.man_made",
          "elementType": "labels.text",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "landscape.natural",
          "elementType": "labels",
          "stylers": [{"visibility": "on"}]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{"color": "#000000"}, {"lightness": 21}]
        }, {"featureType": "poi", "elementType": "labels", "stylers": [{"visibility": "off"}]}, {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [{"visibility": "simplified"}]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{"visibility": "on"}, {"color": "#ff4700"}]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{"lightness": 17}]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{"color": "#ef4224"}, {"lightness": 29}, {"weight": 0.2}]
        }, {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [{"invert_lightness": true}, {"visibility": "off"}]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#3b3b3b"}]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{"color": "#000000"}, {"lightness": 18}]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#ff4700"}, {"lightness": "39"}, {"gamma": "0.43"}, {"saturation": "-47"}]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [{"color": "#000000"}, {"lightness": 16}]
        }, {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [{"color": "#555555"}]
        }, {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{"color": "#000000"}, {"lightness": 19}]
        }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 17}]}]

      },
      addMarker: function (position) {
        new google.maps.Marker({
          position: position,
          map: this.map,
          title: 'Hello World!'
        });
      },
      getDefaultPosition: function (cb) {
        return locationHelper.getClientLocation(cb);
      },
      initMap: function () {
        var that = this;
        that.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: locationHelper.getDefaultLocation(),
          styles: that.getStyles()
        });

        var drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon']
          },
          markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
          circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
          }
        });
        drawingManager.setMap(that.map);

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
          if (event.type === 'polygon') {
            var arr = event.overlay.getPath().getArray();

            // Repeat the first point for the polygon to be complete.
            arr.push(arr[0]);

            request.create().post('/drop-off', {
              'name': 'test',
              'coordinates': arr
            })
          }
        });

        this.getDefaultPosition(function (position) {
//          that.map.setCenter(position);
//          that.addMarker(position);
        })
      }
    }
  }

</script>

<style>
  #map {
    height: 100%;
    width: 100%;
  }
</style>
