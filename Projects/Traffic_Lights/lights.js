var EWRS = false, EWSS = false, NSRS = false, PEDS = false, greenLength = 15000, orangeLength = 4000;
$(document).ready(function () {
    'use strict';
    var divContent = '<div id="ER" class="road"></div><div id="NR" class="road"></div><div id="cross"></div><div id="NSS" class="light s rotate0"></div><div id="NSR" class="light r rotate0"></div><div id="EWS" class="light s rotate90"></div><div id="EWR" class="light r rotate90"></div><div id="NSS" class="light s rotate180"></div><div id="NSR" class="light r rotate180"></div><div id="EWS" class="light s rotate270"></div><div id="EWR" class="light r rotate270"></div><div id="PED" class="light p"></div><div class="NSRSens R sens rotate0" onclick="go(0)"></div><div class="NSSSens S sens rotate0"></div><div class="EWSSens S sens rotate90" onclick="go(1)"></div><div class="EWRSens R sens rotate90" onclick="go(2)"></div><div class="NSRSens R sens rotate180" onclick="go(0)"></div><div class="NSSSens S sens rotate180"></div><div class="EWSSens S sens rotate270" onclick="go(1)"></div><div class="EWRSens R sens rotate270" onclick="go(2)"></div><div class="PEDSens P sens rotate0 1" onclick="go(3)"></div><div class="PEDSens P sens rotate0 2" onclick="go(3)"></div><div class="PEDSens P sens rotate0 3" onclick="go(3)"></div><div class="PEDSens P sens rotate0 4" onclick="go(3)"></div>', delay = 0, hold = 0, reset = true, changedState = false;
    function setLight(lightName, state) {
        if (state === 0) {
            $("#" + lightName + " .Light").css({
                'background': '#333'
            });
            $("#" + lightName + " .red").css({
                'background': 'red'
            });
        } else if (state === 1) {
            $("#" + lightName + " .Light").css({
                'background': '#333'
            });
            $("#" + lightName + " .orange").css({
                'background': 'orange'
            });
        } else if (state === 2) {
            var x, y;
            $("#" + lightName + " .Light").css({
                'background': '#333'
            });
            $("#" + lightName + " .red").css({
                'background': 'red'
            });
            setTimeout(function () {
                x = setInterval(function () {
                    $("#" + lightName + " .red").css({
                        'background': 'red'
                    });
                }, 600);
            }, 300);
            y = setInterval(function () {
                $("#" + lightName + " .Light").css({
                    'background': '#333'
                });
            }, 600);
            setTimeout(function () {
                clearInterval(x);
                clearInterval(y);
                $("#" + lightName + " .red").css({
                    'background': 'red'
                });
            }, orangeLength * 2);
        } else {
            $("#" + lightName + " .Light").css({
                'background': '#333'
            });
            $("#" + lightName + " .green").css({
                'background': 'green'
            });
        }
    }
    function changeToGreen(lightName) {
        setLight(lightName, 3);
    }
    function changeToRed(lightName, boolean) {
        if (boolean === undefined) {
            boolean = false;
        }
        if (boolean === false) {
            setLight(lightName, 1);
            setTimeout(function () {
                setLight(lightName, 0);
            }, orangeLength);
        } else {
            setLight(lightName, 2);
            setTimeout(function () {
                setLight(lightName, 0);
            }, orangeLength);
        }
    }
    function nssCheck() {
        if ($('#NSS .red').css("background-color") === "rgb(255, 0, 0)") {
            return false;
        } else {
            return true;
        }
    }
    function setLayout() {
        $("body").html(divContent);
        var h = window.innerHeight / 2 - 75, w = window.innerWidth / 2 - 75;
        $("div").css({
            'position': 'fixed',
            'width': '100px',
            'height': '100px',
            'background': 'red'
        });
        $("body").css({
            'color': '#333',
            'background': '#ADFF00',
            'text-align': 'center',
            'cursor': 'default'
        });
        //roads
        $(".road").html("<div class='line'></div>");
        $("#cross").html("<div class='LT stopLine'></div><div class='LL stopLine'></div><div class='LR stopLine'></div><div class='LB stopLine'></div>");
        $("#cross").css({
            'top': h,
            'left': w,
            'height': '150',
            'width': '150',
            'background': '#666'
        });
        $(".stopLine").css({
            'width': '76',
            'height': '76',
            'background': '#fff',
            'position': 'absolute'
        });
        $(".LT").css({
            'right': '0',
            'height': '3px'
        });
        $(".LB").css({
            'bottom': '0',
            'height': '3px'
        });
        $(".LR").css({
            'right': '0',
            'bottom': '0',
            'width': '3px'
        });
        $(".LL").css({
            'width': '3px'
        });

        //lights
        //creates inner light
        $('.light').html("<div class='Light red'></div><div class='Light orange'></div><div class='Light green'></div>");
        //sets lights up
        $('.light').css({
            'background': '#111',
            'width': '50px',
            'height': '140px',
            'border-radius': '5px',
            'padding': '0px'
        });
        $('.Light').css({
            'border-radius': '100%',
            'background': '#333',
            'line-height': '40px',
            'font-size': '35px',
            'width': '40px',
            'height': '40px',
            'margin-top': '5px',
            'margin-left': '5px'
        });
        $(".p").html("<div class='Light red'></div><div class='Light green'></div>");
        $('.p.light').css({
            'background': '#111',
            'width': '25px',
            'height': '47.5px',
            'border-radius': '5px',
            'padding': '0px'
        });
        $('.p .Light').css({
            'border-radius': '100%',
            'background': '#333',
            'line-height': '20px',
            'font-size': '15px',
            'width': '20px',
            'height': '20px',
            'margin-top': '2.5px',
            'margin-left': '2.5px'
        });
        //light arrows
        $(".r .Light").html("&#8625;");
        $(".s .Light").html("&#8593;");
        $(".p .Light").html("&#128694;");

        //rotates required lights
        $(".rotate90").css({
            '-webkit-transform': 'rotate(90deg)',
            '-moz-transform': 'rotate(90deg)',
            '-o-transform': 'rotate(90deg)',
            '-ms-transform': 'rotate(90deg)',
            'transform': 'rotate(90deg)'
        });
        $(".rotate180").css({
            '-webkit-transform': 'rotate(180deg)',
            '-moz-transform': 'rotate(180deg)',
            '-o-transform': 'rotate(180deg)',
            '-ms-transform': 'rotate(180deg)',
            'transform': 'rotate(180deg)'
        });
        $(".rotate270").css({
            '-webkit-transform': 'rotate(270deg)',
            '-moz-transform': 'rotate(270deg)',
            '-o-transform': 'rotate(270deg)',
            '-ms-transform': 'rotate(270deg)',
            'transform': 'rotate(270deg)'
        });


        //sets all lights to red state
        $(".light .red").css({
            'background': 'red'
        });
        //sensor setup
        $(".R").html("&#8625;");
        $(".S").html("&#8593;");
        $(".P").html("&#128694;");
        $(".sens").css({
            'text-align': 'center',
            'line-height': '30px',
            'font-size': '20px',
            'width': '30px',
            'height': '30px',
            'background': '#333',
            'color': '#ccc',
            'cursor': 'pointer'
        });
    }
    function positions() {
        var h = window.innerHeight / 2 - 75, w = window.innerWidth / 2 - 75, ha = window.innerHeight - 40, wa = window.innerWidth - 40;
        $(".rotate0#NSS").css({
            'top': h - 190,
            'left': w - 50
        });
        $(".rotate0#NSR").css({
            'top': h - 190,
            'left': w + 150
        });
        $(".rotate180#NSS").css({
            'top': h + 200,
            'left': w + 150
        });
        $(".rotate180#NSR").css({
            'top': h + 200,
            'left': w - 50
        });
        $(".rotate90#EWS").css({
            'top': h - 95,
            'left': w + 245
        });
        $(".rotate90#EWR").css({
            'top': h + 105,
            'left': w + 245
        });
        $(".rotate270#EWS").css({
            'top': h + 105,
            'left': w - 145
        });
        $(".rotate270#EWR").css({
            'top': h - 95,
            'left': w - 145
        });
        $("#cross").css({
            'top': h,
            'left': w
        });
        $(".1.PEDSens").css({
            'top': h - 40,
            'left': w - 40
        });
        $(".2.PEDSens").css({
            'top': h - 40,
            'left': w + 160
        });
        $(".3.PEDSens").css({
            'top': h + 160,
            'left': w - 40
        });
        $(".4.PEDSens").css({
            'top': h + 160,
            'left': w + 160
        });
        $(".road").css({
            'background': '#666',
            'width': '100%',
            'height': '100%',
            'top': '0px',
            'left': '0px'
        });
        $("#NR").css({
            'width': '150',
            'left': w
        });
        $("#ER").css({
            'height': '150',
            'top': h
        });
        $(".line").css({
            'height': (h + 75) * 2,
            'width': (w + 75) * 2,
            'background': '#fff'
        });
        $("#NR .line").css({
            'width': '2',
            'margin-left': '74px'
        });
        $("#ER .line").css({
            'height': '2',
            'margin-top': '74px'
        });
        $(".NSRSens.rotate0").css({
            'top': ha,
            'left': w + 40
        });
        $(".NSSSens.rotate0").css({
            'top': ha,
            'left': w + 5
        });
        $(".EWRSens.rotate90").css({
            'left': '10',
            'top': h + 40
        });
        $(".EWSSens.rotate90").css({
            'left': '10',
            'top': h + 5
        });
        $(".NSRSens.rotate180").css({
            'top': '10',
            'left': w + 80
        });
        $(".NSSSens.rotate180").css({
            'top': '10',
            'left': w + 115
        });
        $(".EWRSens.rotate270").css({
            'left': wa,
            'top': h + 80
        });
        $(".EWSSens.rotate270").css({
            'left': wa,
            'top': h + 115
        });
        $('.p').css({
            'top': h + 51.25,
            'left': w + 62.5
        });
    }
    function run() {
        delay += 1;
        if (reset === true) {
            changeToGreen("NSS");
            delay = 0;
            reset = false;
        }
        if (delay >= greenLength / 1000 && (NSRS || EWSS || EWRS || PEDS)) {
            changedState = true;
            if (NSRS && hold === 0) {
                hold = 1;
                if (nssCheck() === true) {
                    changeToRed("NSS");
                    setTimeout(function () {
                        changeToGreen("NSR");
                        setTimeout(function () {
                            changeToRed("NSR");
                            setTimeout(function () {
                                hold = 0;
                                NSRS = false;
                            }, orangeLength * 2);
                        }, greenLength);
                    }, orangeLength * 2);
                } else {
                    changeToGreen("NSR");
                    setTimeout(function () {
                        changeToRed("NSR");
                        setTimeout(function () {
                            hold = 0;
                            NSRS = false;
                        }, orangeLength * 2);
                    }, greenLength);
                }

            }
            if (EWSS && hold === 0) {
                hold = 1;
                if (nssCheck() === true) {
                    changeToRed("NSS");
                    setTimeout(function () {
                        changeToGreen("EWS");
                        setTimeout(function () {
                            changeToRed("EWS");
                            setTimeout(function () {
                                hold = 0;
                                EWSS = false;
                            }, orangeLength * 2);
                        }, greenLength);
                    }, orangeLength * 2);
                } else {
                    changeToGreen("EWS");
                    setTimeout(function () {
                        changeToRed("EWS");
                        setTimeout(function () {
                            hold = 0;
                            EWSS = false;
                        }, orangeLength * 2);
                    }, greenLength);
                }
            }
            if (EWRS && hold === 0) {
                hold = 1;
                if (nssCheck() === true) {
                    changeToRed("NSS");
                    setTimeout(function () {
                        changeToGreen("EWR");
                        setTimeout(function () {
                            changeToRed("EWR");
                            setTimeout(function () {
                                hold = 0;
                                EWRS = false;
                            }, orangeLength * 2);
                        }, greenLength);
                    }, orangeLength * 2);
                } else {
                    changeToGreen("EWR");
                    setTimeout(function () {
                        changeToRed("EWR");
                        setTimeout(function () {
                            hold = 0;
                            EWRS = false;
                        }, orangeLength * 2);
                    }, greenLength);
                }
            }
            if (PEDS && hold === 0) {
                hold = 1;
                if (nssCheck() === true) {
                    changeToRed("NSS");
                    setTimeout(function () {
                        changeToGreen("PED");
                        setTimeout(function () {
                            changeToRed("PED", true);
                            setTimeout(function () {
                                hold = 0;
                                PEDS = false;
                            }, orangeLength * 3);
                        }, greenLength);
                    }, orangeLength * 2);
                } else {
                    changeToGreen("PED");
                    setTimeout(function () {
                        changeToRed("PED", true);
                        setTimeout(function () {
                            hold = 0;
                            PEDS = false;
                        }, orangeLength * 3);
                    }, greenLength);
                }
            }
        }
        if (changedState && !(NSRS || EWSS || EWRS || PEDS)) {
            changedState = false;
            reset = true;
        }
    }
    setLayout();
    setTimeout(function () {
        setInterval(positions, 100);
    }, 100);
    setInterval(run, 1000);
});
function go(num) {
    'use strict';
    switch (num) {
    case 0:
        NSRS = true;
        break;
    case 1:
        EWSS = true;
        break;
    case 2:
        EWRS = true;
        break;
    case 3:
        PEDS = true;
        break;
    }
}

//add sensors for pedestrian crossing