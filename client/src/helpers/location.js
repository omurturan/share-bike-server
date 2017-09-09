export default {
  getClientLocation(callback) {
    const geoSuccess = position => {
      callback({lat: position.coords.latitude, lng: position.coords.longitude});
    };

    const geoError = () => {
      callback(this.getDefaultLocation());
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  },
  getDefaultLocation: function () {
    return {lat: 52.520008, lng: 13.404954};
  }
}
