import React, { Component } from 'react'
import styled from 'styled-components'
import { SectionPage } from './SectionPage'

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
            <SectionPage ref={this.props.forwardedRef}>
                <Container>
                    <h1>Some Graph</h1>
                    <h1>Some Graph</h1>
                </Container>
            </SectionPage>
        )
    }
}

export default Section2
