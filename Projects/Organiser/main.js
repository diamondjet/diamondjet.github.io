$(document).ready(function() {
    $(".right p").attr('contenteditable', 'true')
    for (var i = 0; i<6; i++) {
        if ($(".right p:nth-child("+i+")").html() == "") {
            $(".right p:nth-child("+i+")").html(" ")
        }
    }
    for (var i = 1; i<=6; i++) {
        $(".right p:nth-child("+i+")").html(Cookies.get('item'+i))
    }
    $('p').keyup(setAll)
});
function setAll () {
    Cookies.set('item1', $(".right p:nth-child(1)").html(), { expires: 100 });
    Cookies.set('item2', $(".right p:nth-child(2)").html(), { expires: 100 });
    Cookies.set('item3', $(".right p:nth-child(3)").html(), { expires: 100 });
    Cookies.set('item4', $(".right p:nth-child(4)").html(), { expires: 100 });
    Cookies.set('item5', $(".right p:nth-child(5)").html(), { expires: 100 });
    Cookies.set('item6', $(".right p:nth-child(6)").html(), { expires: 100 });
}