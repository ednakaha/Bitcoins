var chartIntervalId; //chart interval
//************NavBar *********
//Coins
$('#mainNav>li>a').click(function (e) {

    changeProgressBar(0);
    e.preventDefault();
    const href = $(this).attr('href');
    changeProgressBar(20);
    $.ajax('/templates/' + href + '.html')
        .done(function (htmlData) {
            changeProgressBar(40);
            $('#mainContent').empty();
            $('#mainContent').html(htmlData);

            clearInterval(chartIntervalId);//stop chart interval


            if (href === 'tempBaseCoins') {

                changeProgressBar(50);
                doBaseApi();//load data on scriptCoind.js   
            }
            if (href === 'tempAbout') {
                changeProgressBar(100);
            }
            if (href === 'tempChart') {
                loadChart();

            }
        })
});

function changeProgressBar(current_progress) {
    //TODO: cache local
    $("#dynamic")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
        .text(current_progress + "% Complete")

    if (current_progress === 0) {
        $('.progress').modal();
    }
    if (current_progress === 100) {
        setTimeout(function () {
            $('.progress').modal("hide");
        }, 500)
    }

}
//************FORMS ************


var TemplateMoreInfo;


$.ajax({
    url: '/templates/tempMoreInfo.html',
    success: function (data) {
        TemplateMoreInfo = data;
    }
});


$("#mainContent").on("click", "#buttonAbout", function () {

});



    //TODO:delete debugger

