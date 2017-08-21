<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Add Question</title>
        <script src="../scripts/jquery.js"></script>
        <script src="../question_adder/adder.js"></script>
        <style>
            #left {
                float: left;
                display: block;
                text-align: right;
                width: 49vw;
            }
            #right {
                float: right;
                clear: none;
                display: block;
                text-align: left;
                width: 49vw;
            }
            #bSubmit {
                width: 20vw;
                margin-left: 40vw;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div id='left'>
            Question:<br />
            Correct Answer:<br />
            Wrong Answer 1:<br />
            Wrong Answer 2:<br />
            Wrong Answer 3:<br />
        </div>
        <div id='right'>
            <input type="text" id="q" /><br />
            <input type="text" id="c" /><br />
            <input type="text" id="a1" /><br />
            <input type="text" id="a2" /><br />
            <input type="text" id="a3" /><br />
        </div>

        <input type="button" value="Submit (Or Enter)" id="bSubmit" />
    </body>
</html>
