
//************NavBar *********
//Coins
$('#mainNav>li>a').click(function (e) {
    e.preventDefault();
    const href = $(this).attr('href');
    $.ajax('/templates/' + href + '.html')
        //TODO: check
        //$.ajax('/templates/{href}.html')
        .done(function (htmlData) {
            $('#mainContent').html(htmlData);
            if (href === 'tempBaseCoins') {
                doBaseApi();//load data on scriptCoind.js
            }
        })
});

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

