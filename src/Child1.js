import React, { Component } from "react";
import * as d3 from "d3";
import './Child1.css'

class Child1 extends Component {
  state = { 
    company: "Apple", // Default Company
    selectedMonth: 'November' //Default Month
  };

  componentDidMount() {
    //console.log(this.props.csv_data) // Use this data as default. When the user will upload data this props will provide you the updated data

    var data = this.props.csv_data;
    //console.log(data)

    this.forceUpdate()

  }

  componentDidUpdate() {
    //console.log('update')
    //console.log(this.props.csv_data)

    const options = ['Apple', 'Microsoft', 'Amazon', 'Google', 'Meta']; // Use this data to create radio button
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Use this data to create dropdown

    const margin = { top: 70, right: 60, bottom: 50, left: 80 };
    const width = 600;
    const height = 400;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
   //var test = new Date("2024-12-02");
    //console.log(test.getMonth())

    var data = this.props.csv_data.filter(d => (d.Company ==this.state.company && months[d.Date.getMonth()]==this.state.selectedMonth));

    var circleData = [];

    for (var i = 0 ;i<data.length;i+=2){
      circleData.push(data[i])
    }

    //console.log('circle data: ',circleData)

    const xScale = d3.scaleTime().domain(d3.extent(data, (d) => d.Date)).range([0, innerWidth]);

    var close_max = d3.max(data, (d) => d.Close)
    var open_max = d3.max(data, (d) => d.Open)

    var y_max = (close_max>open_max) ? close_max : open_max

    var close_min = d3.min(data, (d) => d.Close)
    var open_min = d3.min(data, (d) => d.Open)

    var y_min = (close_min<open_min) ? close_min : open_min

    //console.log(y_max)

    const yScale = d3.scaleLinear().domain([y_min, y_max]).range([innerHeight, 0]);

    const svg = d3.select(".chart-container").select("svg")
            .attr("width", width) // Use width for parent SVG
            .attr("height", height) // Use height for parent SVG
            .select("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

    //console.log(data)

    svg.selectAll(".x-axis").data([null]).join("g").attr("class", "x-axis").attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(xScale)).selectAll('text').attr("transform",'rotate(45)').attr("dy",'10').attr('text-anchor','start');
    svg.selectAll(".y-axis").data([null]).join("g").attr("class", "y-axis").attr("transform", `translate(0,0)`).call(d3.axisLeft(yScale).tickFormat(d => isNaN(d) ? "" : `$${d.toFixed(2)}`));
    

    var closeLineGenerator = d3.line().curve(d3.curveCatmullRom).x(d=>xScale(d.Date)).y(d=>yScale(d.Close))
    var closePathData = closeLineGenerator(data)

    svg.selectAll('.close').data([data]).join('path').attr('class','close').attr('d',closePathData).style('stroke','#e41a1c').style('fill','none').style('stroke-width','2')
  
    var openLineGenerator = d3.line().curve(d3.curveCatmullRom).x(d=>xScale(d.Date)).y(d=>yScale(d.Open))
    var openPathData = openLineGenerator(data)

    svg.selectAll('.open').data([data]).join('path').attr('class','open').attr('d',openPathData).style('stroke','#b2df8a').style('fill','none').style('stroke-width','2')

    svg.selectAll('.cCircle').data(data).join('circle').attr('class','cCircle').attr('cx',d=>xScale(d.Date)).attr('cy',d=>yScale(d.Close)).attr('r',3).attr('fill','#e41a1c')
    svg.selectAll('.oCircle').data(data).join('circle').attr('class','oCircle').attr('cx',d=>xScale(d.Date)).attr('cy',d=>yScale(d.Open)).attr('r',3).attr('fill','#b2df8a')

    const legend = svg.select('.legend')

    legend.selectAll('p').join('rect').attr('height',50).attr('width',50)

  }

  handleButtonChange = (event) => {
    this.setState({
      company : event.target.value
    })
    //console.log(this.state.company)
  }

  handleDropDownChange = (event) =>{
    this.setState({
      selectedMonth : event.target.value
    })
  }

  render() {
    const options = ['Apple', 'Microsoft', 'Amazon', 'Google', 'Meta']; // Use this data to create radio button
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Use this data to create dropdown


    return (

      <div className="child1">
        
        <div className="buttons">
        <input type="radio" value="Apple" name="Company" onChange={this.handleButtonChange} defaultChecked/> Apple
        <input type="radio" value="Microsoft" name="Company" onChange={this.handleButtonChange}/> Microsoft
        <input type="radio" value="Amazon" name="Company" onChange={this.handleButtonChange}/> Amazon
        <input type="radio" value="Google" name="Company" onChange={this.handleButtonChange}/> Google
        <input type="radio" value="Meta" name="Company" onChange={this.handleButtonChange}/> Meta
        </div>

        <div className="dropdown" >
          <select onChange={this.handleDropDownChange} defaultValue={"November"}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="chart-container">

        <svg className="mySvg" width={600} height={400}>

          <g>
            
          </g>

        </svg>
        <div className="legend">
          <div className="legend1">
            <svg width={15} height={15}>
              <rect width={15} height={15} className="openRect"></rect>
            </svg>
            <p>Open</p>
          </div>
          <div className="legend1">
            <svg width={15} height={15}>
              <rect width={15} height={15} className="closeRect"></rect>
            </svg>
            <p>Close</p>
          </div>
        </div>

        </div>

      </div>
    );
  }
}


export default Child1;

