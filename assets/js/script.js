let map = L.map('map').setView([4.0, -0.0], 1.5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



const USA = L.marker([36, -95], {title : 'USA'}).addTo(map);

function Focus(marqueur) {
    let position = marqueur.getLatLng();
    marqueur.on('click', function() {
        map.setView(position, 3);
    });
}

Focus(USA);