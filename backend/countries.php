<?php
require 'objects.php';
require 'config.php';

$sql = "SELECT id, name FROM country";

$result = $conn->query($sql);
$current_row = 0;
$array = array();
if ($result->num_rows > 0) {
    while ($r = $result->fetch_assoc()) {
        $id = $r["id"];
        $name = $r["name"];
        $array[] = new Country($id, $name);
    }
    echo json_encode($array);

} else {
    echo "No results.";
}


$conn->close();
