//Table 
$(document).ready(function () {
    $('#load_data').click(function () {
        $.ajax({
            url: "../static/data/Neighbourhood/San_Francisco_Neighbourhood.csv",
            dataType: "text",
            success: function (data) {
                var data = data.split(/\r?\n|\r/);
                var table_data = '<table class="table table-hover">';
                for (var count = 0; count < data.length; count++) {
                    var cell_data = data[count].split(",");
                    table_data += '<tr>';
                    for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
                        if (count === 0) {
                            table_data += '<th>' + cell_data[cell_count] + '</th>';
                        }
                        else {
                            table_data += '<td>' + cell_data[cell_count] + '</td>';
                        }
                    }
                    table_data += '</tr>';
                }
                table_data += '</table>';
                $('#neighbor-sf').html(table_data);
            }
        });
    });
});

//Map (test!)
var myMap = L.map('map-sf', {
    center: [37.7749, -122.4194],
    zoom: 13
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  var marker = L.marker([37.7749, -122.4194], {
    draggable: true,
    title: "My First Marker"
  }).addTo(myMap);
  
  marker.bindPopup("It's San Francisco!");