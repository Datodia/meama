import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Footer = () => {

    const [data, setData] = useState('')

    useEffect(() => {
        axios.get('https://cms.meamacollect.ge/meama-collect/api/client/ka/contact-info')
            .then(res => setData(res.data))
    }, [])

    return (
        <Container>
            <Contact>{data.name}</Contact>
            <Sdiv>
                <NumDiv>
                    <Num>{data.value}</Num>
                </NumDiv>
                <Soc>
                    {data.socialLinks?.map((el, index) => (
                        <Link key={index} to={el.link} target="_blank">
                            <Img src={el.imageUrl} alt="" />
                        </Link>
                    ))}
                </Soc>
            </Sdiv>
        </Container>
    )
}

const Container = styled.footer`
    border-top: 1px solid var(--gray);
    padding: 25px;

    @media screen and (min-width: 600px){
        padding: 50px;
    }
`
const Contact = styled.p`
    font-size: 14px;
    font-weight: 400;
    color: var(--gray);
    @media screen and (min-width: 600px){
        font-size: 20px;
    }
`
const Sdiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const NumDiv = styled.div`
    
`
const Num = styled.h1`
    font-size: 20px;
    @media screen and (min-width: 600px){
        font-size: 25px;
    }
`
const Soc = styled.div`
    display: flex;
    gap: 10px;
    @media screen and (min-width: 600px){
        gap: 20px;
    }
`
const Img = styled.img`
    @media screen and (min-width: 600px){
        width: 30px;
        height: 30px;
    }
`