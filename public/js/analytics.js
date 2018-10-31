

var chart = d3.select(".chart")
array = []
var chartWidth = $(".chart").width()
console.log(chartWidth)
d3.tsv("/api/analytics", function (d) {
    //change to number
    d.value = Number(d.value);
    array.push(d.value)
    var maxVal = d3.max(array)
    function styleWidth(data) {
        return Number((data.value / maxVal) * 100) + "% ";
    };
    var result = styleWidth(d)

    var newDiv = $("<div class ='bar hidden' name = 'width" + result + "'>")
    newDiv.attr("style", "width:" + result + "; position: relative; right: 100%")
    newDiv.text(d.name + " ------ " + result)
    $(".chart").append(newDiv)
})

function showData() {
    var wide = $(".bar").width() * .62
    $(".bar").removeClass("hidden")
    $(".bar").addClass("show")
    $(".bar").animate({
        left: "+=" + wide,
    }, 1000

    )

    $("#toggle").addClass("hidden")
}

$(document).on("click", "#toggle", showData)


