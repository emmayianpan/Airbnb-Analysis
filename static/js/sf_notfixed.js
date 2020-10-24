//Map
function makeMap() {
    var myMap = L.map("map-sf", {
        center: [37.7749, -122.4194],
        zoom: 13
    });

    // Adding tile layer to the map
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    d3.csv("../static/data/City/San_Francisco.csv").then(function (response) {
        console.log(response)
        // Create a new marker cluster group
        var markers = L.markerClusterGroup();

        // Loop through data
        for (var i = 0; i < response.length; i++) {

            // Set the data location property to a variable
            var location = response[i];

            // Check for location property
            if (location) {

                // Add a new marker to the cluster group and bind a pop-up
                markers.addLayer(L.marker([location.latitude, location.longitude])
                    .bindPopup(`<b>Room Type:</b> ${response[i].room_type}<br>
          <b>Price:</b> $${response[i].price}<br>
          <b>Minimum Length of Stay:</b> ${response[i].minimum_nights}`));
            }

        }

        // Add our marker cluster layer to the map
        myMap.addLayer(markers);

    });
}
makeMap();

//D3
function makeResponsive() {
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

    var svg = d3.select("#bar-sf")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth); 

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

    d3.csv("../static/data/Neighbourhood/San_Francisco_Neighbourhood.csv").then(function (cityData) {

        console.log(cityData);

        cityData.forEach(function (d) {
            d.price = +d.price;
        });

        var xBandScale = d3.scaleLinear()
            .domain(cityData.map(d => d.price))
            .range([0, chartWidth])
           

        var yLinearScale = d3.scaleBand()
            .domain([0, d3.max(cityData, d => d.neighbourhood)])
            .range([chartHeight, 0])
            .padding(0.2);

        var bottomAxis = d3.axisBottom(xBandScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .call(leftAxis);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(bottomAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 7)
            .attr("dy", "1em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        var barGroup = chartGroup.selectAll(".bar")
            .data(cityData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xBandScale(d.price))
            .attr("y", d => yLinearScale(d.neighbourhood))
            //.attr("width", xBandScale.bandwidth())
            .attr("width", d => chartHeight - xBandScale(d.price))
            //.attr("height", d => chartHeight - yLinearScale(d.price));
            .attr("height", yLinearScale.bandwidth());
        
        //Tooltip
        // Step 1: Initialize Tooltip
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function (d) {
                return (`<strong>${d.neighbourhood}<strong><hr>$${d.price}`);
            });

        // Step 2: Create the tooltip in chartGroup.
        chartGroup.call(toolTip);

        // Step 3: Create "mouseover" event listener to display tooltip
        barGroup.on("mouseover", function (d) {
            toolTip.show(d, this);
        })
            // Step 4: Create "mouseout" event listener to hide tooltip
            .on("mouseout", function (d) {
                toolTip.hide(d);
            });

    }).catch(function (error) {
        console.log(error);
    });
}
makeResponsive();