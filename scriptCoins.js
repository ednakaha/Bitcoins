
var TemplateCoins;
var MainData;
window.cacheObj = window.cacheObj || {};

//TODO:CACHE

$.ajax({
    url: '/templates/tempCoins.html',
    success: function (data) {
        TemplateCoins = data;
    }
});



function ChangeStatusFilter() {
    if ($('#filterButton').val() === "filter") {
        //button filter
        $('#filterButton')
            .html('Cancel Filter')
            .val('CancelFilter');
        //show message
        $('#foundMessage').addClass('visible').removeClass('invisible');
    }
    else {
        //button filter
        $('#filterButton')
            .html('Filter')
            .val('filter');
        $('#searchInput').val('');
        //hidden message
        $('#foundMessage').addClass('invisible').removeClass('visible');
    }
}

/*/TO DO:ENTER
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        alert('You pressed enter!');
    }
});
*/

$("#mainContent").on("click", "#filterButton", function () {
    //on Filter Mode
    if ($(this).val() === "filter") {
        if ($('#searchInput').val() != '') {
            changeProgressBar(0);
            doFilter($('#searchInput').val());
            ChangeStatusFilter();
        }
        else { alert('Please fill search word') }
    }
    else //on cancel Filter mode
    {
        doFilter(null);
        ChangeStatusFilter();
    }
});


function loadPageCoins() {
    for (i = 0; i < 100; i++) {
        fillContent(MainData[i]);
    }

    changeProgressBar(100);
    //*****More Info Button */
    $('.panel-collapse.collapse').on("show.bs.collapse", function () {
        doMoreInfo(this.id)
    });
    $('.panel-collapse.collapse').on("hidden.bs.collapse", function () {
        //     changeProgressBar(0);
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


function doBaseApi() {

    $('#content').empty();
    //TODO:change url
    let selUrl = "tempData/baseData.json";
    changeProgressBar(70);
    //let selUrl="https://api.coingecko.com/api/v3/coins/list";
    $.ajax({
        url: selUrl,
        method: 'GET'
    }).done(function (d) {
        if (typeof d === 'string')
            d = JSON.parse(d);

        MainData = d;
        loadPageCoins();
        if (selectedToggleArr.length > 0) { //Not first loading 
            checkedSelectedCoins();
        }
    });

}

function checkedSelectedCoins() {
    for (i = 0; i < selectedToggleArr.length; i++) {

        $('#' + selectedToggleArr[i]).attr("disabled", true);
        $('#' + selectedToggleArr[i]).prop("checked", true);
    }


}
function doFilter(subStr) {
    $('#content').empty();

    let founded = 0;

    for (i = 0; i < 100; i++) {
        changeProgressBar(i + 1);
        if (subStr === null) //unFilter
        {
            fillContent(MainData[i]);
        }
        else {//Filter
            var reg = new RegExp("\\b" + subStr + "\\b", "g");
            var hits = MainData[i]['symbol'].match(reg);
            //  if (MainData[i]['symbol'].indexOf(reg) > -1) {
            if (hits != null) {
                fillContent(MainData[i]);
                founded++;
            }
        }
    }
    //found message
    if (subStr != null) {
        $('#foundMessage').text(founded + ' matches found');
    }
    //*****More Info Button */
    $('.panel-collapse.collapse').on("show.bs.collapse", function () {
        doMoreInfo(this.id)
    });
    $('.panel-collapse.collapse').on("hidden.bs.collapse", function () {
        changeProgressBar(0);
    });


}

function fillTemplate(d, coinId) {
    let t = TemplateMoreInfo;
    t = t.replace('{{image}}', d.image.thumb);
    t = t.replace('{{usd}}', d.market_data.current_price.usd);
    t = t.replace('{{eur}}', d.market_data.current_price.eur);
    t = t.replace('{{ils}}', d.market_data.current_price.ils);

    $('#' + coinId + ' .card').html(t);
}
function getProjectsFromServer(callback) {
    $.ajax('http://localhost:3000/project').done(function (d) {
        callback(d);
    });


    let selUrl = "/tempData/moreInfoBitcoin.json";
    //TODO:change url
    // let selUrl = "https://api.coingecko.com/api/v3/coins/" + coinId;

    changeProgressBar(0);

    $.ajax({
        url: selUrl,
        method: 'GET',
    }).done(function (d) {
        changeProgressBar(50);
        if (typeof d === 'string')
            d = JSON.parse(d);
        //   fillTemplate(d, coinId);

        changeProgressBar(100);
    });

}
function fromServer(callback) {
    getProjectsFromServer(function (pData) {
        window.cacheObj.projects = pData;
        window.cacheObj.lastFetch = new Date();
        callback(pData);
        console.log('from server')
    });
}
function doMoreInfo(coinId) {

    const lastTime = window.cacheObj.lastFetch;
    if (lastTime) {
        const dateNow = new Date();
        const diff = (dateNow.getTime() - lastTime.getTime()) / 1000;
        if (diff > 20) {
            fromServer(callback);
        } else {
            callback(window.cacheObj.projects);
            console.log('from cache')
        }
    } else {
        fromServer(callback);
    }
    fillTemplate(callback, coinId);
}

    //******End More Info Button */

}
