$(document).ready(function() {
    
    //div hider and shower
    $(function() {
        $("#topLeftHidden").hide();
        $("#midLeftHidden").hide();
        $("#bottomMidHidden").hide();
        $("#bottomRightHidden").hide();
        $("section").mouseenter(function() {
            var ID = $(this).attr("id");
            var hideID = "#" + ID + "Shown";
            var showID = "#" + ID + "Hidden";
            $(hideID).fadeOut(300);
            setTimeout(function(){
                $(showID).fadeIn();
            },400);
            
        });
        $("section").mouseleave(function() {
            var ID = $(this).attr("id");
            var showID = "#" + ID + "Shown";
            var hideID = "#" + ID + "Hidden";
            $(hideID).fadeOut(300);
            setTimeout(function(){
                $(showID).fadeIn();
            },400);
        });
    });
    
    //menu opener
    $("#navbarBottom").hide();
    $("#navbarTopLi1").click(function() {
        var x = $(document).height();
        $("#navbarBottom").css("height", x);
        $("#navbarBottom").slideToggle("slow");
    });
    
    //image switcher
    $(function(){
       function slideSwitch(){
           var $active = $('#slideshow img.active');
           var $next = $active.next();

            if ( $active.length == 0 ) $active = $('#slideshow IMG:last');

            var $next =  $active.next().length ? $active.next()
            : $('#slideshow IMG:first');

           $active.addClass('last-active');

           $next.css({opacity: 0.0})
             .addClass('active')
             .animate({opacity:1.0}, 1000, function() {
                  $active.removeClass('active last-active');
             });
      }
      setInterval(slideSwitch, 5000 );
    });
    
    //page refitter when view on narrow devices
    $(function(){
        function shrink() {
            $("#leftSide").css("width","100%");
            $("#rightSide").css("width","100%");
            $("#bottomMid").css("width","100%");
            $("#bottomRight").css("width","100%");
            $("#slideshow img").css("min-width","100%");
            $("#slideshow img").css("max-width","100%");
            $("#slideshow img").css("width","100%");
        }
        function grow() {
            $("#leftSide").css("width","30%");
            $("#rightSide").css("width","70%");
            $("#bottomMid").css("width","60%");
            $("#bottomRight").css("width","40%");
            $("#slideshow img").css("min-width","70%");
            $("#slideshow img").css("max-width","70%");
            $("#slideshow img").css("width","70%");
        }
        function resizeCheck() {
            if(window.innerWidth<800) {
                shrink();
            }
            else {
                grow();
            }
        }
        setInterval(resizeCheck, 10);
    });
    
});
