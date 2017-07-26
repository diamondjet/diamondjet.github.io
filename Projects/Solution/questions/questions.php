<?php

    $function = $_POST['function'];

    $log = array();

    switch($function) {
        case('getQuestions'):
            $xml=simplexml_load_file("questions.xml");
            $log['q'] = $xml;
            break;
        }
    echo json_encode($log);
?>
