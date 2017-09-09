<template>
  <div class="index-page">
    <div class="map-container">
      <GMap></GMap>
    </div>
  </div>
</template>

<script>
  import GMap from '@/components/GMap'

  export default {
    name: 'IndexPage',
    components: {GMap: GMap}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map-container {
    position: absolute;
    left: 0px;
    top: 0;
    bottom: 0;
    right: 0;
  }
</style>
