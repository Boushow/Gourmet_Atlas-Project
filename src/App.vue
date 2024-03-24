<template>
  <div>
    <header>
      <button v-for="category in categories" :key="category" @click="fetchMealsByCategory(category)">
        {{ category }}
      </button>
      <img src="../public/logo.png" alt="" class="logo">
    </header>
    <div id="map"></div>
    <div>

    </div>
  </div>
</template>

<style>
.pork-meal {
  border: 2px solid pink;
}

</style>

<script>
import L from "leaflet";

export default {
  name: "App",
  data() {
    return {
      mealsByCountry: {},
      categories: [
        "Beef",
        "Chicken",
        "Dessert",
        "Lamb",
        "Miscellaneous",
        "Pasta",
        "Pork",
        "Seafood",
        "Side",
        "Starter",
        "Vegan",
        "Vegetarian",
        "Breakfast",
        "Goat",
      ],
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async fetchMealsByCategory(category) {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const { meals } = await response.json();
        await Promise.all(meals.map(meal => this.displayMeal(meal)));
      } catch (error) {
        console.error(`Error fetching meals for category ${category}:`, error);
      }
    },

    async displayMeal(meal) {
  const { strMeal, strMealThumb } = meal;
  const mealCountry = await this.fetchMealCountry(strMeal);
  const countryName = this.convertToCountry(mealCountry);
  console.log(`Country for ${strMeal}:`, countryName);
  if (!this.mealsByCountry[countryName]) {
    this.mealsByCountry[countryName] = meal;
    const countryCoordinates = await this.fetchCountryCoordinates(countryName);
    console.log(`Coordinates for ${strMeal}:`, countryCoordinates);
    if (countryCoordinates.latlng[0] !== 0 || countryCoordinates.latlng[1] !== 0) {
      const mealLocation = [countryCoordinates.latlng[0], countryCoordinates.latlng[1]];
      const markerIcon = L.icon({
        iconUrl: strMealThumb,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      const marker = L.marker(mealLocation, { icon: markerIcon }).addTo(this.map);
      
      // Ajouter une classe CSS conditionnelle pour les plats de la catégorie "Pork"
      if (meal.strCategory === "Pork") {
        marker._icon.classList.add("pork-meal");
      }
      
      marker.bindPopup(
        `<div class="meal-details">
          <img class="meal-image" src="${strMealThumb}" alt="${strMeal}">
          <div>
            <p class ="meal-name">${strMeal}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac dapus. Sed at nisl viverra, interdum.</p>
          </div>
        </div>`
      );
    }
  }
},


    async fetchMealCountry(mealName) {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
        );
        const { meals } = await response.json();
        if (meals && meals.length > 0) {
          return meals[0].strArea;
        } else {
          throw new Error("Meal country not found or invalid response");
        }
      } catch (error) {
        console.error("Error fetching meal country:", error);
        return "";
      }
    },

    async fetchCountryCoordinates(countryName) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${countryName}&limit=1`
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

    convertToCountry(origin) {
      const countryMap = {
        Italian: "Italy",
        American: "United States",
        Polish: "Poland",
        British: "United Kingdom",
        Canadian: "Canada",
        Chinese: "China",
        Dutch: "Netherlands",
        Egyptian: "Egypt",
        French: "France",
        Greek: "Greece",
        Indian: "India",
        Irish: "Ireland",
        Jamaican: "Jamaica",
        Japanese: "Japan",
        Kenyan: "Kenya",
        Malaysian: "Malaysia",
        Mexican: "Mexico",
        Moroccan: "Morocco",
        Russian: "Russia",
        Spanish: "Spain",
        Thai: "Thailand",
        Turkish: "Turkey",
        Vietnamese: "Vietnam",
        Argentine: "Argentina",
        Australian: "Australia",
        Austrian: "Austria",
        Belgian: "Belgium",
        Brazilian: "Brazil",
        Caribbean: "Caribbean",
        Colombian: "Colombia",
        Cuban: "Cuba",
        Danish: "Denmark",
        Finnish: "Finland",
        German: "Germany",
        Hungarian: "Hungary",
        Indonesian: "Indonesia",
        Israeli: "Israel",
        Lithuanian: "Lithuania",
        Maltese: "Malta",
        Norwegian: "Norway",
        Portuguese: "Portugal",
        SaudiArabian: "Saudi Arabia",
        Singaporean: "Singapore",
        Slovenian: "Slovenia",
        SouthAfrican: "South Africa",
        Swedish: "Sweden",
        Swiss: "Switzerland",
        Ukrainian: "Ukraine",
        Uzbekistani: "Uzbekistan",
        // Ajoutez d'autres origines et leurs pays correspondants ici
      };
      return countryMap[origin] || origin;
    },
    
    initMap() {
      this.map = L.map("map", {
        center: [0, 0],
        zoom: 1,
        minZoom: 2,
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
  },
};
</script>
