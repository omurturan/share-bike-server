<template>
  <div class="pushable">
    <div>
      <button v-on:click="deleteSelectedDropOff" v-if="selectedDropOff" class="ui negative basic button">
        Delete Drop-Off
      </button>
    </div>
    <div id="map" class="pusher"></div>
  </div>
</template>
<script>
  import locationHelper from '@/helpers/location'
  import request from '@/helpers/request'
  import styleHelper from '@/helpers/style'

  export default {
    name: 'gmap',
    created () {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      // TODO get the API key from ENV variables
      script.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyA0TVr8uXfy-QZOiBXA1rv7Mpzq798YLFU&libraries=drawing'
      script.onload = this.initMap
      document.body.appendChild(script)
    },
    data () {
      return {
        map: null,
        selectedDropOff: null
      }
    },
    methods: {
      deleteSelectedDropOff: function () {
        request.create().delete('/drop-off/' + this.selectedDropOff.data.id)
        this.selectedDropOff.setMap(null)
        this.selectedDropOff = null
      },
      drawDropOffs: function () {
        var that = this
        request.create().get('/drop-off').then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            var dropOff = response.data[i]

            var polygon = new google.maps.Polygon({
              paths: dropOff.coordinates,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              draggable: true
            })

            polygon.data = {id: dropOff._id}

            google.maps.event.addListener(polygon, 'click', function () {
              that.selectedDropOff = this
            })

            google.maps.event.addListener(polygon, 'dragend', function () {
              var path = this.getPath()
              var coordinates = []

              for (var i = 0; i < path.length; i++) {
                coordinates.push({
                  lat: path.getAt(i).lat(),
                  lng: path.getAt(i).lng()
                })
              }

              request.create().put('/drop-off/' + polygon.data.id, {
                coordinates: coordinates
              })
            })

            polygon.setMap(that.map)
          }
        })
      },
      initMap: function () {
        var that = this
        that.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: locationHelper.getDefaultLocation(),
          styles: styleHelper.getMapStyle()
        })

        that.map.addListener('click', function () {
          that.selectedDropOff = null
        })

        var drawingManager = new google.maps.drawing.DrawingManager({
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon']
          },
          circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
          }
        })
        drawingManager.setMap(that.map)

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
          if (event.type === 'polygon') {
            var arr = event.overlay.getPath().getArray()

            // Repeat the first point for the polygon to be complete.
            arr.push(arr[0])

            that.selectedDropOff = null
            request.create().post('/drop-off', {
              'name': 'test',
              'coordinates': arr
            })
          }
        })

        locationHelper.getClientLocation(function (position) {
          that.map.setCenter(position)
        })

        this.drawDropOffs()
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
