<?php   

$serverName = "localhost";
$userName = "root";
$password = "";
$dataBase = "covid19";
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$conn = new mysqli($serverName, $userName, $password, $dataBase);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
