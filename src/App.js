import React, { Component, createRef } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import { SectionContainer, SectionPage } from './SectionPage'
import MapThailand from './MapThailand'

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    height: 3em;
    width: 100vw;
    background-color: white;
`

const TrackBar = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    padding: 0;
    height: 100vh;
    width: 3em;
    justify-content: center;
`

class App extends Component {
    state = {
        // abhisit or yingluck
        page: 'abhisit',
        currentSection: 0
    }

    constructor(props) {
        super(props)
        this.container = createRef()
        this.sectionNum = 3
        this.sections = []
        for (let i = 0; i < this.sectionNum; i++) {
            this.sections.push(createRef())
        }
    }

    scrollTo = ref => {
        return () => {
            this.container.current.scrollTo({
                top: ref.current.offsetTop,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    handleScroll = e => {
        let element = e.target
        for (let i = 0; i < this.sectionNum; i++) {
            const section = this.sections[i].current
            if (element.scrollTop < section.offsetTop + section.clientHeight) {
                this.setState({ currentSection: i })
                return
            }
        }
    }

    handleClickTab = page => {
        return () => {
            this.setState({ page })
        }
    }

    render() {
        return (
            <>
                <HeaderContainer>
                    <Button onClick={this.handleClickTab('abhisit')}>
                        abhisit
                    </Button>
                    <Button onClick={this.handleClickTab('yingluck')}>
                        yingluck
                    </Button>
                </HeaderContainer>
                <TrackBar>
                    <Button onClick={this.scrollTo(this.sections[0])}>
                        section1
                    </Button>
                    <Button onClick={this.scrollTo(this.sections[1])}>
                        section2
                    </Button>
                    <Button onClick={this.scrollTo(this.sections[2])}>
                        section3
                    </Button>
                </TrackBar>
                <SectionContainer
                    ref={this.container}
                    onScroll={this.handleScroll}
                >
                    <SectionPage ref={this.sections[0]} color="red">
                        <MapThailand width={300} height={500} />
                    </SectionPage>
                    <SectionPage ref={this.sections[1]} color="green">
                        abhisit
                    </SectionPage>
                    <SectionPage ref={this.sections[2]} color="blue">
                        abhisit
                    </SectionPage>
                </SectionContainer>
            </>
        )
    }
}

export default App
