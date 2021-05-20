<?php
class Country
{
    public $id;
    public $name;

    function __construct($id, $name)
    {
        $this->name = $name;
        $this->id = $id;
    }
}

class Report
{
    public $id;
    public $date;
    public $confirmed;
    public $deaths;
    public $recovered;

    function __construct($id, $date, $confirmed, $deaths, $recovered)
    {
        $this->id = $id;
        $this->date = $date;
        $this->confirmed = $confirmed;
        $this->deaths = $deaths;
        $this->recovered = $recovered;
    }
}
