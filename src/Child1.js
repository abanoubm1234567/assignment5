import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  state = { 
    company: "Apple", // Default Company
    selectedMonth: 'November' //Default Month
  };

  componentDidMount() {
    console.log(this.props.csv_data) // Use this data as default. When the user will upload data this props will provide you the updated data

    var data = this.props.csv_data;
    console.log(data)

  }

  componentDidUpdate() {
    //console.log('update')
    //console.log(this.props.csv_data)

    const options = ['Apple', 'Microsoft', 'Amazon', 'Google', 'Meta']; // Use this data to create radio button
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Use this data to create dropdown

    const margin = { top: 70, right: 60, bottom: 50, left: 80 };
    const width = 1000;
    const height = 400;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    var test = new Date("2024-12-02");
    console.log(test.getMonth())

    var data = this.props.csv_data.filter(d => (d.Company ==this.state.company && months[d.Date.getMonth()]==this.state.selectedMonth));

    const xScale = d3.scaleTime().domain(d3.extent(data, (d) => d.Date)).range([0, innerWidth]);

    var close_max = d3.max(data, (d) => d.Close)
    var open_max = d3.max(data, (d) => d.Open)

    var y_max = (close_max>open_max) ? close_max : open_max

    console.log(y_max)

    const yScale = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0]);

    console.log(data)

  }

  render() {
    const options = ['Apple', 'Microsoft', 'Amazon', 'Google', 'Meta']; // Use this data to create radio button
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Use this data to create dropdown

    return (
      <div className="child1">
          
      </div>
    );
  }
}

export default Child1;
