import React, { Component } from 'react'
import styled from 'styled-components'
import { SectionPage } from './SectionPage'

import tu_img from './assets/tu_1.png'

const Container = styled.div`
    margin: 0em 1em 0em 1em;
    padding: 4em 3em 1em 3em;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: calc(100vw - (2em));
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    background-color: white;
    position: relative;
`
const Backtext = styled.p`
    text-align: center;
    font-size: 8vw;
    font-weight: bold;
`
const Stand = styled.img`
`
const RowContainer = styled.div`
    margin: 0em 1em 0em 1em;
    padding: 4em 3em 1em 3em;
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: calc(100vw - (2em));
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    background-color: white;
    position: relative;
`
class Section3 extends Component {
    render() {
        return (
            <SectionPage ref={this.props.forwardedRef} color={this.props.bgc}>
                <Container>
                    <RowContainer>
                        <img src={tu_img} alt="tu" height="95%" />
                        <Backtext>แล้วเจอกันใหม่</Backtext>
                    </RowContainer>
                </Container>
            </SectionPage>
        )
    }
}

export default Section3
