<?php

function insertCountryReturnId($conn, $countryName)
{
    $sql = "INSERT INTO country (name) values (\"{$countryName}\")";
    $conn->query($sql);

    if($conn)
    {
        return $conn->insert_id;
    }
    echo "Error: " . $sql . "\n" . $conn->error . "\n\n";
    return null;
}


function insertReportForCountry($conn, $report, $countryId)
{
    $sql = "INSERT INTO report (confirmed, deaths, recovered, countryId, date) values ($report->confirmed, $report->deaths, $report->recovered, $countryId," . "CAST('" . $report->date . "' AS DATE))";

    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "\n" . $conn->error . "\n\n";
    }
}

function insertReportsForCountry($conn, $reports, $countryId)
{
    foreach ($reports as $report) {
        insertReportForCountry($conn, $report, $countryId);
    }
}
