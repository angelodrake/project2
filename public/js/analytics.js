

    var chart = d3.select(".chart")
    array = []
    d3.tsv("/api/analytics", function(d) {
        //change to number
            d.value = Number(d.value); 
            array.push(d.value)
            var maxVal = d3.max(array)       
            
           function styleWidth(data) {
                return Number((data.value/maxVal) * 100) + "%";
            };
            var result = styleWidth(d)

            var newDiv = $("<div class ='bar hidden'>")
            newDiv.attr("style", "width:" + result)
            newDiv.text(d.name + " ------ " + result)
            $(".chart").append(newDiv)
        })

        function showData() {
            
            $(".bar").removeClass("hidden")
            $(".bar").addClass("show")
        }

        $(document).on("click", "#toggle", showData)
            

