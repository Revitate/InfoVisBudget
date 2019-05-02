import React, { Component, createRef } from 'react'
import * as d3 from 'd3'
import * as d3Geo from 'd3-geo'
import mapThaiData from './thailand'
import elecThaiData from './thai_city_elec'
import './MapThailand.css'

class MapThailand extends Component {
    constructor(props) {
        super(props)
        this.svg = createRef()
        this.hl = []
        this.govern = 'abhisit'
    }

    componentDidMount() {
        this.renderMap()
    }
    componentWillReceiveProps(props) {
        if (this.hl.length !== props.highlight.length) {
            this.hl = props.highlight
            this.renderMap()
        }
        if (this.govern !== props.government) {
            console.log(this.props)
            this.govern = props.government
            this.renderMap()
        }
    }

    fillfn = d => {
        return elecThaiData[d.properties.name][this.govern]
    }
    
    fillst = d => {
        if (this.hl.includes(d.properties.name)) {
            return '#02c987'
        }
    }
    
    chwidth = d => {
        if (this.hl.includes(d.properties.name)) {
            return '4'
        }
    }

    renderMap() {
        const { features } = mapThaiData
        var projection = d3Geo
            .geoMercator()
            .scale(2200)
            .rotate([-100.6331, -13.2])
            .translate([this.props.width / 2, this.props.height / 2])
        var path = d3Geo.geoPath().projection(projection)

        const svg = d3.select(this.svg.current)
        svg.selectAll('*').remove()
        const g = svg.append('g')
        const mapLayer = g.append('g').classed('map-layer', true)

        mapLayer
            .selectAll('path')
            .data(features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('vector-effect', 'non-scaling-stroke')
            .attr('fill', this.fillfn)
            .attr('stroke',this.fillst)
            .attr('stroke-width',this.chwidth)
            .on('mouseover', this.mouseover)
            .on('mouseout', this.mouseout)
    }

    mouseover(d) {
        d3.select(this)
        .style('stroke', 'orange')
        .style('stroke-width', '4')
    }

    mouseout(d) {
        d3.select(this)
        .style('stroke', '')
        .style('stroke-width', '1')
    }

    render() {
        return (
            <div>
                <svg
                    ref={this.svg}
                    width={this.props.width}
                    height={this.props.height}
                />
            </div>
        )
    }
}

export default MapThailand
