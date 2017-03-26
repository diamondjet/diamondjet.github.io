var total = 0, wins = 0, loses = 0;
$(document).ready(function() {
    startUp()
    setInterval(function() {
        $("ul").css("left", ($(document).width()-parseInt($("ul").css("width")))/2)
    }, 100);
});
function resetDeck() {
    var x = upperhand.length
    for (var i = 0; i<x;i++) {
        deck.addCard(upperhand[0])
    }
    x = lowerhand.length
    for (var i = 0; i<x;i++) {
        deck.addCard(lowerhand[0])
    }
    x = dealer.length
    for (var i = 0; i<x;i++) {
        deck.addCard(dealer[0])
    }
    cards.shuffle(deck)
    lowerhand.render()
    upperhand.render()
    dealer.render()
    deck.render()
    setTimeout(function() {
        setUpDeck()
    }, 1000)
}
function startUp() {
    cards.init({table:'#cardDisplay'});
    deck = new cards.Deck();
    deck.addCards(cards.all);
    deck.render({immediate:true});
    lowerhand = new cards.Hand({faceUp:true, y:350});
    upperhand = new cards.Hand({faceUp:false, y:50});
    dealer = new cards.Hand({faceUp:true, y:50, x:210})
    setUpDeck()
}
function setUpDeck() {
    $("#wins").html("Wins: " + wins)
    $("#loses").html("Loses: " + loses)
    $("#points").html('0')
    $("#aiPoints").html('0')
    upperhand.faceUp = false
    deck.deal(2, [lowerhand,upperhand], 0, function () {
        total += Math.min(lowerhand[0].rank, 10)
        total += Math.min(lowerhand[1].rank, 10)
        $("#points").html(total);
        dealer.addCard(upperhand[1])
        upperhand.x-=8
        upperhand.render()
        dealer.render({callback: function() {
            $("#aiPoints").html(Math.min(dealer[0].rank, 10))
        }})
        deck.click(function(){
    		lowerhand.addCard(deck.topCard());
    		lowerhand.render();
            total += Math.min(lowerhand[lowerhand.length-1].rank, 10);
            $("#points").html(total);
            if (total > 21) {
                lowerhand._click = "";
                deck._click = "";
                upperhand.addCard(dealer[0]);
                upperhand.x+=8
                ai()
            }
    	});
        lowerhand.click(function() {
            upperhand.addCards(dealer);
            upperhand.faceUp = true;
            upperhand.x+=8;
            upperhand.render();
            lowerhand._click = "";
            deck._click = "";
            ai();
        });
    });
}
var aiTotal = 0, ax
function ai() {
    var paused = false
    aiTotal += Math.min(upperhand[0].rank, 10)
    aiTotal += Math.min(upperhand[1].rank, 10)
    if (total <= 21) {
        $("#aiPoints").html(aiTotal);
    }
    setTimeout(function() {
        ax = setInterval (function () {
            if (aiTotal >= 17 || total > 21) {
                if ((aiTotal >= total && aiTotal <= 21) || (total > 21)) {
                    loses += 1
                } else {
                    wins += 1
                }
                total = 0
                aiTotal = 0
                clearInterval(ax)
                resetDeck()
                return
            }
            paused = true
            deck.deal(1, [upperhand]);
            upperhand.render()
            aiTotal += Math.min(upperhand[upperhand.length-1].rank, 10)
            $("#aiPoints").html(aiTotal);
        }, 1000);
    }, 500);
}
