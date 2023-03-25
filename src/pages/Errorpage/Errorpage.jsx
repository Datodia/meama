import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Errorpage = () => {
    return (
        <Container>
            <TiTle>ოპაა...</TiTle>
            <Desc>გვერდი ვერ მოიძებნა</Desc>
            <Button >
                <SLink to={'/'}>მთავარ გვერდზე დაბრუნება</SLink>
            </Button>
        </Container>
    )
}


const Container = styled.div`
    width: 330px;
    height: 100vh;
    margin: auto;
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const TiTle = styled.h1`
    font-size: 30px;
    
`
const Desc = styled.h2`
    font-size: 14px;
    margin: 10px 0 30px 0;
`
const Button = styled.div`
    width: 211px;
    height: 50px;
    background-color: var(--black);
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SLink = styled(Link)`
    text-decoration: none;
    font-size: 14px;
    color: var(--white);
`