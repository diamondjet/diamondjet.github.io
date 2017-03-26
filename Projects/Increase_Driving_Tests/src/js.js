$(document).ready(function () {
    
    //div hider and shower
    $(function () {
        $("section>div:nth-child(2)").hide();
        $("section").mouseenter(function () {
            var ID = $(this).attr("id"), hideID = "#" + ID + "A", showID = "#" + ID + "B";
            $(hideID).fadeOut(300);
            setTimeout(function () {
                $(showID).fadeIn(300);
                $(hideID).hide();
            }, 300);
            
        });
        $("section").mouseleave(function () {
            var ID = $(this).attr("id"), showID = "#" + ID + "A", hideID = "#" + ID + "B";
            $(hideID).fadeOut(300);
            setTimeout(function () {
                $(showID).fadeIn(300);
                $(hideID).hide();
            }, 300);
        });
    });
    
    //menu opener
    var textHeight = parseInt($('#bottemContent').css('height'));
    $("#navbarBottom").hide();
    $("#navbarTopLi1").click(function () {
        var x = ((window.innerHeight - textHeight) / 2) - parseInt($('header').css('height'));
        $("#navbarBottom").css('padding-top', x);
        $("#navbarBottom").slideToggle("slow");
    });
    
});
