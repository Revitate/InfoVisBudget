import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

import average from './average.json'

const Container = styled.div`
    margin: 3em;
`

const Tooltip = styled.div`
    position: absolute;
    text-align: center;
    padding: 4px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
`

class BudgetGraph extends Component {
    constructor(props) {
        super(props)
        this.svg = createRef()
        this.tooltip = createRef()
        this.govern = 'abhisit'
    }

    componentWillReceiveProps(props) {
        if (this.govern !== props.government) {
            this.govern = props.government
            this.renderGraph()
        }
    }

    componentDidMount() {
        this.renderGraph()
    }

    renderGraph = () => {
        const raw = average[this.govern]
        const left_key = Object.keys(raw.left)
        const left_data = left_key.map(k => raw.left[k])
        const right_key = Object.keys(raw.right)
        const right_data = right_key.map(k => raw.right[k])
        const dataset = left_data.concat([-1], right_data)

        // const w = this.props.width
        const h = this.props.height
        const bar_w = 13
        //const bar_h = 100
        //let sec_graph = 500;
        const idx_p = left_data.length
        const stroke = 2
        const right_padding = 60
        const bottom_padding = 50
        const bottom_padding_text = 30
        const color1 = 'blue'
        const color2 = 'red'
        const party = ['จังหวัดฝ่ายรัฐบาล', 'จังหวัดฝ่ายค้าน']
        const line_w = idx_p * (bar_w + 1)
        const line_w_end = dataset.length * (bar_w + 1)
        //Create SVG element
        const svg = d3.select(this.svg.current)
        svg.selectAll('*').remove()
        const yScale = d3
            .scaleLinear()
            .range([h, bottom_padding])
            .domain([0, Math.max(...dataset)])
        const xScale = d3
            .scaleLinear()
            .range([line_w_end + right_padding, 0])
            .domain([0, 0])
        const tooltip = d3.select(this.tooltip.current).style('opacity', 0)
        const mouseover = function(d) {
            d3.select(this).style('opacity', 0.5)
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 0.9)
        }
        const mousemove = function(d, i) {
            let prov_name = ''
            if (i < idx_p) {
                prov_name = left_key[i]
            } else if (i > idx_p) {
                prov_name = right_key[i - left_key.length - 1]
            }
            tooltip
                .html(prov_name + ' : ' + d.toFixed(2))
                .style('left', d3.event.pageX + 'px')
                .style('top', d3.event.pageY - 28 + 'px')
        }
        const mouseleave = function(d) {
            d3.select(this).style('opacity', 1)
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 0)
        }
        const lineEnd1 =
            dataset.slice(0, idx_p).reduce((a, b) => a + b) /
            dataset.slice(0, idx_p).length
        const lineEnd2 =
            dataset.slice(idx_p + 1, dataset.length).reduce((a, b) => a + b) /
            dataset.slice(0, idx_p).length
        const mouseover_l = function(d) {
            d3.select(this).style('opacity', 0.5)
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 0.9)
        }
        const mousemove_l1 = function(d) {
            tooltip
                .html('Average Budget : ' + lineEnd1.toFixed(2))
                .style('left', d3.event.pageX + 'px')
                .style('top', d3.event.pageY - 28 + 'px')
        }
        const mousemove_l2 = function(d) {
            tooltip
                .html('Average Budget : ' + lineEnd2.toFixed(2))
                .style('left', d3.event.pageX + 'px')
                .style('top', d3.event.pageY - 28 + 'px')
        }
        const mouseleave_l = function(d) {
            d3.select(this).style('opacity', 1)
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 0)
        }
        svg.append('g')
            .attr(
                'transform',
                `translate(${right_padding - 5},${-bottom_padding})`
            )
            .call(d3.axisLeft(yScale))
        svg.append('g')
            .attr(
                'transform',
                `translate(${right_padding - 5},${h - bottom_padding})`
            )
            .call(d3.axisBottom(xScale))

        svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('x', function(d, i) {
                return i * (bar_w + 1) + right_padding + 15
            })
            .attr('y', function(d) {
                return yScale(d) - bottom_padding
            })
            .attr('width', bar_w)
            .attr('height', function(d) {
                if (d < 0) {
                    return 0
                }
                return h - yScale(d)
            })
            .attr('fill', (d, i) => {
                if (i < idx_p) {
                    if (this.govern === 'abhisit') {
                        return color1
                    }
                    return color2
                } else {
                    return 'gray'
                }
            })
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave)
        svg.append('line')
            .attr('x1', 0 + right_padding + 15)
            .attr('x2', line_w + right_padding + 15)
            .attr('y1', yScale(lineEnd1) - bottom_padding)
            .attr('y2', yScale(lineEnd1) - bottom_padding)
            .attr('stroke-width', stroke)
            .attr('stroke', 'black')
            .attr('stroke-dasharray', '8,3')
            .on('mouseover', mouseover_l)
            .on('mousemove', mousemove_l1)
            .on('mouseleave', mouseleave_l)
        svg.append('line')
            .attr('x1', line_w + (bar_w + 1) + right_padding + 15)
            .attr('x2', line_w_end + right_padding + 15)
            .attr('y1', yScale(lineEnd2) - bottom_padding)
            .attr('y2', yScale(lineEnd2) - bottom_padding)
            .attr('stroke-width', stroke)
            .attr('stroke', 'black')
            .attr('stroke-dasharray', '8,3')
            .on('mouseover', mouseover_l)
            .on('mousemove', mousemove_l2)
            .on('mouseleave', mouseleave_l)

        svg.append('text')
            .attr('class', 'x-label1')
            .attr('text-anchor', 'middle')
            .attr('x', idx_p * (bar_w + 1) * 0.5 + right_padding)
            .attr('y', h - bottom_padding + bottom_padding_text)
            .text(party[0])
        svg.append('text')
            .attr('class', 'x-label2')
            .attr('text-anchor', 'middle')
            .attr('x', dataset.length * (bar_w + 1) * 0.75 + right_padding)
            .attr('y', h - bottom_padding + bottom_padding_text)
            .text(party[1])
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .attr('y', 20)
            .attr('x', (-h + bottom_padding) / 2)
            .text('งบประมาณต่อ 1 หน่วยประชากร')
    }

    render() {
        return (
            <Container>
                <svg
                    ref={this.svg}
                    width={this.props.width}
                    height={this.props.height}
                />
                <Tooltip ref={this.tooltip} />
            </Container>
        )
    }
}

export default BudgetGraph
