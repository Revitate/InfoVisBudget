import React, { Component, createRef } from 'react'
import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import { SectionContainer } from './SectionPage'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    z-index: 1;
    position: fixed;
    height: 4em;
    width: 100vw;
    background-color: white;
`

const TrackBar = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
    position: fixed;
    margin-left: 3em;
    padding: 0;
    height: 100vh;
    width: 3em;
    justify-content: center;
    align-items: center;
`

const Icons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 1em;
    text-align: center;
    width: 1.5em;
    height: 1.5em;
`

const Icon = styled.i`
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    opacity: ${props => (props.fade ? 0 : 1)};
`

const SlideButton = styled.div`
    position: absolute;
    width: 50vw;
    height: 3em;
    border-radius: 0.5em 0.5em 0 0;
    background-color: ${props => (props.right ? '#FF5252' : '#9FE7FF')};
    z-index: -1;
    transition: 0.5s;
    ${props => props.right && `transform: translateX(100%);`}
`

const LineButton = styled.div`
    width: 100vw;
    height: 1em;
    background-color: ${props => (props.right ? '#FF5252' : '#9FE7FF')};
    transition: 0.5s;
`
const LineButtom = styled(LineButton)`
    position: fixed;
    left: 0;
    bottom: 0;
`

const ButtonStyled = styled.div`
    width: 50vw;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
            if (
                element.scrollTop <
                section.offsetTop + section.clientHeight / 2
            ) {
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
        const right = this.state.page === 'yingluck'
        const bgc = right ? '#FF5252' : '#9FE7FF'
        return (
            <>
                <HeaderContainer>
                    <Row>
                        <SlideButton right={right} />
                        <ButtonStyled onClick={this.handleClickTab('abhisit')}>
                            abhisit
                        </ButtonStyled>
                        <ButtonStyled onClick={this.handleClickTab('yingluck')}>
                            yingluck
                        </ButtonStyled>
                    </Row>
                    <LineButton right={right} />
                    <LineButtom right={right} />
                </HeaderContainer>
                <TrackBar>
                    <Icons
                        className="text-primary"
                        onClick={this.scrollTo(this.sections[0])}
                    >
                        <Icon
                            className="fas fa-circle"
                            fade={this.state.currentSection !== 0}
                        />
                        <Icon
                            className="far fa-circle"
                            fade={this.state.currentSection === 0}
                        />
                    </Icons>
                    <Icons
                        className="text-primary"
                        onClick={this.scrollTo(this.sections[1])}
                    >
                        <Icon
                            className="fas fa-circle"
                            fade={this.state.currentSection !== 1}
                        />
                        <Icon
                            className="far fa-circle"
                            fade={this.state.currentSection === 1}
                        />
                    </Icons>
                    <Icons
                        className="text-primary"
                        onClick={this.scrollTo(this.sections[2])}
                    >
                        <Icon
                            className="fas fa-circle"
                            fade={this.state.currentSection !== 2}
                        />
                        <Icon
                            className="far fa-circle"
                            fade={this.state.currentSection === 2}
                        />
                    </Icons>
                </TrackBar>
                <SectionContainer
                    ref={this.container}
                    onScroll={this.handleScroll}
                >
                    <Section1
                        government={this.state.page}
                        forwardedRef={this.sections[0]}
                        nextPage={this.scrollTo(this.sections[1])}
                        bgc={bgc}
                    />
                    <Section2
                        forwardedRef={this.sections[1]}
                        bgc={bgc}
                        government={this.state.page}
                    />
                    <Section3 forwardedRef={this.sections[2]} bgc={bgc} />
                </SectionContainer>
            </>
        )
    }
}

export default App
