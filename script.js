var mymap = L.map('mapid').setView([-16.073967819928836, -54.082029461860664], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Você clicou nas coordenadas " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

//L.geoJSON(localidades).addTo(mymap);

var layerGroup = L.geoJSON(localidades, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup('<h1>'+feature.properties.SIGLA_UF+'</h1><p>UF: '+feature.properties.NM_UF+'</p>');
    }
  }).addTo(mymap);