$(document).ready(function() {
    $('html').keydown(function (e) {
        if (e.keyCode == 13) {
            submit();
        }
    });
    $('#bSubmit').click(submit);
});
function submit() {
    if ($("#q")[0].value.length > 0 && $("#c")[0].value.length > 0 && $("#a1")[0].value.length > 0 && $("#a2")[0].value.length > 0  && $("#a3")[0].value.length > 0) {
        var xml = "";
        xml += "    <qu>\n";
        xml += "        <q>" + $("#q")[0].value + "</q>\n";
        xml += "        <c>" + $("#c")[0].value + "</c>\n";
        xml += "        <a>" + $("#a1")[0].value + "</a>\n";
        xml += "        <a>" + $("#a2")[0].value + "</a>\n";
        xml += "        <a>" + $("#a3")[0].value + "</a>\n";
        xml += "    </qu>\n";
        $.ajax({
            type: "POST",
            url: "../question_adder/adder.php",
            data: {
                data: xml
            },
            dataType: "json",
        });
        $("#q")[0].value = '';
        $("#c")[0].value = '';
        $("#a1")[0].value = '';
        $("#a2")[0].value = '';
        $("#a3")[0].value = '';
    } else {
        $('input[type=text]').css('background','red');
        setTimeout(function () {
            $('input[type=text]').css('background','white');
        },1000);
    }

}
