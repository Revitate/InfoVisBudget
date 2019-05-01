import React, { Component, createRef } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import { SectionContainer } from './SectionPage'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    z-index: 1;
    position: fixed;
    height: 3em;
    width: 100vw;
`

const TrackBar = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
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
        console.log(element.scrollTop)
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
                    <Section1
                        forwardedRef={this.sections[0]}
                        nextPage={this.scrollTo(this.sections[1])}
                    />
                    <Section2 forwardedRef={this.sections[1]} />
                    <Section3 forwardedRef={this.sections[2]} />
                </SectionContainer>
            </>
        )
    }
}

export default App
