import React, { Component } from 'react'
import styled from 'styled-components'
import { SectionPage } from './SectionPage'

import tu_img from './assets/tu_1.png'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

class Section3 extends Component {
    render() {
        return (
            <SectionPage ref={this.props.forwardedRef}>
                <Container>
                    <img src={tu_img} alt="tu" height="100%" />
                </Container>
            </SectionPage>
        )
    }
}

export default Section3
