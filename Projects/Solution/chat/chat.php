<?php

$function=preg_replace("/[^\w\s.,!?]/i", '', $_POST['function']);

$log = array();

switch($function) {

    case('getState'):
        if(file_exists('chat.txt')){
            $lines = file('chat.txt');
        }
        $log['state'] = count($lines);
    break;

    case('update'):
        $state = preg_replace("/[^\w\s.,!?]/i", '', $_POST['state']);
        if(file_exists('chat.txt')){
            $lines = file('chat.txt');
        }
        if($state == count($lines)){
            $log['state'] = $state;
            $log['text'] = false;

        }
        else{
            $text= array();
            $log['state'] = count($lines);
            foreach ($lines as $line_num => $line)
            {
                if($line_num >= $state){
                    $text[] =  $line = str_replace("\n", "", $line);
                }
            }
            $log['text'] = $text;
        }
    break;

    case('send'):
        $nickname = htmlentities(strip_tags(preg_replace("/[^\w\s.,!?]/i", '', $_POST['nickname']))) . ': ';
        $message = htmlentities(strip_tags(preg_replace("/[^\w\s.,!?■]/i", '', $_POST['message'])));
        if(($message) != "\n" && ($message) != ""){
            fwrite(fopen('chat.txt', 'a'), "<span>". $nickname . "</span>" . $message = str_replace("\n", " ", $message) . "\n");
        }
    break;
    case('reset'):
        fwrite(fopen('chat.txt','w'),"");
}

echo json_encode($log);

?>
