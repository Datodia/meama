import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { LangContext } from '../context/LangProvider'
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
        setShow(true)
    }

    return (
        <Container id={id}>
            <SHeader>
                {id ? <Back to={"/"}><Img src='/assets/back.svg' /></Back> : <LogoDiv>
                    <Img src='/assets/logo.svg' />
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
                            <Img src={item.imageUrl} />
                            <h4>{item.name}</h4>
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
`
const SHeader = styled.header`
padding: 26px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between
`

const LogoDiv = styled.div`
    
`
const Img = styled.img`
    
`
const LangDiv = styled.div`
    display: flex;
    gap: 5px;
    cursor: pointer;
`
const LngTxt = styled.h2`
    color: ${props => props.id ? 'var(--black)' : 'var(--white)'};
    font-size: 14px;
`

const LanguageModal = styled.div`
    width: 100%;
    height: 300px;
    padding: 38px 30px 50px 30px;
    background-color: var(--white);
    border: 2px solid var(--gray);
    position: absolute;
    z-index: 9999;
    transform: translateY(40%);
    border-radius: 30px 30px 0 0;
`
const ModalTxt = styled.h2`
    font-size: 24px;
`
const ModalRow = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 10px 0;
    justify-content: space-between;
`

const Check = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid black;
`

const Back = styled(Link)`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--gray);
    border-radius: 50%;
`
