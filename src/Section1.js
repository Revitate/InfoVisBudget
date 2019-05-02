import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import styled from 'styled-components'
import { SectionPage } from './SectionPage'
import MapThailand from './MapThailand'
import thai_city from './thai_city.json'
import average from './average.json'
import abhisit_img from './assets/abhisit_1.png'
import yingluck_img from './assets/yingrak_1.png'

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
    width:40vw;
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

const TextCenter = styled.div`
    text-align: center;
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
        console.log(this.state.selectedOption)
        return (
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
                        <h1>Question: ถ้าคุณเป็นรัฐบาล
                            คุณคิดว่าจังหวัดใดที่มีงบประมาณมากที่สุด</h1>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            placeholder="เลือกจังหวัด..."
                        />
                        <Button
                            {...(this.state.selectedOption === null && {
                                variant: "secondary",
                                disabled: true
                            })}
                            onClick={() => {
                                this.setState({ page: 2 })
                            }}
                        >
                            ส่ง
                            </Button>

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
                    <img src={this.props.government == 'abhisit'?abhisit_img:yingluck_img}></img>
                    <ConsoleBox>
                        <TextCenter>
                            {this.props.government == 'abhisit'?
                                <h1><i class="fas fa-paw"/>...เมี๊ยว...<i className="fas fa-cat" /></h1>
                                :
                                <h1>Thank you three times<i class="fas fa-comment"/></h1>
                            }
                            <h3>
                                {
                                    this.props.government == 'abhisit'?
                                    this.state.selectedOption && this.state.selectedOption.label === average['max_govern'][this.props.government][0]?
                                    "เก่งมาก":"ผมไม่เคยพูดว่าเราเอาลงจังหวัดนั้นมากสุดนะ"
                                    :
                                    this.state.selectedOption && this.state.selectedOption.label === average['max_govern'][this.props.government][0]?
                                    "คุณถูกแล้ว":"แย่จัง ลองเดาใหม่ดูนะคะ"
                                }
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
        )
    }
}

export default Section1
