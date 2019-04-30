import React, { Component } from 'react'
import { TabContainer, TabContent, TabPane } from 'react-bootstrap'
import styled from 'styled-components'

import { SectionContainer, SectionPage } from './SectionPage'
import MapThailand from './MapThailand'

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    height: 2em;
    width: 100vw:
`

class App extends Component {
    state = {
        // abhisit or yingluck
        page: 'abhisit'
    }

    render() {
        return (
            <TabContainer defaultActiveKey="abhisit">
                <HeaderContainer />
                <TabContent>
                    <TabPane eventKey="abhisit" title="Home">
                        <SectionContainer>
                            <SectionPage color="red">
                                <MapThailand width={300} height={500} />
                            </SectionPage>
                            <SectionPage color="green"> abhisit</SectionPage>
                            <SectionPage color="blue"> abhisit</SectionPage>
                        </SectionContainer>
                    </TabPane>
                    <TabPane eventKey="yingluck" title="Profile">
                        <SectionContainer>
                            <SectionPage color="red">
                                <MapThailand width={300} height={500} />
                            </SectionPage>
                            <SectionPage color="green"> yingluck</SectionPage>
                            <SectionPage color="blue"> yingluck</SectionPage>
                        </SectionContainer>
                    </TabPane>
                </TabContent>
            </TabContainer>
        )
    }
}

export default App
