import React from "react";
import { Bar, Line, Pie, Mixedchart } from 'react-chartjs-2';

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

// class Chart extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             chartData: {
//                 labels: ['A', 'B', 'C', 'D', 'E', 'F'],
//                 datasets: [{
//                     label: 'Example Value',
//                     data: [1, 2, 3, 4, 5, 6]
//                 }]
//             }
//         }
//     }
    // }

    export function Chart(props) {
    // render() {
        return (
            <div className="chart">
                {/* <Bar
                    data={this.state.chartData}
                    // width={100}
                    // height={50}
                    // options={{ maintainAspectRatio: false }}
                /> */}
                IMPORTING FROM CHARTS/INDEX.JS
            </div>
        );
    }
// }

export default Chart;