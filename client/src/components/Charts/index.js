import React from "react";
import {Bar} from 'react-chartjs-2';
// import {Bar} from 'react-chartjs';


// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function tickerChart(props) {

    {/* NJIB trying to insert graph */ }

    // let ctx = document.getElementById('myChart' + chartsDivRef).getContext('2d');
    let ctx = document.getElementById('myChart1-1').getContext('2d');
    console.log("ctx: " + ctx);
    //   priceResults.push(chartResponse.prices[i].close);
    // // priceResults.push(chartResponse.prices[i].close.toPrecision(4));
    // volResults.push(chartResponse.prices[i].volume / 1000000);
    // dayDate.push(moment((chartResponse.prices[i].date) * 1000).format("MMM Do YY"));

    const tickerChart = (props) => {
    // var mixedChart = new Chart(ctx, {
        // type: 'bar',
        const data = {
            datasets: [{
                label: 'Volume (mil.)',
                //Adding in 2nd axis
                yAxisID: 'B',
                backgroundColor: 'darkblue',
                // data: volResults
                data: [1,2,3,4,5]
            }, {
                label: 'Stock Price (US$)',
                //Adding in 2nd axis
                yAxisID: 'A',
                backgroundColor: 'green',
                // data: priceResults,
                data: [1,2,3,4,5],
                type: 'line'
            }],
            // labels: dayDate
            labels: [1,2,3,4,5]
        };
        const options = {
            scales: {
                yAxes: [{
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    labelString: 'Stock Price (US$)',
                }, {
                    id: 'B',
                    //   type: 'linear',
                    position: 'right',
                    labelString: 'Volume',
                    ticks: {
                        // max: 1,
                        // min: 0
                    }
                }]
            }

        };
    };

    // return (
    //     <Bar data={data} options={options} />
    //   )

}

export default tickerChart;