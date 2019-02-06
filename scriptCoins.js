
var TemplateCoins;
var MainData;
var cacheObj = {};
window.cacheArr = window.cacheArr || [];

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
        //button cancel filter
        $('#filterButton')
            .html('Filter')
            .val('filter');
        $('#searchInput').val('');
        //hidden message
        $('#foundMessage').addClass('invisible').removeClass('visible');
    }
}


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
    changeProgressBar(70);
   // let selUrl = "https://api.coingecko.com/api/v3/coins/list";
   let selUrl = "tempData/baseData.json";
  
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

            if (hits != null) {
                fillContent(MainData[i]);
                founded++;
            }
        }
    }
    //found message
    if (subStr != null) {
        $('#foundMessage').text(founded + ' matches found');
    } else { //after cancel filter, check all selected toggle
        checkedSelectedCoins(); //checked the selected's toggle
    }

    //*****More Info Button */
    $('.panel-collapse.collapse').on("show.bs.collapse", function () {
        doMoreInfo(this.id)
    });
    $('.panel-collapse.collapse').on("hidden.bs.collapse", function () {
    });


}

function fillTemplate(d, coinId) {
    let t = TemplateMoreInfo;
    t = t.replace('{{image}}', d.image.thumb);
    t = t.replace('{{usd}}', d.market_data.current_price.usd);
    t = t.replace('{{eur}}', d.market_data.current_price.eur);
    t = t.replace('{{ils}}', d.market_data.current_price.ils);

    $('#' + coinId + ' .card').html(t);
    changeProgressBar(100);
}


function getProjectsFromCache(index, coinId) {
    fillTemplate(window.cacheArr[index].projects, coinId);
}


function getProjectsFromServer(coinId) {
    let selUrl = "/tempData/moreInfoBitcoin.json";
   // let selUrl = "https://api.coingecko.com/api/v3/coins/" + coinId;


    changeProgressBar(0);

    $.ajax({
        url: selUrl,
        method: 'GET',
    }).done(function (d) {
        if (typeof d === 'string')
            d = JSON.parse(d);
        pushToCacheArray(coinId, d);
        changeProgressBar(50);
        fillTemplate(d, coinId);
    });

}

//*******cacheArray */
function pushToCacheArray(coinId, d) {
    //if the coin is exist, replace data , else push
    IsExists = false;

    cacheObj.id = coinId;
    cacheObj.projects = d;
    cacheObj.lastFetch = new Date();

    if (window.cacheArr.length > 0) {
        for (s of window.cacheArr) {
            if (s.id === coinId) {
                s.d = d;
                s.lastFetch = new Date();
                isExists = true;
            }
        }
        if (!(isExists)) {
            window.cacheArr.push(cacheObj);
        }
    }
    else { //first time
        window.cacheArr.push(cacheObj);
    }
}

function findCoinInCacheArray(coinId) {
    let isExists = false;
    for (i = 0; i < window.cacheArr.length; i++) {
        if (window.cacheArr[i].id === coinId) {
            isExists = true;
            return i;
        }
    }
    if (!(isExists)) {
        return -1;
    }
}
//**********End function of cacheArray */



function doMoreInfo(coinId) {

    let index = findCoinInCacheArray(coinId);
    if (index > -1) {
        const lastTime = window.cacheArr[index].lastFetch;
        const dateNow = new Date();
        const diff = (dateNow.getTime() - lastTime.getTime()) / 1000;
        // todo:
        //if (diff > 2 * 60) {
        if (diff > 2 ) {
            getProjectsFromServer(coinId);
        } else {
            getProjectsFromCache(index, coinId);
        }
    } else {
        getProjectsFromServer(coinId);
    }

}

    //******End More Info Button */


