$(document).ready(function() {
    var mobmenu = $("#mobilemenu")

    $(window).resize(function () {
        mobmenu.attr("data-open", "false");
    });

    $("#mobilemenu").click(function () {
        mobmenu.attr("data-open", "false");
    });

    $(".hamburger_menu_button").click(function () {

        var isopen = mobmenu.attr("data-open");
        isopen == "true" ? mobmenu.attr("data-open", "false") : mobmenu.attr("data-open", "true");
    });
});