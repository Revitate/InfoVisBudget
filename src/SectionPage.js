import styled from 'styled-components'

export const SectionPage = styled.section`
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100vw;
    scroll-snap-align: center;
    background-color: ${props => props.color};
`

export const SectionContainer = styled.div`
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    height: 100vh;
`
