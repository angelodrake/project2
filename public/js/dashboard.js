// Making the phone number auto fill characters ()
function formatPhone(id) {
    return function () {
        var output;
        var input = $(id).val();
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
        $(id).val(output);

    }
} -
    $(".phone").on("change keyup paste", formatPhone("#phone"));
$(".phone").on("change keyup paste", formatPhone("#docPhone"));
$(".phone").on("change keyup paste", formatPhone("#newEmergencyPhone"));


//changing tabs 
function tabChanger(event, tabId) {
    tabContent = $(".tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    };
    tabLinks = $(".tab");
    $("#starting-icon").hide();

    for (var i = 0; i < tabLinks.length; i++) {
        if ($(".tab").hasClass("is-active")) {
            $(".is-active").children().removeClass("tab-link-active")
            $(".is-active").children().addClass("tab-link")
            $(".tab-link").children().removeClass("tab-text-active")
            $(".tab-link").children().addClass("tab-text")

            tabLinks[i].className = tabLinks[i].className.replace(" is-active", "")

        }
    };

    // $(tabId).
    document.getElementById(tabId).style.display = "block";
    event.currentTarget.className += (" is-active");
    $(".is-active").children().removeClass("tab-link")
    $(".is-active").children().addClass("tab-link-active")
    $(".tab-link-active").children().removeClass("tab-text")
    $(".tab-link-active").children().addClass("tab-text-active")
};

// opening the modal by clicking a patient's row
$(document).on("click", ".patient-row", function openModal() {
    $("#add-modal").addClass("is-active")
    var id = this.id.substring(8)
    $.ajax({
        url: "/api/patients/" + id,
        method: "GET"
    }).then(function (data) {
        emptyFields()
        $("#name-container").text(data.name)
        $(".id-container").text(data.id)
        $(".birthday-container").text(data.birthday)
        $(".phone-container").text(data.phone)
        $(".email-container").text(data.email)
        $(".address-container").text(data.address)
        $(".bloodType-container").text(data.bloodType)
        $(".emergencyContact-container").text(data.emergencyContact)
        $(".contactPhone-container").text(data.contactPhone)
        //this Doctors is currently capitalized so be careful if someone changes it.
        for (var i = 0; i < data.Doctors.length; i++) {
            $(".doctor-container").append("<p>" + data.Doctors[i].name + " | " + data.Doctors[i].specialty + " | " + data.Doctors[i].phone + "</p>")
        }
        for (var i = 0; i < data.Prescriptions.length; i++) {
            $(".prescription-container").append("<p>" + data.Prescriptions[i].brand + " | " + data.Prescriptions[i].id + "</p>")
        }
    })
});

//updating patient info
$("#save-changes-button").on("click", function () {
    var id = $(".id-container").text().trim()

    var patient = {
        id: id,
        name: $("#name-container").text().trim(),
        birthday: $(".birthday-container").text().trim(),
        address: $(".address-container").text().trim(),
        phone: $(".phone-container").text().trim(),
        email: $(".email-container").text().trim(),
        bloodType: $(".bloodType-container").text().trim(),
        emergencyContact: $(".emergencyContact-container").text().trim(),
        contactPhone: $(".contactPhone-container").text().trim()
    }
    $.ajax({
        url: "/api/patients",
        method: "PUT",
        data: patient
    }).then(function () {
        //page make put call when dashboard loads

    })
})


// closing the modal by the cancel button
$("#add-cancel-button").on("click", function (event) {
    event.preventDefault();
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
}
    // .then(function () {
    //     $("#loading-patients").style.display = "none";
    // })
);

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

// opening the modal by clicking a doctor's row
$(document).on("click", ".doctor-row", function openModal() {
    $("#doc-modal").addClass("is-active")
    var id = this.id.substring(7)
    $.ajax({
        url: "/api/doctors/" + id,
        method: "GET"
    }).then(function (data) {
        emptyFields()
        $("#doc-name-container").text(data.name)
        $(".doc-specialty-container").text(data.specialty)
        $(".doc-id-container").text(data.id)
        $(".doc-phone-container").text(data.phone)
        $(".doc-email-container").text(data.email)
    })
});

// closing the doc modal by the cancel button
$("#doc-cancel-button").on("click", function (event) {
    event.preventDefault();
    $("#doc-modal").removeClass("is-active")
})

//on click handlers for new doctors and patients
$("#newPatientBtn").click(newPatient)
$("#newDoctorBtn").click(newDoctor)


// new patient function
function newPatient(event) {

    var newPatient = {
        name: $("#name").val().trim(),
        birthday: $("#birthday").val().trim(),
        phone: $("#phone").val().trim(),
        address: $("#address").val().trim(),
        email: $("#newEmail").val().trim(),
        bloodType: $("#newBloodType").val().trim(),
        emergencyContact: $("#newEmergency").val().trim(),
        contactPhone: $("#newEmergencyPhone").val().trim()
    }
    console.log(newPatient)
    $.post("/api/patients", newPatient);
}
// new doctor function
function newDoctor(event) {

    var newDoctor = {
        name: $("#docName").val().trim(),
        specialty: $("#docSpecialty").val().trim(),
        phone: $("#docPhone").val().trim(),
        email: $("#docEmail").val().trim(),
        PatientId: $("#docPatient").val().trim()
    }
    $.post("/api/doctors", newDoctor);
}

function emptyFields() {
    $(".doctor-container").empty();
    $(".prescription-container").empty();

}


//open the editor for any field of the individual patient
$(document).on("click", ".editable", editInfo);
function editInfo() {
    var currentEditable = $(this).text();
    $(this).hide();
    $(this).siblings().val(currentEditable);
    $(this).siblings().show();
    $(this).siblings().focus();
}

//change patient data to match users changes (not posting yet, just on form)
$(document).on("blur", ".hidden-input", matchInput);
function matchInput() {
    var currentEditable = $(this).val();
    $(this).hide();
    $(this).siblings(".editable").text(currentEditable);
    $(this).siblings().show();
    // $(this).siblings().focus();
}

function searchFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("patient-table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function drSearchFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("drSearchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("doctor-table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}