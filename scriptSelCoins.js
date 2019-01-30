//************TOGGLE */
var selectedToggleArr = [];
var tempToggleDialog;
var lastSelectedCoinId;


$.ajax({
    url: '/templates/tempSelCoinsModal.html',
    success: function (data) {
        tempToggleDialog = data;
    }
});


//Add selected coins until 5 , else open Modal
$("#mainContent").on("click", ".toggleMainCoins", function () {
    if ($(this).prop("checked")) {
        //until 5 selected
        if (selectedToggleArr.length < 5) { 
            //save the selected's id

            selectedToggleArr.push($(this)[0].id);
            //Avoid canceling selection
            ($('#' + $(this)[0].id)).attr("disabled", true);

        }
        else {//popup modalCoins & save the sixth
            lastSelectedCoinId = $(this)[0].id;
            loadModalSelCoins();
            $('#modalCoins').modal();
        }
    }

});


//on close modal
$('#modalCoins').on('hidden.bs.modal', function () {
    //canceled the last selected coins if "hide" comes from close button
    //if it's disabled so the "hide" comes after unchecked a coin  - from modal
    if (!($('#' + lastSelectedCoinId).attr("disabled"))) {
        $('#' + lastSelectedCoinId).prop("checked", false);
    }

    $('#ModalContent').empty();
})

function loadModalSelCoins() {

    $('#ModalContent').empty();
    //TODO: progress
    for (i = 0; i < (selectedToggleArr.length); i++) {
        fillModalContent(selectedToggleArr[i]);
    }
}

function fillModalContent(DataRow) {

    let t = tempToggleDialog;
    let regexSymbol = /{{symbol}}/g;

    let initial = 'customSwitches';
    let symbolTitle = DataRow.substring(initial.length);//just the symbol

    t = t.replace(regexSymbol, symbolTitle);
    $('#ModalContent').append(t);
}


//**************END TOGGLE  */


//******MODAL */
//uncheck toggle - Remove/Add new selected coin
$("#modalCoins").on("click", ".toggleModal", function (e) {
    debugger;
    //toggle name on main screen and Modal are not equal...
    // toggleName = ModalcustomSwitches+ $(this)[0].id;
    // toggleOnBaseName =customSwitches+ $(this)[0].id;
    let toggleName = $(this)[0].id;
    let toggleIdTosearchInArray = toggleName.substring(5);//'Modal'.length

    if (!($(this).prop("checked"))) {
        //1 - remove the unchecked coin from array
        selectedToggleArr.splice(selectedToggleArr.indexOf(toggleIdTosearchInArray), 1);
        //2 - enabled toggle on main screen
        $('#' + toggleIdTosearchInArray)
            .removeAttr('disabled');
        $('#' + toggleIdTosearchInArray).prop("checked", false);
        //3 - disabled the last selected toggle that load the modal  
        $('#' + lastSelectedCoinId).attr("disabled", true);
        //4 - add the last selected toggle  to array
        selectedToggleArr.push(lastSelectedCoinId);

        //5 - close modal
        $('#modalCoins').modal("hide");
        //refreshModal();
    }


});

/*
function refreshModal() {
    if ((selectedToggleArr.length) > 0)
        loadModalSelCoins();
    else //close modal
    {
        $('#modalCoins').modal("hide");
    }
/*
}
//***********END MODAL */
