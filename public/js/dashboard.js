// Making the phone number auto fill characters () -
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

//changing tabs 
function tabChanger(event, tabId) {
    tabContent = $(".tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    };

    tabLinks = $(".tab");
    for (var i = 0; i < tabLinks.length; i++) {
        // tabLinks[i].removeClass(" is-active");
        tabLinks[i].className = tabLinks[i].className.replace(" is-active", "")
    };

    // $(tabId).
    document.getElementById(tabId).style.display = "block";
    event.currentTarget.className += (" is-active");
    // this.className += (" is-active");

};

// opening the modal by clicking a patient's row

$(document).on("click", ".patient-row", function openModal() {
    $("#add-modal").addClass("is-active")
    var id = this.id.substring(8)
    console.log(id)
    $.ajax({
        url: "/api/patients/" + id,
        method: "GET"
    }).then(function (data) {
        emptyFields()
        $("#name-container").text(data.name)
        $(".birthday-container").text(data.birthday)
        $(".phone-container").text(data.phone)
        $(".email-container").text(data.email)
        $(".address-container").text(data.address)
        //this Doctors is currently capitalized so be careful if someone changes it.
        for (var i = 0; i < data.Doctors.length; i++) {
            $(".doctor-container").append("<p>" + data.Doctors[i].name + " | " + data.Doctors[i].id + "</p>")
        }
        for (var i = 0; i < data.Perscriptions.length; i++) {
            $(".perscription-container").append("<p>" + data.Perscriptions[i].brand + " | " + data.Perscriptions[i].id + "</p>")
        }
    })

});


// closing the modal by the cancel button
$("#add-cancel-button").on("click", function (event) {
    event.preventDefault();
    $("#add-modal").removeClass("is-active")
})

// closing the modal by the x
$("#add-x").on("click", function (event) {
    $("#add-modal").removeClass("is-active")
})

//filling patients table
$("#all-patients-tab").click(function fillPatients() {
    $.ajax({
        url: "/api/patients",
        method: "GET"
    }).then(function (data) {
        console.log(data[0].name)
        $("#patient-holder").empty();
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id
            var name = data[i].name
            var patientTr = $("<tr class = 'patient-row' id = 'patient-" + id + "'> <td>" + id + " | " + name + "</td></tr>")
            $("#patient-holder").append(patientTr);
        }

    })
});

//filling doctors table
$("#all-doctors-tab").click(function fillDoctors() {
    $.ajax({
        url: "/api/doctors",
        method: "GET"
    }).then(function (data) {
        console.log(data[0].name)
        $("#doctor-holder").empty();
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id
            var name = data[i].name
            var doctorTr = $("<tr class = 'doctor-row' id = 'doctor-" + id + "'> <td>" + id + " | " + name + "</td></tr>")
            $("#doctor-holder").append(doctorTr);
        }
    })
});

function emptyFields() {
    $(".doctor-container").empty();
}

// // 
// $(document).on("click", ".editable", editInfo);

// function editInfo() {
//     var currentTodo = $(this).data("todo");
//     $(this).children().hide();
//     $(this).children("input.edit").val(currentTodo.text);
//     $(this).children("input.edit").show();
//     $(this).children("input.edit").focus();
// }
