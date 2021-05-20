<?php
require 'objects.php';
require 'config.php';
require 'helpers.php';

$json = file_get_contents("https://pomber.github.io/covid19/timeseries.json");

$map = json_decode($json);

foreach ($map as $counryName => $reports) {
    $countryId = insertCountryReturnId($conn, $counryName);
    if($countryId !== null)
        insertReportsForCountry($conn, $reports, $countryId);
}

$conn->close();
