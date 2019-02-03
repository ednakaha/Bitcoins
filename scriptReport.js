
let coinsData = [];


function loadChart() {
    //set the selected coins for pricemulti
    coinsData = []
    loadDataChart(selectedToggleArr);


}
function refreshDataPoints(symbolTitles) {
    let d = new Date();
    let dateTimeNow = d;//.toLocaleTimeString();//d.toISOString().slice(0,16);

    $.getJSON('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + symbolTitles.join(',') + '&tsyms=USD', function (result) {
        //  debugger;
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
    let symbolTitles = [];
    let chart;

    for (var i = 0; i < selectedToggleArr.length; i++) {
        symbolTitle = selectedToggleArr[i].substring(initial.length);//just the symbol
        symbolTitles.push(symbolTitle.toUpperCase());
    }


    $.getJSON('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + symbolTitles.join(',') + '&tsyms=USD', function (result) {

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
                text: symbolTitles.join(',') + " to USD"
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
        refreshDataPoints(symbolTitles);
        chart.render();

        //interval
        setInterval(function () {
            refreshDataPoints(symbolTitles);
            chart.render();
        }, 2000);
    });

//TODO: arrray datacoins if main array changed
//TODO: progress bar


}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
