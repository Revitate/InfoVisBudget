import React, { Component, createRef } from 'react'
import * as d3 from 'd3'
import * as d3Geo from 'd3-geo'
import mapThaiData from './thailand'
import './MapThailand.css'

class MapThailand extends Component {
    constructor(props) {
        super(props)
        this.svg = createRef()
    }

    componentDidMount() {
        this.renderMap()
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
        const g = svg.append('g')
        const mapLayer = g.append('g').classed('map-layer', true)

        mapLayer
            .selectAll('path')
            .data(features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('vector-effect', 'non-scaling-stroke')
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
