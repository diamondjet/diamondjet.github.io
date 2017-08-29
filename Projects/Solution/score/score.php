<?php

$function=preg_replace("/[^\w\s.,!?]/i", '', $_POST['function']);
$log;
function addScore($c = true)
{
    $score;
    $wrong;
    $name='u'.preg_replace("/[^\w\s.,!?]/i", '', $_POST['username']);
    $xmlDoc = new DOMDocument();
    $xmlDoc->load("score.xml");
    $x = $xmlDoc->documentElement;
    $exists = false;
    foreach ($x->childNodes AS $item) {
        if ($item->nodeName == $name) {
            $exists = true;
            if ($c) {
                $item->getElementsByTagName('score')[0]->nodeValue+=1;
            }
            $item->getElementsByTagName('wrong')[0]->nodeValue+=1;
            break;
        }
    }
    if (!$exists) {
        $x->appendChild($xmlDoc->createElement($name));
        if ($c) {
            $x->getElementsByTagName($name)[0]->appendChild($xmlDoc->createElement('score',1));
        } else {
            $x->getElementsByTagName($name)[0]->appendChild($xmlDoc->createElement('score',0));
        }
        $x->getElementsByTagName($name)[0]->appendChild($xmlDoc->createElement('wrong',1));
    }
    $score = $x->getElementsByTagName($name)[0]->getElementsByTagName('score')[0]->nodeValue;
    $wrong = $x->getElementsByTagName($name)[0]->getElementsByTagName('wrong')[0]->nodeValue;
    $GLOBALS['log'] = array($score,$wrong);
    $xmlDoc->save("score.xml");
}
switch ($function) {
    case 'addScore':
        addScore(true);
        break;
    case 'addWrong':
        addScore(false);
        break;
    case 'reset':
        $xmlDoc = new DOMDocument();
        $xmlDoc->load("score.xml");
        $x = $xmlDoc->documentElement;
        foreach ($x->childNodes AS $item) {
            $x->removeChild($item);
        }
        $xmlDoc->save("score.xml");
        break;
    case 'getTop':
        $xmlDoc = new DOMDocument();
        $xmlDoc->load("score.xml");
        $x = $xmlDoc->documentElement;
        $top = array();
        foreach ($x->childNodes AS $item) {
            $score = $item->getElementsByTagName('score')[0]->nodeValue;
            $name = substr($item->nodeName,1);
            $top[$name]=$score;
        }
        arsort($top);
        $GLOBALS['log'] = array_slice($top,0,10);
        break;
    case 'getCurrent':
        addScore(false);
        $xmlDoc = new DOMDocument();
        $xmlDoc->load("score.xml");
        $x = $xmlDoc->documentElement;
        $x->getElementsByTagName('u'.preg_replace("/[^\w\s.,!?]/i", '', $_POST['username']))[0]->getElementsByTagName('wrong')[0]->nodeValue-=1;
        $log[1]-=1;
        $xmlDoc->save("score.xml");
        break;
}
echo json_encode($log);
?>
