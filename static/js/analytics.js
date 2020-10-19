//reference: https://www.chartjs.org/docs/latest/

function makeChart(data) {
	//define variables and push data from each column 
	//use + to convert strings to numbers 
	var city = data.map(function (d) {
		return d.city;
	});
	var price = data.map(function (d) {
		return +d.average_price;
	});
	var entireHomeApt = data.map(function (d) {
		return +d.entire_home_apt;
	});
	var hotelRoom = data.map(function (d) {
		return +d.hotel_room;
	});
	var privateRoom = data.map(function (d) {
		return +d.private_room;
	});
	var sharedRoom = data.map(function (d) {
		return +d.shared_room;
	});

	//make plot 'Average Price by City'
	var plot1 = new Chart('plot2', {
		type: "horizontalBar",
		options: {
			maintainAspectRatio: false,
			legend: {
				display: false
			}
		},
		data: {
			labels: city,
			datasets: [
				{
					backgroundColor: "#80aaff",
					data: price
				}
			]
		}, 
		options: {
			title: {
				display: true,
				text: "Average Price by City"
			}
		} 
	});

	//make plot 'Total Units by Room Type'
	var plot2 = new Chart('plot1', {
		type: 'bar',
		data: {
			labels: city,
			datasets: [
				{
					label: 'Entire Home/Apt',
					data: entireHomeApt,
					backgroundColor: '#80ffaa',
				},
				{
					label: 'Hotel Room',
					data: hotelRoom,
					backgroundColor: '#ff4d4d',
				},
				{
					label: 'Private Room',
					data: privateRoom,
					backgroundColor: '#bf80ff',
				},
				{
					label: 'Shared Room',
					data: sharedRoom,
					backgroundColor: '#3366ff',
				}
			]
		},
		options: {
			title: {
				display: true,
				text: "Total Units by Room Type"
			}, 
			scales: {
				xAxes: [{ stacked: true }],
				yAxes: [{ stacked: true }]
			}
		}
	});
}

// Request data using D3
d3.csv("https://raw.githubusercontent.com/emmayianpan/Airbnb-Analysis/main/static/data/summary.csv")
	.then(makeChart);

//Color Picker: https://www.w3schools.com/colors/colors_picker.asp

