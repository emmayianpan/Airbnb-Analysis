Plotly.d3.csv("https://raw.githubusercontent.com/emmayianpan/Airbnb-Analysis/main/static/data/summary.csv", 
	function(data){ 
	console.log(data)

	var city = [], entire_home_apt = [], hotel_room = [], private_room = [], shared_room = [];
	for (var i = 0; i < data.length; i++) {
	  row = data[i];
	  city.push( row['city'] );
	  entire_home_apt.push( row['entire_home_apt'] );
	  hotel_room.push(row['hotel_room']); 
	  private_room.push(row['private_room']); 
	  shared_room.push(row['shared_room']); 
	}; 

	var trace1 = {
		x: city,
		y: entire_home_apt,
		name: 'Entire Home/Apt',
		type: 'bar'
	  };
	  
	  var trace2 = {
		x: city,
		y: hotel_room,
		name: 'Hotel Room',
		type: 'bar'
	  };

	  var trace3 = {
		x: city,
		y: private_room,
		name: 'Private Room',
		type: 'bar'
	  };	  

	  var trace4 = {
		x: city,
		y: shared_room,
		name: 'Shared Room',
		type: 'bar'
	  };	  

	  
	  var data = [trace1, trace2, trace3, trace4];
      var layout = {barmode: 'stack'};
      var img_jpg= d3.select('#jpg-export');
	  
      Plotly.newPlot("plot2",data, layout, {showSendToCloud:true})
      .then(
        function(gd)
         {
          Plotly.toImage(gd,{height:300,width:300})
             .then(
                 function(url)
             {
                 img_jpg.attr("src", url); 
             }
             )
        });
	
	
}); 