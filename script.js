
//************NavBar *********
//Coins
$('#mainNav>li>a').click(function (e) {

    changeProgressBar(0);
    e.preventDefault();
    const href = $(this).attr('href');
    changeProgressBar(20);
    $.ajax('/templates/' + href + '.html')

        //TODO: check - function?
        //$.ajax('/templates/{href}.html')
        .done(function (htmlData) {
            changeProgressBar(40);
            $('#mainContent').html(htmlData);

            if (href === 'tempBaseCoins') {
                changeProgressBar(50);
                doBaseApi();//load data on scriptCoind.js            
            }
            if (href === 'tempAbout') {
                changeProgressBar(100);
            }

            selectedToggleArr = [];//for toggle -count selected reports
        })
});

function changeProgressBar(current_progress) {
    //TODO: float progreesbar
    //TODO: cache local
    $("#dynamic")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
        .text(current_progress + "% Complete")

    if (current_progress === 0) {
        $('.progress').addClass('visible').removeClass('invisible');
    }
    if (current_progress === 100) {
        setTimeout(function () {
            $('.progress').addClass('invisible').removeClass('visible');
         //   changeProgressBar(0);
        }, 1500)
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
    alert("success");
});



    //TODO:delete debugger

