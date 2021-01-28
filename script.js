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

function style(feature) {
  return {
      fillColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

var layerGroup = L.geoJSON(localidades, {
    style: style,
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius: 15,
        color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
      });
    },
    onEachFeature: function (feature, layer) {
      if ("Área" in feature.properties) {
        layer.bindPopup('<h1>Área</h1><p>UF: '+feature.properties["Área"]+'</p>');
      } else if ("Cidade" in feature.properties) {
        layer.bindPopup('<h1>'+feature.properties["Cidade"]+'</h1><br><h1>'+(feature.properties["Estado"] != null ? feature.properties["Estado"] : '-')+'</h1>');
      }
    }
  }).addTo(mymap);