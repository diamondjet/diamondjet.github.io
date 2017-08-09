<?php
$score;
$wrong;
$log = array();
$function = $_POST['function'];
$name=$_POST['username'];
function addScore($c = true)
{
    $xmlDoc = new DOMDocument();
    $xmlDoc->load("score.xml");
    $x = $xmlDoc->documentElement;
    $exists = false;
    $count = 0;
    foreach ($x->childNodes AS $item) {
        $GLOBALS['log'][$count]=$item->nodeName;
        $count += 1;
        if ($item->nodeName == $GLOBALS['name']) {
            $exists = true;
            if ($c) {
                $item->getElementsByTagName('score')[0]->nodeValue+=1;
            }
            $item->getElementsByTagName('wrong')[0]->nodeValue+=1;
            //break;
        }
    }
    if (!$exists) {
        $x->appendChild($xmlDoc->createElement($GLOBALS['name']));
        if ($c) {
            $x->getElementsByTagName($GLOBALS['name'])[0]->appendChild($xmlDoc->createElement('score',1));
        } else {
            $x->getElementsByTagName($GLOBALS['name'])[0]->appendChild($xmlDoc->createElement('score',0));
        }
        $x->getElementsByTagName($GLOBALS['name'])[0]->appendChild($xmlDoc->createElement('wrong',1));
        /*if($c) {
            $x->getElementsByTagName($GLOBALS['name'])[0]->nodeValue += 1;
        }*/
    }
    $GLOBALS['score'] = $x->getElementsByTagName($GLOBALS['name'])[0]->getElementsByTagName('score')[0]->nodeValue;
    $GLOBALS['wrong'] = $x->getElementsByTagName($GLOBALS['name'])[0]->getElementsByTagName('wrong')[0]->nodeValue;
    /*
    if(!$exists && $c) {
        $x->appendChild($xmlDoc->createElement($GLOBALS['name'],1));
        $GLOBALS['score']=1;
    }
    elseif (!$exists) {
        $x->appendChild($xmlDoc->createElement($GLOBALS['name'],0));
        $GLOBALS['score']=0;
    }*/
    $GLOBALS['log']['exists']=$exists;
    $xmlDoc->save("score.xml");
}
switch ($function) {
    case 'addScore':
        addScore(true);
        break;
    case 'addWrong':
        addScore(false);
        break;

}
echo json_encode(array($score,$wrong));
?>
