import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { DataContext } from '../../context/DataProvider';
import styled from 'styled-components';


export const Products = () => {
    const { id, Pid } = useParams();
    const { data, selectedLanguage } = useContext(DataContext);
    const [filteredArray, setFilteredArray] = useState({});
    const [photo, setPhoto] = useState('')


    useEffect(() => {
        if (data) {
            const filterOne = data?.filter((item) => item.id == id);
            const filterTwo = filterOne[0]?.products?.filter((el) => el.id == Pid);
            const filterThree = filterOne[0]?.subCategories[0]?.products?.filter(el => el.id == Pid)
            if (filterTwo && filterTwo.length > 0) {
                setFilteredArray(filterTwo[0]);
            }

            if (filterThree) {
                setFilteredArray(filterThree[0])
            }
        }
    }, [data, selectedLanguage, id]);

    const changePhoto = (el) => {
        setPhoto(el)
    }

    return (
        <Container>
            <Header id={id} />
            {filteredArray ? (
                <Sdiv>
                    <Wrapper>
                        <Info>
                            <Price>{filteredArray?.name}</Price>
                            <Price>{filteredArray?.price} ₾</Price>
                            <Vol>{filteredArray?.specifications?.[0]?.name}</Vol>
                            <VolNum>{filteredArray?.specifications?.[0]?.value}</VolNum>
                            <ImgArray>
                                {filteredArray?.imgUrls?.map(el => (
                                    <ImgItem key={el} onClick={() => changePhoto(el)} src={el} />
                                ))}
                            </ImgArray>
                        </Info>
                        <ImgDiv style={{ backgroundColor: `${filteredArray?.bgColor}` }}>
                            {photo ? <Img src={photo} /> : <Img src={filteredArray?.mainPhoto} />}
                        </ImgDiv>

                    </Wrapper>
                    <DescDiv>
                        <p>{filteredArray?.title}</p>
                    </DescDiv>
                </Sdiv>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

const Container = styled.div`
    
`
const Sdiv = styled.div`
     @media screen and (min-width: 600px){
        padding: 0 0 0 10%;
    }
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Info = styled.div`
    padding: 0 0 0 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    @media screen and (min-width: 600px){
        gap: 30px;
    }
   
`
const Price = styled.h2`
    font-size: 24px;
    @media screen and (min-width: 600px){
        font-size: 28px;
    }
`
const Vol = styled.p`
    font-weight: 400;
    font-size: 14px;
    color: var(--gray);
    @media screen and (min-width: 600px){
        font-size: 18px;
    }
`
const VolNum = styled.h2`
    font-size: 18px;

    @media screen and (min-width: 600px){
        font-size: 22px;
    }
`
const ImgArray = styled.div`
    display: flex;
    gap: 10px;
`
const ImgItem = styled.img`
    width: 30px;
    cursor: pointer;

    @media screen and (min-width: 600px){
        width: 50px;
    }
`
const Img = styled.img`
    width: 200px;
    position: relative;
    margin: -20px 0 -20px 0; 
`
const ImgDiv = styled.div`
    width: 60%;
    border-radius: 50% 0 0 50%;

    @media screen and (min-width: 600px){
        width: 30%;
        max-height: 400px
        height: auto;
        border-radius: 40% 0 0 40%;
    }
`
const DescDiv = styled.div`
    margin-top: 30px;
    padding: 0 0 0 25px;
`
