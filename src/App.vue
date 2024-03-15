<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";

export default {
  name: "App",
  mounted() {
    let map = L.map("map").setView([43.8566, 2.3522], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  },
};
</script>
