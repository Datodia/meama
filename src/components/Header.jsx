import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { DataContext } from '../context/DataProvider'
import { Link } from 'react-router-dom'

export const Header = ({ id }) => {

    const [show, setShow] = useState(false)
    const { selectedLanguage, setSelectedLanguage } = useContext(DataContext);
    const [lngData, setLngData] = useState()

    useEffect(() => {
        axios.get('https://cms.meamacollect.ge/meama-collect/api/client/languages')
            .then(res => {
                setLngData(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleLanguageClick = (id) => {
        setShow(false)
        const updatedLanguages = lngData.map(lang => {
            if (lang.id === id) {
                return { ...lang, main: true };
            } else if (lang.main) {
                return { ...lang, main: false };
            } else {
                return lang;
            }
        });
        const selectedLang = updatedLanguages.find(lang => lang.id === id);
        setSelectedLanguage(selectedLang.code);
        setLngData(updatedLanguages);
    };

    const showLanguage = () => {
        setShow(show => !show)
    }

    return (
        <Container id={id}>
            <Overlay id={id} />
            <SHeader>
                {id ? <Back to={"/"}><Img src='/assets/back.svg' /></Back> : <LogoDiv>
                    <LogoImg src='/assets/logo.svg' />
                </LogoDiv>}
                <LangDiv onClick={showLanguage}>
                    <Img src='/assets/language.svg' />
                    <LngTxt id={id}>{selectedLanguage}</LngTxt>
                    <Img src='/assets/down.svg' />
                </LangDiv>
            </SHeader>
            {show &&
                <LanguageModal>
                    <ModalTxt>ენა</ModalTxt>
                    {lngData.map(item => (
                        <ModalRow key={item.id} onClick={() => handleLanguageClick(item.id)} >
                            <ModalImg src={item.imageUrl} />
                            <ModalLngTxt>{item.name}</ModalLngTxt>
                            <Check style={{ backgroundColor: item.main && 'black' }}></Check>
                        </ModalRow>
                    ))}
                </LanguageModal>
            }

        </Container>
    )
}

const Container = styled.div`
    background-image: ${props => props.id ? 'none' : 'url("assets/meamaBG.svg")'};
    background-color: ${props => props.id ? 'var(--white)' : 'var(--black)'};
    height: ${props => props.id ? "auto" : '400px'};
    position: relative;
`
const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--black);
    opacity: .8;
    z-index: 0;
    display: ${props => props.id && 'none'};
`
const SHeader = styled.header`
    padding: 26px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    z-index: 8;
    @media screen and (min-width: 600px){
        padding: 50px;
    }
`

const LogoDiv = styled.div`
    cursor: pointer;
`
const LogoImg = styled.img`
    @media screen and (min-width: 600px){
        width: 100px;
    }
`
const Img = styled.img`
    @media screen and (min-width: 600px){
        width: 20px;
    }
`
const LangDiv = styled.div`
    display: flex;
    gap: 5px;
    cursor: pointer;
`
const LngTxt = styled.h2`
    color: ${props => props.id ? 'var(--black)' : 'var(--white)'};
    font-size: 14px;
    @media screen and (min-width: 600px){
       font-size: 20px;
    }
`

const LanguageModal = styled.div`
    width: 100%;
    height: 300px;
    padding: 38px 30px 50px 30px;
    background-color: var(--white);
    position: absolute;
    z-index: 9999;
    transform: translateY(40%);
    border-radius: 30px 30px 0 0;
    filter: drop-shadow(0px 2px 8px rgba(0,0,0,0.16 ));

    @media screen and (min-width: 600px){
        width: 80%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -10%)
    }
`
const ModalTxt = styled.h2`
    font-size: 24px;
    @media screen and (min-width: 600px){
        font-size: 28px;
    }
`
const ModalImg = styled.img`
    @media screen and (min-width: 600px){
        width: 40px;
    }
`
const ModalLngTxt = styled.h2`
    font-size: 14px;
    @media screen and (min-width: 600px){
        font-size: 22px;
    }
`
const ModalRow = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 10px 0;
    justify-content: space-between;
    @media screen and (min-width: 600px){
        margin: 30px 0;
    }
`

const Check = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid black;
    @media screen and (min-width: 600px){
        width: 20px;
        height: 20px;
    }
`

const Back = styled(Link)`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--gray);
    border-radius: 50%;
    @media screen and (min-width: 600px){
        width: 50px;
        height: 50px;
    }
`
