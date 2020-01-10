import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import { Divider} from 'semantic-ui-react';
import { Chart } from "react-google-charts";



// Display a graph, showing how many videos were uploaded per week,
// over the last 18 months. A graphing library such as Google Charts or
// Highcharts is typically useful for this step.

// 72 weeks


class ChartContainer extends Component {

  render() {
    return (
      <Container>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Week', 'Number of Videos'],
          [8, 37],
          [4, 19.5],
          [11, 52],
          [4, 22],
          [3, 16.5],
          [6.5, 32.8],
          [14, 72],
        ]}
        options={{
          title: 'Videos Per Week',
          hAxis: { title: 'Week', minValue: 0, maxValue: 72},
          vAxis: { title: 'Number of Videos', minValue: 0, maxValue: 5 },
          legend: 'none',
          trendlines: { 0: {} },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      </Container>
    )
  }
}
export default Chart;
