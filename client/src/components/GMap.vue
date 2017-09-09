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
