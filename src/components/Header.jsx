import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export const Header = () => {

    const [show, setShow] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('ka');
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
        <Container>
            <SHeader>
                <LogoDiv>
                    <Img src='assets/logo.svg' />
                </LogoDiv>
                <LangDiv onClick={showLanguage}>
                    <Img src='assets/language.svg' />
                    <LngTxt>{selectedLanguage}</LngTxt>
                    <Img src='assets/down.svg' />
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

                    {/* {lngData.map(lang => (
                        <div key={lang.id}>
                            <img src={lang.image} alt={lang.name} onClick={() => handleLanguageClick(lang.id)} />
                            <input type="checkbox" checked={lang.main} onChange={() => { }} />
                        </div>
                    ))} */}
                </LanguageModal>
            }
        </Container>
    )
}

const Container = styled.div`
    
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
`
const LngTxt = styled.h2`
    color: var(--white);
    font-size: 14px;
`

const LanguageModal = styled.div`
    width: 100%;
    height: 300px;
    padding: 38px 30px 50px 30px;
    background-color: red;
    position: absolute;
    transform: translateY(40%);
    border-radius: 30px 30px 0 0;
`
const ModalTxt = styled.h2`
    font-size: 24px;
`
const ModalRow = styled.div`
    display: flex;
    align-items: center;
`

const Check = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid black;
`