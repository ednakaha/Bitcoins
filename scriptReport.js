let coinsData = [];


function loadChart() {
    //set the selected coins for pricemulti
    if (selectedToggleArr.length === 0) {
        alert("There is no data to show")
        changeProgressBar(100);
    }
    else loadDataChart(selectedToggleArr);


}
function refreshDataPoints(symbolTitels) {
    let d = new Date();
    let dateTimeNow = d;
    $.getJSON('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + symbolTitels.join(',') + '&tsyms=USD', function (result) {
        
        for (const prop in result) {
            coinsData.find(i => i.name === prop).dataPoints.push({
                x: dateTimeNow,
                y: result[prop].USD

            })

        }
    });
}

function loadDataChart(selectedToggleArr) {
    let initial = 'customSwitches';
    let symbolTitels = [];
    let chart;

    for (var i = 0; i < selectedToggleArr.length; i++) {
        symbolTitle = selectedToggleArr[i].substring(initial.length);//just the symbol
        symbolTitels.push(symbolTitle.toUpperCase());
    }


    $.getJSON('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + symbolTitels.join(',') + '&tsyms=USD', function (result) {
        for (const prop in result) {
            coinsData.push({
                type: "line",
                name: prop,
                color: getRandomColor(),
                showInLegend: true,
                //  axisYIndex: 1,
                dataPoints: []
            });
        }


        //Insert Chart-making function here
         chart = new CanvasJS.Chart("chartContainer", {
            zoomEnabled: true,
            panEnabled: true,
            animationEnabled: true,
            title: {
                text: symbolTitels.join(',') + " to USD"
            },

            axisX: {
                title: "TimeStamp"
            },

            axisY: {
                title: "Coin Value",
                minimum: 0
            },

            data: coinsData

        });
        //first time

        refreshDataPoints(symbolTitels);
        chart.render();
        changeProgressBar(100);

        //interval
        chartIntervalId =  setInterval(function () {
            refreshDataPoints(symbolTitels);
            chart.render();
        }, 2000);
    });


}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}