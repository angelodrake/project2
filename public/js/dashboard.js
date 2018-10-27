$("#phone").on("change keyup paste", function () {
    var output;
    var input = $("#phone").val();
    input = input.replace(/[^0-9]/g, '');
    var area = input.substr(0, 3);
    var pre = input.substr(3, 3);
    var tel = input.substr(6, 4);
    if (area.length < 3) {
        output = "(" + area;
    } else if (area.length == 3 && pre.length < 3) {
        output = "(" + area + ")" + " " + pre;
    } else if (area.length == 3 && pre.length == 3) {
        output = "(" + area + ")" + " " + pre + "-" + tel;
    }
    $("#phone").val(output);
});


function tabChanger(event, tabID) {
    tabContent = $(".tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    };

    tabLinks = $(".tab");
    for (var i = 0; i < tabLinks.length; i++) {
        // tabLinks[i].removeClass(" is-active");
        tabLinks[i].className = tabLinks[i].className.replace(" is-active", "")
    };

    // $(tabID).
    document.getElementById(tabID).style.display = "block";
    event.currentTarget.className += (" is-active");
    // this.className += (" is-active");

};

// opening the modal by clicking a patient's row
$(".patient-row").on("click", function () {
    $("#add-modal").addClass("is-active")
})

// closing the modal by the cancel button
$("#add-cancel-button").on("click", function (event) {
    event.preventDefault();
    $("#add-modal").removeClass("is-active")
})

// closing the modal by the x
$("#add-x").on("click", function (event) {
    $("#add-modal").removeClass("is-active")
})