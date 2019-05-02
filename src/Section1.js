import React, { Component } from 'react'
import { Button, Row } from 'react-bootstrap'
import Select from 'react-select'
import styled from 'styled-components'
import { SectionPage } from './SectionPage'
import MapThailand from './MapThailand'
import thai_city from './thai_city.json'
import abhisit_img from './assets/abhisit_1.png'
import yingluck_img from './assets/yingrak_1.png'

const max_govern = {
    abhisit: ['กรุงเทพมหานคร', 10631.4228108429],
    yingluck: ['เชียงใหม่', 10413.344217786766]
}

const options = Object.keys(thai_city)
    .sort((a, b) => (thai_city[a] < thai_city[b] ? -1 : 1))
    .map(key => ({
        label: thai_city[key],
        value: key
    }))

const StyledButton = styled(Button)`
    margin: 0.5em;
    width: 4em;
`

const StyledSelect = styled(Select)`
    width: 24em;
`

const Container = styled.div`
    margin: 0em 1em 0em 1em;
    padding: 2em 3em 1em 3em;
    width: calc(100vw - (2em));
    height: 100vh;
    background-color: white;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    transition: 0.5s;
    opacity: ${props => (props.out ? 0 : 1)};
`
const ConsoleBox = styled.div`
    display: flex;
    width: 40vw;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StyledRow = styled(Row)``

const SectionPageStyled = styled(SectionPage)`
    width: 200vw;
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

const TextLeft = styled.h1`
    align-self: flex-start;
    text-align: left;
`

const TextCenter = styled.div`
    text-align: center;
`

const StyledImg = styled.img`
    margin-top: auto;
    margin-bottom: auto;
`

class Section1 extends Component {
    state = {
        page: 1,
        selectedOption: null
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
    }

    render() {
        return (
            <div
                style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
            >
                <SectionPageStyled
                    ref={this.props.forwardedRef}
                    page={this.state.page}
                    color={this.props.bgc}
                >
                    <Container out={this.state.page !== 1}>
                        <MapThailand
                            government={this.props.government}
                            width={500}
                            height={700}
                            highlight={this.state.selectedOption}
                        />
                        <ConsoleBox>
                            <TextLeft>จากแผนที่แสดงฐานเสียงของรัฐบาล</TextLeft>
                            <TextLeft>
                                ในรัฐบาล{' '}
                                {this.props.government === 'abhisit' ? (
                                    <b>อภิสิทธิ์</b>
                                ) : (
                                    <b>ยิ่งลักษณ์</b>
                                )}{' '}
                                <br />
                                คุณคิดว่าจังหวัดฐานเสียงใดที่
                                <br />
                                ได้ <b>งบประมาณต่อประชากร</b> มากที่สุด
                            </TextLeft>
                            <StyledSelect
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                placeholder="เลือกจังหวัด..."
                            />
                            <StyledRow>
                                <StyledButton
                                    variant="light"
                                    onClick={() => {
                                        this.props.nextPage()
                                    }}
                                >
                                    ข้าม
                                </StyledButton>
                                <StyledButton
                                    {...this.state.selectedOption === null && {
                                        variant: 'secondary',
                                        disabled: true
                                    }}
                                    onClick={() => {
                                        this.setState({ page: 2 })
                                    }}
                                >
                                    ส่ง
                                </StyledButton>
                            </StyledRow>
                        </ConsoleBox>
                    </Container>
                    <Container out={this.state.page !== 2}>
                        <StyledImg
                            src={
                                this.props.government === 'abhisit'
                                    ? abhisit_img
                                    : yingluck_img
                            }
                            height="60%"
                            alt="props"
                        />
                        <ConsoleBox>
                            <TextCenter>
                                {this.props.government === 'abhisit' ? (
                                    <h1>
                                        <i className="fas fa-paw" />
                                        ...เมี๊ยว...
                                        <i className="fas fa-cat" />
                                    </h1>
                                ) : (
                                    <h1>
                                        Thank you three times{' '}
                                        <i className="fas fa-comment" />
                                    </h1>
                                )}
                                <h3>
                                    {this.props.government === 'abhisit'
                                        ? this.state.selectedOption &&
                                          this.state.selectedOption.label ===
                                              max_govern[
                                                  this.props.government
                                              ][0]
                                            ? 'เก่งมาก'
                                            : 'ผมไม่เคยพูดว่าเราเอาลงจังหวัดนั้นมากสุดนะ'
                                        : this.state.selectedOption &&
                                          this.state.selectedOption.label ===
                                              max_govern[
                                                  this.props.government
                                              ][0]
                                        ? 'คุณถูกแล้ว'
                                        : 'แย่จัง ลองเดาใหม่ดูนะคะ'}
                                </h3>
                            </TextCenter>
                            <Button
                                onClick={() => {
                                    this.setState({ page: 1 })
                                }}
                            >
                                ย้อนกลับ
                            </Button>
                        </ConsoleBox>
                    </Container>
                </SectionPageStyled>
            </div>
        )
    }
}

export default Section1
