function loadChart(){
    //set the selected coins for pricemulti
    let selCoinsSymbol='';
    let initial = 'customSwitches';
    let symbolTitle;
    
    for(var i=0; i<selectedToggleArr.length;i++) {
        symbolTitle= selectedToggleArr[i].substring(initial.length);//just the symbol
        selCoinsSymbol+=','+ symbolTitle;
    }
    //remove first ,
    selCoinsSymbol= selCoinsSymbol.substring(1).toUpperCase();
    $.getJSON('https://min-api.cryptocompare.com/data/pricemulti?fsyms='+selCoinsSymbol+'&tsyms=USD', function(result){
        var dps= [];
      
        debugger;
       
        //Insert Array Assignment function here
        for(var i=0; i< obj.length;i++) {
            debugger;
            dps.push({"label":obj[i].ts, "y":obj[i].d1});
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
