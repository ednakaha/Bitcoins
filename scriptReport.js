window.onload = function() {
    $.getJSON("myphpService.php", function(result){
        var dps= [];
        
        //Insert Array Assignment function here
        for(var i=0; i<result.length;i++) {
            dps.push({"label":result[i].ts, "y":result[i].d1});
        }
        
        //Insert Chart-making function here
        var chart = new CanvasJS.Chart("chartContainer", {
            zoomEnabled:true,
            panEnabled:true,
            animationEnabled:true,
            title:{
                text: "myChart from mySQL database"
            },
        
            axisX:{
                title: "TimeStamp"
            },
        
                axisY:{
                title: "myDataPoints",
                minimum: 0
            },
        
            data: [{
                type: "spline",
                dataPoints:
                    dps
                      }]
        });
        chart.render();
        
        });
        
   /* this.alert('777');
	var dataPoints = [];
    var chart;
    debugger;
	$.getJSON('tempData/chart.json', function(data) {  
		$.each(data, function(key, value){
			dataPoints.push({x: value[0], y: parseInt(value[1])});
		});
		chart = new CanvasJS.Chart("chartContainer",{
			title:{
				text:"Live Chart with dataPoints from External JSON"
			},
			data: [{
				type: "line",
				dataPoints : dataPoints,
			}]
		});
		chart.render();
		updateChart();
	});
	function updateChart() {
        alert('2');
	$.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function(data) {
		$.each(data, function(key, value) {
			dataPoints.push({
			x: parseInt(value[0]),
			y: parseInt(value[1])
			});
		});
		chart.render();
		setTimeout(function(){updateChart()}, 1000);
	});
	}*/
}
