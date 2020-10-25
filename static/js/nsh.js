//Map (Leaflet)
function makeMap() {
    var myMap = L.map("map-nsh", {
        center: [36.1627, -86.7816],
        zoom: 11
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    d3.csv("../static/data/City/Nashville.csv").then(function (response) {
        console.log(response)
        var markers = L.markerClusterGroup();

        for (var i = 0; i < response.length; i++) {
            var location = response[i];

            if (location) {
                markers.addLayer(L.marker([location.latitude, location.longitude])
                    .bindPopup(`<b>Room Type:</b> ${response[i].room_type}<br>
          <b>Price:</b> $${response[i].price}<br>
          <b>Minimum Length of Stay:</b> ${response[i].minimum_nights}`));
            }

        }
        myMap.addLayer(markers);

    });
}

//Bar Chart (D3)
function makeBar() {
    var svgWidth = 600;
    var svgHeight = 400;

    var chartMargin = {
        top: 20,
        right: 20,
        bottom: 100,
        left: 50
    };

    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    var svg = d3.select("#bar-nsh")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth); 

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

    d3.csv("../static/data/Neighbourhood/Nashville_Neighbourhood.csv").then(function (cityData) {

        console.log(cityData);

        cityData.forEach(function (d) {
            d.price = +d.price;
        });

        var xBandScale = d3.scaleBand()
            .domain(cityData.map(d => d.neighbourhood))
            .range([0, chartWidth])
            .padding(0.2);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(cityData, d => d.price)])
            .range([chartHeight, 0]);

        var bottomAxis = d3.axisBottom(xBandScale);
        var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

        chartGroup.append("g")
            .call(leftAxis);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(bottomAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 7)
            .attr("dy", ".35em")
            .attr("font-size","12px")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        var barGroup = chartGroup.selectAll(".bar")
            .data(cityData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xBandScale(d.neighbourhood))
            .attr("y", d => yLinearScale(d.price))
            .attr("width", xBandScale.bandwidth())
            .attr("height", d => chartHeight - yLinearScale(d.price));
       
        //Tooltip
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function (d) {
                return (`<strong>${d.neighbourhood}<strong><hr>$${d.price}`);
            }); 
            
        chartGroup.call(toolTip);

        barGroup.on("mouseover", function (d) {
            toolTip.show(d, this);
        })
            .on("mouseout", function (d) {
                toolTip.hide(d);
            });  

    }).catch(function (error) {
        console.log(error);
    });
}

//BoxPlot (Plotly)
function makeBoxplot() {
d3.csv("../static/data/Top5_Neighbourhood/Nashville_Top5.csv").then(function (boxData) {
    console.log(boxData);

    var neighbourhood = boxData.map(function (d) {
        return d.neighbourhood;
    });

    var price = boxData.map(function (d) {
        return d.price;
    });

    var trace1 = {
        x: neighbourhood,
        y: price,
        type: "box",
        name: "neighbourhood",
      };
      
      var data = [trace1];
      var layout = {
        title: "<b><i>Top 5 Expensive Neighbourhood<i></b>",
        yaxis: { title: "Price" }
      };
      
      Plotly.newPlot("boxplot-nsh", data, layout);
}); 
}

makeBoxplot(); 
makeBar();
makeMap();