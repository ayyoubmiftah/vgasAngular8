/*=========================================================================================
    File Name: distributed-series.js
    Description: Chartist distributed series chart
==========================================================================================*/

// Distributed series chart
// ------------------------------
$(window).on("load", function(){

    new Chartist.Bar('#distributed-series', {
        labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        series: [20, 60, 120, 200, 180, 20, 10]
    }, {
        distributeSeries: true
    });
});