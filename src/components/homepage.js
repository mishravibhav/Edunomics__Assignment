import React from "react";
import { v4 as uuidv4 } from "uuid";
import Graph from "./Trajactory";
import "./homepage.css";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      River_velocity: "",
      Person_velocity: "",
      Angle_of_swim: "",
      width_of_river: "",
      Data: [],
    };
  }

  handlechange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  HandleSubmit = (e) => {
    e.preventDefault();
    const {
      River_velocity,
      Person_velocity,
      Angle_of_swim,
      width_of_river,
      Data,
    } = this.state;
    const Deviation =
      ((width_of_river * River_velocity) / Person_velocity) *
        Math.cos(Angle_of_swim) +
      width_of_river * Math.tan(Angle_of_swim);

    const payload = {
      id: uuidv4(),
      River_vel: River_velocity,
      Person_vel: Person_velocity,
      Angle_of_swim: Angle_of_swim,
      width_of_river: width_of_river,
      Deviattion: Deviation,
    };

    this.setState({
      Data: [...Data, payload],
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    fetch(
      "https://todolist-json-mocker.herokuapp.com/edunomics__Data",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log("There is some Error"));
  };

  render() {
    const {
      River_velocity,
      Person_velocity,
      Angle_of_swim,
      width_of_river,
      Data,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.HandleSubmit} className="form_style">
          <div>
            River Velocity :
            <input
              type="number"
              value={River_velocity}
              name="River_velocity"
              onChange={this.handlechange}
              placeholder="Enter River velocity"
            ></input>
          </div>
          <div>
            Person Velocity :
            <input
              type="number"
              value={Person_velocity}
              name="Person_velocity"
              onChange={this.handlechange}
              placeholder="Enter Person Velocity"
            ></input>
          </div>
          <div>
            Angle of Swim :
            <input
              type="number"
              value={Angle_of_swim}
              name="Angle_of_swim"
              onChange={this.handlechange}
              placeholder="Enter angle of swim"
            ></input>
          </div>
          <div>
            Width of River :
            <input
              type="number"
              value={width_of_river}
              name="width_of_river"
              onChange={this.handlechange}
              placeholder="Enter width of river"
            ></input>
          </div>
          <div>
            <input type="submit" value="SUBMIT"></input>
          </div>
        </form>
        <div>
          <Graph />
        </div>
      </div>
    );
  }
  componentDidMount() {}
}

export default Homepage;
