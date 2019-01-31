var selCoinsSymbol = '';
var initial = 'customSwitches';
var symbolTitle;


function loadChart() {
    //set the selected coins for pricemulti


    //debugger;
    // setInterval(function () { loadDataChart(selectedToggleArr); }, 2000);
    createInterval(loadDataChart, selectedToggleArr, 2000);

}


function createInterval(f, dynamicParameter, interval) {

    setInterval(function () {
        f(dynamicParameter);
    }, interval);
}



function loadDataChart(selectedToggleArr) {
 //   debugger;
    selCoinsSymbol='';
    for (var i = 0; i < selectedToggleArr.length; i++) {
        symbolTitle = selectedToggleArr[i].substring(initial.length);//just the symbol
        selCoinsSymbol += ',' + symbolTitle;
    }
    //remove first ,
    selCoinsSymbol = selCoinsSymbol.substring(1).toUpperCase();
    $.getJSON('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + selCoinsSymbol + '&tsyms=USD', function (result) {
        var dps = [];
        var dps2 = [];

      //  debugger;

        //Insert Array Assignment function
        for (const prop in result) {
            dps.push({ "label": prop, "y": (result[prop].USD)+2 });
            dps2.push({ "label": prop, "y":  result[prop].USD+2 });
        }
debugger;

        //Insert Chart-making function here
        var chart = new CanvasJS.Chart("chartContainer", {
            zoomEnabled: true,
            panEnabled: true,
            animationEnabled: true,
            title: {
                text: selCoinsSymbol + " to USD"
            },

            axisX: {
                title: "TimeStamp"
            },

            axisY: {
                title: "Coin Value",
                minimum: 0
            },

            data: [{
                type: "line",
                name: "111",
                color: "#369EAD",
                showInLegend: true,
              //  axisYIndex: 1,
                dataPoints:[
                    dps
                 // { x: new Date(2017, 00, 7), y: 85.4 }, 
                 // { x: new Date(2017, 00, 14), y: 92.7 }
                ]
            },
            {
                type: "line",
                name: "2222",
                color: "#ff6347",
                showInLegend: true,
              //  axisYIndex: 1,
                dataPoints:[
                    dps2
                 //  {label:"BTC" ,y:2000.00},
                 //  {label:"AUR" ,y:1500.00},
                  // {label:"LTC" ,y:1400.00},
                   // dps
               //    { x: new Date(2017, 00, 7), y: 32.3 }, 
               //    { x: new Date(2017, 00, 14), y: 33.9 }

            ]
        }]
        });
        chart.render();

    });
}
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
