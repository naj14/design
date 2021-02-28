var mymap = L.map('mapid').setView([24.367113562651276, 13.359375000000002], 3);
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
    lat = e.latlng.lat.toFixed(6);
    lng = e.latlng.lng.toFixed(6);
    popup
        .setLatLng(e.latlng)
        .setContent("Coordenada:<br><br><b>Latitude</b>:" + lat + "<br><b>Longitude</b>: " + lng)
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
        nomes = feature.properties['Nomes'].split(",");
        num_alunos = nomes.length;
        if (nomes[0] == "") {
          num_alunos = 0; 
        }
        str = '<h1>'+feature.properties["Área"]+'</h1><h3>Alunos ('+num_alunos+'):</h3>';
        if (num_alunos > 0) {
          for (index in nomes) {
            nome = nomes[index].split(";")[0];
            titulo = nomes[index].split(";")[1];
            repositorio = nomes[index].split(";")[2];
            str += '<p><b>Aluno:</b><br>'+nome+' <br><b>Título do trabalho:</b><br> '+titulo+'<br><a href="'+repositorio+'" target="_blank">[Link do trabalho]</a></p>';
          }
        }
        layer.bindPopup(str);
      } else if ("Cidade" in feature.properties) {
        nomes = feature.properties['Nomes'].split(",");
        num_alunos = nomes.length;
        if (nomes[0] == "") {
          num_alunos = 0; 
        }
        str = '<h1>'+feature.properties["Cidade"]+'/'+(feature.properties["Estado"] != null ? feature.properties["Estado"] : '-')+'</h1><h3>Alunos ('+num_alunos+'):</h3>';
        if (num_alunos > 0) {
          for (index in nomes) {
            nome = nomes[index].split(";")[0];
            repositorio = nomes[index].split(";")[1];
            str += '<p>'+nome+' <a href="'+repositorio+'" target="_blank">[Link do trabalho]</a></p>';
          }
        }
        layer.bindPopup(str);
      }
    }
  }).addTo(mymap);