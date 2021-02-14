import React from "react";
import { Line } from "react-chartjs-2";
import "./trajectory.css";

const data = {
  labels: [5, 10, 15, 20, 25, 30, 35, 40, 50],
  datasets: [
    {
      label: "trajectory path",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

class Trajectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
    };
  }

  componentDidMount = () => {
    const { Data } = this.state;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "https://todolist-json-mocker.herokuapp.com/edunomics__Data",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        this.setState({
          Data: res,
        });
      })
      .catch((err) => console.log("There is some Error"));

    const { datasets } = this.refs.chart.chartInstance.data;
    console.log(datasets[0].data);
  };

  render() {
    const { Data } = this.state;
    console.log("inside render");
    console.log(Data);
    return (
      <div className="Graph__container">
        <h2>Trajectory path</h2>
        <div className="Graph__area">
          <Line ref="chart" data={data} />
        </div>
      </div>
    );
  }
}

export default Trajectory;
