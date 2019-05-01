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
    }

    componentDidMount() {
        this.renderMap()
    }
    componentWillReceiveProps(props) {
        if (this.hl.length !== props.highlight.length) {
            this.hl = props.highlight
            this.renderMap()
        }
    }

    fillfn = d => {
        if (this.hl.includes(d.properties.name)) {
            return 'green'
        }
        else{
            console.log(this.props.government)
            return elecThaiData[d.properties.name][this.props.government]
        }
    }

    renderMap() {
        const { features } = mapThaiData
        var projection = d3Geo
            .geoMercator()
            .scale(1700)
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
            .on('mouseover', this.mouseover)
            .on('mouseout', this.mouseout)
    }

    mouseover(d) {
        d3.select(this).style('fill', 'orange')
    }

    mouseout(d) {
        d3.select(this).style('fill', this.fillfn)
    }

    render() {
        return (
            <>
                <svg
                    ref={this.svg}
                    width={this.props.width}
                    height={this.props.height}
                />
            </>
        )
    }
}

export default MapThailand
