<template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'App',
  mounted() {
    this.initMap();
    this.fetchDishes();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([0, 0], 2); // Position initiale de la carte

      // Ajout du fond de carte Jawg.light
      L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.jawg.io/">Jawg</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        accessToken: 'MsXnKTMtfJ4dhKXBU3PqU8FerMf6QB2aMA5Aidw6tLH85H2044dD1FoAtOLlhYey' // Remplacez par votre propre jeton d'accès Jawg
      }).addTo(this.map);
    },
    async fetchDishes() {
      try {
        // Faites une requête à l'API pour récupérer les données des plats
        const response = await fetch('/api/photos'); // Utilisez le chemin relatif avec le proxy configuré
        const dishes = await response.json(); // Convertir la réponse en JSON

        // Placez les marqueurs sur la carte pour chaque plat
        dishes.forEach(dish => {
          if (dish.location) {
            const name = dish.name;
            const image = dish.image;
            const location = [dish.location.latitude, dish.location.longitude];

            const markerIcon = L.icon({
              iconUrl: image,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
              popupAnchor: [0, -40]
            });

            L.marker(location, { icon: markerIcon })
              .addTo(this.map)
              .bindPopup(`<b>${name}</b><br><img src="${image}" alt="${name}" style="max-width: 100px;">`);
          }
        });
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
}
</style>
