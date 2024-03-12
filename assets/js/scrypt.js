var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var imageUrl = 'assets/medias/fish-and-chips.png';
var imageBounds = [[51.49, -0.12], [51.5, -0.06]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);