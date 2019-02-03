
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
            if (href === 'tempChart') {
                loadChart();
                changeProgressBar(100);
            }

            // selectedToggleArr = [];//for toggle -count selected coins
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
            //   changeProgressBar(0);
        }, 750)
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

