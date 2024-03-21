<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";

export default {
  name: "App",
  data() {
    return {
      meals: [],
    };
  },
  mounted() {
    this.initMap();
    this.fetchPastaMeals();
  },
  methods: {
    initMap() {
      this.map = L.map("map", {
        center: [0, 0],
        zoom: 1,
        minZoom: 2, // Spécifie le niveau de zoom minimum autorisé
        maxBounds: [
          [-90, -180],
          [90, 180],
        ],
        maxBoundsViscosity: 1.0,
      });

      L.tileLayer(
        "https://tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.jawg.io/">Jawg</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
          accessToken:
            "MsXnKTMtfJ4dhKXBU3PqU8FerMf6QB2aMA5Aidw6tLH85H2044dD1FoAtOLlhYey",
        }
      ).addTo(this.map);
    },

    async fetchPastaMeals() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta"
        );
        const mealsData = await response.json();
        this.meals = mealsData.meals;
        this.displayMeals();
      } catch (error) {
        console.error("Error fetching pasta meals:", error);
      }
    },
    async displayMeals() {
      for (const meal of this.meals) {
        const mealName = meal.strMeal;
        const mealImage = meal.strMealThumb;
        const mealCountry = meal.strArea;

        const countryCoordinates = await this.fetchCountryCoordinates(
          mealCountry
        );

        // Afficher les coordonnées récupérées dans la console
        console.log(`Coordinates for ${mealName}:`, countryCoordinates);

        // Vérifier si les coordonnées sont valides avant d'ajouter le marqueur
        if (
          countryCoordinates.latlng[0] !== 0 ||
          countryCoordinates.latlng[1] !== 0
        ) {
          const mealLocation = [
            countryCoordinates.latlng[0],
            countryCoordinates.latlng[1],
          ];

          const markerIcon = L.icon({
            iconUrl: mealImage,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          });

          L.marker(mealLocation, { icon: markerIcon })
            .addTo(this.map)
            .bindPopup(
              `<b>${mealName}</b><br><img src="${mealImage}" alt="${mealName}" style="max-width: 100px;">`
            );
        }
      }
    },
    async fetchCountryCoordinates(countryName) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${countryName}&limit=1&countrycodes=${countryName}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          return { latlng: [lat, lon] };
        } else {
          throw new Error("Country coordinates not found or invalid response");
        }
      } catch (error) {
        console.error("Error fetching country coordinates:", error);
        return { latlng: [0, 0] };
      }
    },
  },
};
</script>
