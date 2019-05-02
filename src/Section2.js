import React, { Component } from 'react'
import styled from 'styled-components'
import { SectionPage } from './SectionPage'
import BudgetGraph from './Budget_graph'

const Container = styled.div`
    margin: 0em 1em 0em 1em;
    padding: 4em 3em 1em 3em;
    width: calc(100vw - (2em));
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 100vh;
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
                    <BudgetGraph
                        width={1200}
                        height={400}
                        government={this.props.government}
                    />
                </Container>
            </SectionPage>
        )
    }
}

export default Section2
