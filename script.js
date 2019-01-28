
//************NavBar *********
//Coins
$('#mainNav>li>a').click(function (e) {
    e.preventDefault();
    const href = $(this).attr('href');
    changeProgressBar(20);
    $.ajax('/templates/' + href + '.html')

        //TODO: check
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

             selectedToggleArr=[];//for toggle -count selected reports
        })
});

function changeProgressBar(current_progress) {
    $("#dynamic")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
        .text(current_progress + "% Complete");

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

