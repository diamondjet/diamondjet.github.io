<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>IT PERFECT</title>
        <link rel="stylesheet" type="text/css" href="style/main.css" />
    </head>
    <body>
        <div id='left'>
            <ul>
                <a href="#" id='qb'><li>
                    Questions
                </li></a>
                <a href="#" id='sb'><li>
                    Scores
                </li></a>
                <a href="#" id='db'><li>
                    Study Design
                </li></a>
            </ul>
            <ol>
                <li class='login'>
                    <input type="text" placeholder="Username" id='SName' maxlength="9" />
                    <input type="button" value="Go" id='BLogin' />
                </li>
                <li class="score">
                    Score: <span id='score'></span><br / />
                    Percentage: <span id='percentage'></span>
                </li>
            </ol>
        </div>
        <div id='top'>
            <h1>IT PERFECT</h1>
            <h2>QUESTIONS</h2>
        </div>
        <div id='bottom'>
            <section id='q'>
                <h3 class="question">Q. <span id="question">What is the airspeed velocity of an unladen swallow?</span></h3>
                <div id='aOuter'>
                    <article class="answer a">
                        <h4>African or European</h4>
                    </article>
                    <article class="answer b">
                        <h4>5m/s</h4>
                    </article>
                    <article class="answer c">
                        <h4>10m/s</h4>
                    </article>
                    <article class="answer d">
                        <h4>I don't know</h4>
                    </article>
                </div>
            </section>
            <section id="d">
                <embed src="pdf/Computing_Study_Design.pdf" type='application/pdf'>
            </section>
            <section id="s">
                <div id='topScore'>
                    <ol>
                        <li>1. <span></span></li>
                        <li>2. <span></span></li>
                        <li>3. <span></span></li>
                        <li>4. <span></span></li>
                        <li>5. <span></span></li>
                        <li>6. <span></span></li>
                        <li>7. <span></span></li>
                        <li>8. <span></span></li>
                        <li>9. <span></span></li>
                        <li>10. <span></span></li>
                    </ol>
                </div>
            </section>
        </div>
        <div id='right'>
            <div id='chat'>
                <p id='chatInternal'>

                </p>
            </div>
            <textarea id='chatInput'></textarea>
            <button id="chatSubmit">SUBMIT</button>
        </div>
    </body>
    <script src="scripts/jquery.js"></script>
    <script src="scripts/main.js"></script>
    <script src='chat/chat.js'></script>
    <script src="questions/questions.js"></script>
    <script src="score/score.js"></script>
</html>
