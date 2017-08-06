<?php
$log = array();
$function = $_POST['function'];
switch ($function) {
    case 'addScore':
    $xmlDoc = new DOMDocument();
    $xmlDoc->load("score.xml");

        break;

    default:
        # code...
        break;
}
echo json_encode($log);
?>
