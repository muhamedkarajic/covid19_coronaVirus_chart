<?php
require 'objects.php';
require 'config.php';

$countryIdReq = (int) $conn->real_escape_string($_REQUEST['countryId']);
if(!$countryIdReq)
    die("countryId not found!");

$sql = "SELECT 
            id, 
            date, 
            confirmed, 
            deaths, 
            recovered 
        FROM report 
        WHERE countryId = {$countryIdReq} and confirmed > 0";

$result = $conn->query($sql);
$array = array();

while ($r = $result->fetch_assoc()) {
    $array[] = new Report(
        $r["id"], 
        $r["date"], 
        $r["confirmed"], 
        $r["deaths"], 
        $r["recovered"] 
    );
}

echo json_encode($array);
$conn->close();
