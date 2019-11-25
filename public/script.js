$(".submit-button").on("click", function() {
    console.log("clicked!!!");
    var firstName = $('input[name="first_name"]').val();
    console.log("firstName: ", firstName);
    var lastName = $('input[name="last_name"]').val();
    console.log("lastName: ", lastName);
    $("#results").html("");
    var resultsHtml = "";
});
