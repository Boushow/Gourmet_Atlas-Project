<template>
  <div>
    <!-- Menu de gauche -->

    <nav id="left-nav">
      <ul>
        <!-- Beef -->
        <li
          class="nav-items"
          v-for="category in categories.slice(0, 1)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-boeuf">
            <img
              src="./assets/incones-nav/boeuf.png"
              alt="Boeuf"
              title="Boeuf"
              class="nav-icones"
            />
          </a>
        </li>

        <!-- Chicken -->
        <li
          class="nav-items"
          v-for="category in categories.slice(1, 2)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-poulet">
            <img
              src="./assets/incones-nav/poulet.png"
              alt="Poulet"
              title="Poulet"
              class="nav-icones"
            />
          </a>
        </li>

        <!-- Desset -->
        <li
          class="nav-items"
          v-for="category in categories.slice(2, 3)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-dessert"
            ><img
              src="./assets/incones-nav/dessert.png"
              alt="Dessert"
              title="Dessert"
              class="nav-icones"
          /></a>
        </li>

        <!-- Lamb -->
        <li
          class="nav-items"
          v-for="category in categories.slice(3, 4)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-agneau"
            ><img
              src="./assets/incones-nav/agneau.png"
              alt="Agneau"
              title="Agneau"
              class="nav-icones"
          /></a>
        </li>

        <li>
          <img src="../public/logo.png" alt="" class="logo" />
        </li>

        <!-- Miscellaneous -->
        <li
          class="nav-items"
          v-for="category in categories.slice(4, 5)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-divers"
            ><img
              src="./assets/incones-nav/divers.png"
              class="nav-icones"
              alt="Divers"
              title="Divers"
          /></a>
        </li>

        <!-- Pasta -->
        <li
          class="nav-items"
          v-for="category in categories.slice(5, 6)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-pates"
            ><img
              src="./assets/incones-nav/pates.png"
              class="nav-icones"
              alt="Pates"
              title="Pâtes"
          /></a>
        </li>

        <!-- Pork -->
        <li
          class="nav-items"
          v-for="category in categories.slice(6, 7)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-porc"
            ><img
              src="./assets/incones-nav/cochon.png"
              alt="Porc"
              title="Porc"
              class="nav-icones"
          /></a>
        </li>
      </ul>
    </nav>

    <nav id="right-nav">
      <ul>
        <!-- Seafood -->
        <li
          v-for="category in categories.slice(7, 8)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-mer"
            ><img
              src="./assets/incones-nav/fruit-de-mer.png"
              alt="Fruit de mer"
              title="Fruit de mer"
              class="nav-icones"
          /></a>
        </li>

        <!-- Slide -->
        <li
          v-for="category in categories.slice(8, 9)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-entree"
            ><img
              src="./assets/incones-nav/entree.png"
              alt="Entrée"
              title="Entrée"
              class="nav-icones"
          /></a>
        </li>

        <!-- Stater -->
        <li
          v-for="category in categories.slice(9, 10)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-accompagnement"
            ><img
              src="./assets/incones-nav/accompagnement.png"
              alt="Plat d'accompagnement"
              title="Plat d'accompagnement"
              class="nav-icones"
          /></a>
        </li>

        <!-- Vegan -->
        <li
          v-for="category in categories.slice(10, 11)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-vegan"
            ><img
              src="./assets/incones-nav/vegetalien.png"
              alt="Vegan"
              title="vegan"
              class="nav-icones"
          /></a>
        </li>
        <!-- Végetarien -->
        <li
          v-for="category in categories.slice(11, 12)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-vege"
            ><img
              src="./assets/incones-nav/salade.png"
              alt="Vegetarien"
              title="Végétarien"
              class="nav-icones"
          /></a>
        </li>

        <!-- Breakfast -->
        <li
          v-for="category in categories.slice(12, 13)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-dejeuner"
            ><img
              src="./assets/incones-nav/cafe.png"
              alt="Petit déjeuner"
              title="Petit déjeuner"
              class="nav-icones"
          /></a>
        </li>

        <!-- Chèvre -->
        <li
          v-for="category in categories.slice(13, 14)"
          :key="category"
          @click="fetchMealsByCategory(category)"
        >
          <a id="nav-chevre"
            ><img
              src="./assets/incones-nav/chevre.png"
              alt="Chèvre"
              title="Chèvre"
              class="nav-icones"
          /></a>
        </li>
      </ul>
    </nav>
    <div id="map"></div>
  </div>
</template>

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
        await Promise.all(meals.map((meal) => this.displayMeal(meal)));
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
        const countryCoordinates = await this.fetchCountryCoordinates(
          countryName
        );
        console.log(`Coordinates for ${strMeal}:`, countryCoordinates);
        if (
          countryCoordinates.latlng[0] !== 0 ||
          countryCoordinates.latlng[1] !== 0
        ) {
          const mealLocation = [
            countryCoordinates.latlng[0],
            countryCoordinates.latlng[1],
          ];
          const markerIcon = L.icon({
            iconUrl: strMealThumb,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          });
          const marker = L.marker(mealLocation, { icon: markerIcon }).addTo(
            this.map
          );

          // Ajouter une classe CSS conditionnelle pour les plats de la catégorie "Pork"
          if (meal.strCategory === "Pork") {
            marker._icon.classList.add("pork-meal");
          }

          marker.bindPopup(
            `<div class="meal-details">
          <img class="meal-image" src="${strMealThumb}" alt="${strMeal}">
          <div>
            <p class ="meal-name">${strMeal}</p>
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