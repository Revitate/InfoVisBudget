import React, { Component } from 'react';
import styled from 'styled-components';
import { SectionPage } from './SectionPage';
import ChartWrapper from "./Budget_graph";

const Container = styled.div`
    padding: 3em;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

class Section2 extends Component {
    render() {
        return (
            <SectionPage ref={this.props.forwardedRef} color={this.props.bgc}>
                <Container>
                    <h1>รายงานงบประมาณในแต่ละจังหวัด</h1>
                    <ChartWrapper />
                </Container>
            </SectionPage>
        )
    }
}

export default Section2
