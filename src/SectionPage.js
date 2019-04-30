import styled from 'styled-components'

export const SectionPage = styled.section`
    height: 100vh;
    width: 100vw;
    scroll-snap-align: start;
    ${props => `
        background-color: ${props.color};
    `}
`

export const SectionContainer = styled.div`
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    height: 100vh;
`
