//************TOGGLE */
var selectedToggleArr = [];

$("#mainContent").on("click", ".toggle1", function () {

    if ($(this).prop("checked")) {
        // debugger;
        alert(($(this)[0].id) + '-' + selectedToggleArr.length);
        //until 5 selected
        //TODO: change 5
        if (selectedToggleArr.length<2){ // 5) {
            //save the selected's id
            selectedToggleArr.push($(this)[0].id);
            //Avoid canceling selection
            ($('#' + $(this)[0].id)).attr("disabled", true);
        }
        else {//popup dialog
            //debugger;
            $.ajax({
                url: '/templates/tempToggleDialog.html',
                success: function (data) {
                     $("#dialogContent").html(data);
                     $('#dialog').modal();
                }
            });


        }
    }

});

//**************END TOGGLE  */



