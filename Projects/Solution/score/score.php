<?php
$log = array();
$function = $_POST['function'];
switch ($function) {
    case 'addScore':
    $xmlDoc = new DOMDocument();
    $xmlDoc->load("score.xml");
    $x = $xmlDoc->documentElement;
    $done = false;
    foreach ($x->childNodes AS $item) {
        if ($item->nodeName == $_POST['username']) {
            $item->nodeValue = $item->nodeValue + 1;
            //$log['b']=$xmlDoc;
            $done = true;
        }
    }
    if (!$done) {
        $score = $xmlDoc->getElementsByTagName('score');
        $x->appendChild($xmlDoc->createElement($_POST['username'], 1));//NEED TO ADD NEW ELEMENT
    }
    $xmlDoc->save("score.xml");
    break;

    default:
        # code...
        break;
}
echo json_encode($log);
?>
