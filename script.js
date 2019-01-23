

var TemplateCoins;
var MainData;

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

function ChangeInnerHTML() {
  //  debugger;
    //TODO: with instead of '#filterButton'
        if ($('#filterButton').val() === "filter") {
            $('#filterButton').html('Cancel Filter');
            $('#filterButton').val('CancelFilter');
        }
        else {
            $('#filterButton').html('Filter');
            $('#filterButton').val('filter');
        }
    
}

$("#filterButton").click(function () {
    //on Filter Mode
    if ($(this).val() === "filter") {
        if ($('#searchInput').val() != '') {
            doFilter($('#searchInput').val());
            ChangeInnerHTML();
        }
        else { alert('Please fill search word') }
    }
    else //on unFilter mode
    {
        doFilter(null);
        ChangeInnerHTML();
    }
});



function doBaseApi() {
    $('#content').empty();

    let selUrl = "data.json";//"https://api.coingecko.com/api/v3/coins/list";

    /*    var regexSymbol = /{{symbol}}/g;
        var regexId = /{{id}}/g;
    */
    $.ajax({
        url: selUrl,
        method: 'GET'
    }).done(function (d) {
        if (typeof d === 'string')
            d = JSON.parse(d);
        MainData = d;

        for (i = 0; i < 100; i++) {
            fillContent(d[i]);
        }
        $('.panel-collapse.collapse').on("show.bs.collapse", function () {
            //  console.log(this);
            doMoreInfo(this.id)
        });
    });
}

function fillContent(DataRow) {
    let t = TemplateCoins;
    let regexSymbol = /{{symbol}}/g;
    let regexId = /{{id}}/g;

    t = t.replace(regexSymbol, DataRow['symbol']);
    t = t.replace(regexId, DataRow['id']);
    t = t.replace('{{name}}', DataRow['name']);
    $('#content').append(t);
}

function doFilter(subStr) {
    $('#content').empty();
    
    for (i = 0; i < 100; i++) {
        if (subStr === null) //unFilter
        {
            fillContent(MainData[i]);
        }
        else {//Filter
            if (MainData[i]['id'].indexOf(subStr) > -1) {
                fillContent(MainData[i]);
            }
        }
    }
    $('.panel-collapse.collapse').on("show.bs.collapse", function () {
        //  console.log(this);
        doMoreInfo(this.id)
    });
}


//TODO:delete debugger

function doMoreInfo(coinId) {
    debugger;
    let selUrl = "https://api.coingecko.com/api/v3/coins/" + coinId;
    debugger;


    $.ajax({
        url: selUrl,
        method: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function () { alert("Success"); },
        error: function () { alert('Failed!'); }

        /* }).done(function (d) {
             if (typeof d === 'string')
                 d = JSON.parse(d);
             debugger;
             let t = TemplateMoreInfo;
             t = t.replace('{{image}}', d.image.thumb);
             t = t.replace('{{usd}}', d.market_data.current_price.usd);
             t = t.replace('{{eur}}', d.market_data.current_price.eur);
             t = t.replace('{{ils}}', d.market_data.current_price.ils);
     
             $('#' + coinId + ' .card').html(t);*/
    });
}

