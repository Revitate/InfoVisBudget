import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import styled from 'styled-components'
import { SectionPage } from './SectionPage'
import MapThailand from './MapThailand'
import thai_city from './thai_city.json'

const options = Object.keys(thai_city)
    .sort((a, b) => (thai_city[a] < thai_city[b] ? -1 : 1))
    .map(key => ({
        label: thai_city[key],
        value: key
    }))

const Container = styled.div`
    padding: 3em;
    display: flex;
    width: 100vw;
    flex-wrap: wrap;
    justify-content: space-evenly;
    transition: 0.5s;
    opacity: ${props => (props.out ? 0 : 1)};
`
const ConsoleBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const SectionPageStyled = styled(SectionPage)`
    width: 200vw;
    overflow-y: hidden;
    transform: translateX(
        ${props => {
            switch (props.page) {
                case 1:
                    return '0vw'
                case 2:
                    return '-100vw'
                default:
                    return '0vw'
            }
        }}
    );
`

class Section1 extends Component {
    state = {
        page: 1,
        selectedOption: []
    }

    handleChange = selectedOption => {
        if (selectedOption.length <= 3) {
            this.setState({ selectedOption })
        }
    }

    render() {
        return (
            <SectionPageStyled
                ref={this.props.forwardedRef}
                page={this.state.page}
                color={this.props.bgc}
            >
                <Container out={this.state.page !== 1}>
                    <MapThailand
                        government = {this.props.government}
                        width={500}
                        height={700}
                        highlight={this.state.selectedOption.map(
                            prov => prov.value
                        )}
                    />
                    <ConsoleBox>
                        <h1>Question: dsfsdfsd?</h1>
                        <Select
                            value={this.state.selectedOption}
                            isMulti
                            onChange={this.handleChange}
                            options={options}
                            placeholder="เลือกจังหวัด..."
                        />
                        {this.state.selectedOption.length != 0?
                            <Button
                                onClick={() => {
                                    this.setState({ page: 2 })
                                }}
                            >
                                ส่ง
                            </Button>
                            :
                            <Button
                                variant="secondary"
                                disabled
                            >
                                ส่ง
                            </Button>
                        }
                        <Button
                            variant="light"
                            onClick={() => {
                                this.props.nextPage()
                            }}
                        >
                            ข้าม
                        </Button>
                    </ConsoleBox>
                </Container>
                <Container out={this.state.page !== 2}>
                    <ConsoleBox>
                        <h1>Question: dsfsdfsd?</h1>
                        <Button
                            onClick={() => {
                                this.setState({ page: 1 })
                            }}
                        >
                            back
                        </Button>
                    </ConsoleBox>
                </Container>
            </SectionPageStyled>
        )
    }
}

export default Section1
