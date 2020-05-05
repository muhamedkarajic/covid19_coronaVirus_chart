class Day {
    constructor(date, confirms, recovered, deaths) {
        this.date = date;
        this.confirmed = confirms;
        this.recovered = recovered;
        this.deaths = deaths;
    }
}

let days;
let dates;
let confirms;
let recovers;
let deads;

let today = null;
let allDays = null;
let countries = null;
let lineChart = null;
let pieChart = null;
let length = null;

$.getJSON("https://pomber.github.io/covid19/timeseries.json", function (data) {
    Object.keys(data).forEach(land => {
        $('#landSelect').append(new Option(land, land));
    });
    countries = data;
    $('#landSelect').val("Bosnia and Herzegovina");
    displayLand("Bosnia and Herzegovina");
});

function resetCurrent() {
    days = [];
    dates = [];
    confirms = [];
    recovers = [];
    deads = [];
    today = null;
    allDays = null;
    if (lineChart != null)
        lineChart.destroy();
    if (pieChart != null)
        pieChart.destroy();
}

function displayLand(land) {
    resetCurrent();
    let bih = countries[land];
    length = bih.length - 1;

    for (let i = 1; i <= length; i++) {
        const current = bih[i];
        const previous = bih[i - 1];
        if (current.confirmed > 0) {
            dates.push(current.date);
            confirms.push(current.confirmed - previous.confirmed);
            recovers.push(current.recovered - previous.recovered);
            deads.push(current.deaths - previous.deaths);
        }
    }

    const current = bih[length];
    const previous = bih[length - 1];
    today = new Day(current.date, current.confirmed - previous.confirmed, current.recovered - previous.recovered, current.deaths - previous.deaths);
    allDays = new Day(current.date, current.confirmed, current.recovered, current.deaths);

    $('#dateLabel').text(today.date);
    $('#confirmsLabel').text(today.confirmed);
    $('#recoveredLabel').text(today.recovered);
    $('#deathsLabel').text(today.deaths);


    $('#totalConfirmsLabel').text(current.confirmed);
    $('#totalRecoveredLabel').text(current.recovered);
    $('#totalDeathsLabel').text(current.deaths);
    createGraph();
}
var lineChartRef = document.getElementById('lineChart').getContext('2d');
var pieChartRef = document.getElementById('pieChart').getContext('2d');
function createGraph() {
    lineChart = new Chart(lineChartRef, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                type: 'line',
                label: 'Confirms',
                data: confirms,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: .5
            },
            {
                type: 'line',
                label: 'Recovers',
                data: recovers,
                backgroundColor: 'rgba(87, 227, 255, 0.5)',
                borderColor: 'rgba(87, 227, 255, 1)',
                borderWidth: .5
            },
            {
                type: 'line',
                label: 'Recovers',
                data: deads,
                backgroundColor: 'rgba(227, 87, 255, 0.5)',
                borderColor: 'rgba(227, 87, 255, 1)',
                borderWidth: .5
            },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    pieChart = new Chart(pieChartRef, {
        type: 'pie',
        data: {
            datasets: [{
                data: [allDays.confirmed, allDays.recovered, allDays.deaths]
                , backgroundColor: ['rgba(222, 227, 85, 0.5)', 'rgba(20, 20, 220, 0.5)', 'rgba(255, 25, 23, 0.5)'],
            }],

            labels: [
                'Confirmed',
                'Recovered',
                'Deaths'
            ]
        }
    });
}


