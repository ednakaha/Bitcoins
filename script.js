

var TemplateCoins;

$.ajax({
    url: '/templates/tempCoins.html',
    success: function (data) {
        TemplateCoins = data;
    }
});


var TemplateMoreInfo;

$.ajax({
    url: '/templates/tempMoreInfo.html',
    success: function (data) {
        TemplateMoreInfo = data;
    }
});




$("#partButton").click(function () {
    doBaseApi();
});



function doBaseApi() {
    $('#content').empty();

    let selUrl = "data.json";//"https://api.coingecko.com/api/v3/coins/list";
    
    var regexSymbol = /{{symbol}}/g;
    var regexId = /{{id}}/g;

    $.ajax({
        url: selUrl,
        method: 'GET'
    }).done(function (d) {
        if (typeof d === 'string')
            d = JSON.parse(d);


        for (i = 0; i < 100; i++) {
            let t = TemplateCoins;

            t = t.replace(regexSymbol, d[i]['symbol']);
            t = t.replace(regexId, d[i]['id']);
            t = t.replace('{{name}}', d[i]['name']);
            $('#content').append(t);
           
            
        }
        $('.panel-collapse.collapse').on("show.bs.collapse", function(){
            console.log(this);
            doMoreInfo(this.id)
          });
    });
}


//TODO:coinId
//TODO:delete debugger

function doMoreInfo(coinId) {
    debugger;
    let selUrl = "https://api.coingecko.com/api/v3/coins/"+ coinId;
debugger;
    $.ajax({
        url: selUrl,
        method: 'GET'
    }).done(function (d) {
        if (typeof d === 'string')
            d = JSON.parse(d);
debugger;
        let t = TemplateMoreInfo;
        t = t.replace('{{image}}', d['image']);
        t = t.replace('{{usd}}', d['usd']);
        t = t.replace('{{eur}}', d['eur']);
        t = t.replace('{{ils}}', d['ils']);

    //    $('#'+coinId + ' .card').html()
    });
}
