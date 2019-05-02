import React, { Component } from "react";
import styled from "styled-components";
import * as d3 from 'd3'

const Container = styled.section`
div.tooltip {	
    position: absolute;			
    text-align: center;					
    padding: 4px;				
    font: 12px sans-serif;		
    background: lightsteelblue;	
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
}
`;

const dataset = [ 5, 10, 13, 19, 21,5, 10, 13, 19, 21, 25, 22, 18, 15, 13,5, 10, 13, 19, 21, 25, 22, 18, 15, 13,-1, 11, 2, 5, 20, 8, 17, 16, 8, 3, 5,5, 10, 13, 19, 1, 5, 22, 18, 5, 3,18, 5, 3, ];
//Width and height
const w = 1000;
const h = 300;
const bar_w = 15;
const bar_h = 100;
//let sec_graph = 500; 
const idx_p = 25;
const stroke = 2;
const right_padding =60;
const bottom_padding = 50;
const bottom_padding_text = 30;
const color1 = "blue";
const color2 = "red";
const party = ["จังหวัดฝ่ายรัฐบาล","จังหวัดฝ่ายค้าน"]
const line_w = idx_p*(bar_w+1)
const line_w_end = dataset.length*(bar_w+1)

class ChartWrapper extends Component {
    componentDidMount = () => {
        d3.select("#result")
        //Create SVG element
        var svg = d3.select("#result")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
        let yScale = d3.scaleLinear()
            .range([h,bottom_padding])
            .domain([0,Math.max(...dataset)])
        let xScale = d3.scaleLinear()
            .range([line_w_end+right_padding,0])
            .domain([0,0])
        var tooltip = d3.select("#result").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);
        var mouseover = function(d){
            d3.select(this)
                .style("opacity", 0.5);
            tooltip.transition()		
                .duration(200)		
                .style("opacity", .9);
        }
        var mousemove = function(d){		
            tooltip.html("Bangkok : "+d)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
        }
        var mouseleave = function(d){
            d3.select(this)
                .style("opacity",1)
            tooltip.transition()		
                .duration(200)		
                .style("opacity", 0);
        }
        var lineEnd1 = dataset.slice(0,idx_p).reduce((a,b) => a+b)/dataset.slice(0,idx_p).length;
        var lineEnd2 = dataset.slice(idx_p+1,dataset.length).reduce((a,b) => a+b)/dataset.slice(0,idx_p).length;
        var mouseover_l = function(d){
            d3.select(this)
                .style("opacity", 0.5);
            tooltip.transition()		
                .duration(200)		
                .style("opacity", .9);
        }
        var mousemove_l1 = function(d){		
            tooltip.html("Average Budget : "+ lineEnd1)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
        }
        var mousemove_l2 = function(d){		
            tooltip.html("Average Budget : "+ lineEnd2)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
        }
        var mouseleave_l = function(d){
            d3.select(this)
                .style("opacity",1)
            tooltip.transition()		
                .duration(200)		
                .style("opacity", 0);
        }
        var yaxis = svg.append("g")
            .attr("transform",`translate(${right_padding-5},${-bottom_padding})`)
            .call(d3.axisLeft(yScale));
        var xaxis = svg.append("g")
            .attr("transform",`translate(${right_padding-5},${h-bottom_padding})`)
            .call(d3.axisBottom(xScale));

        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                return i*(bar_w+1)+right_padding
            })
            .attr("y", function(d){
                return yScale(d)-bottom_padding
            })
            .attr("width", bar_w)
            .attr("height", function(d){
                return h-yScale(d)
            })
            .attr("fill",function(d,i){
                if (i>idx_p){
                    return color1
                }else if (i==idx_p){
                    return "none"
                }else{
                    return color2
                }
            })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
        var line1 = svg.append("line")
            .attr("x1", 0+right_padding)
            .attr("x2", line_w+right_padding)
            .attr("y1", yScale(lineEnd1)-bottom_padding)
            .attr("y2", yScale(lineEnd1)-bottom_padding)
            .attr("stroke-width", stroke)
            .attr("stroke", "black")
            .attr("stroke-dasharray", "8,3")
            .on("mouseover", mouseover_l)
            .on("mousemove", mousemove_l1)
            .on("mouseleave", mouseleave_l);
        var line2 = svg.append("line")
            .attr("x1", line_w+(bar_w+1)+right_padding)
            .attr("x2", line_w_end+right_padding)
            .attr("y1", yScale(lineEnd2)-bottom_padding)
            .attr("y2", yScale(lineEnd2)-bottom_padding)
            .attr("stroke-width", stroke)
            .attr("stroke", "black")
            .attr("stroke-dasharray", "8,3")
            .on("mouseover", mouseover_l)
            .on("mousemove", mousemove_l2)
            .on("mouseleave", mouseleave_l);;

        var party_label1 = svg.append("text")
            .attr("class", "x-label1")  
            .attr( 'text-anchor', 'middle')
            .attr("x", idx_p*(bar_w+1)*0.5+right_padding) 
            .attr("y", h-bottom_padding+bottom_padding_text )
            .text(party[0]);
        var party_label2 = svg.append("text")
            .attr("class", "x-label2")
            .attr( 'text-anchor', 'middle')
            .attr("x", dataset.length*(bar_w+1)*0.75+right_padding) 
            .attr("y", h-bottom_padding+bottom_padding_text )
            .text(party[1]);
        var ylabel = svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", 20)
            .attr("x", (-h+bottom_padding)/2)
            .text("งบประมาณต่อ 1 หน่วยประชากร");
    }

    render() {
        return (
            <Container id="result" />
        );
    }
}

export default ChartWrapper;