import React from 'react'
import { Header } from '../../components/Header'
import styled from 'styled-components'

export const Homepage = () => {
    return (
        <Container>
            <Header />
        </Container>
    )
}


const Container = styled.div`
    background-image: url("assets/meamaBG.svg");
    background-color: var(--black);
    
`