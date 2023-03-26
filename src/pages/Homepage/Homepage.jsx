import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import styled from 'styled-components'
import { LangContext } from '../../context/LangProvider'
import axios from 'axios'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Autoplay])

export const Homepage = () => {
    const { selectedLanguage, setSelectedLanguage } = useContext(LangContext)
    const [data, setData] = useState()

    useEffect(() => {
        axios
            .get(`https://cms.meamacollect.ge/meama-collect/api/client/${selectedLanguage}`)
            .then((res) => setData(res.data))
        console.log(data)
    }, [selectedLanguage])

    return (
        <Container>
            <Header />
            {data?.map((item) => (
                <ProdDiv key={item.id}>
                    <Title>{item.name}</Title>
                    <StyledSwiper
                        spaceBetween={30}
                        slidesPerView={2.2}
                        autoplay={{ delay: 3000 }}
                    >
                        {item.products.map((product) => (
                            <StyledSwiperSlide key={product.id}>
                                <Card style={{ backgroundColor: `${product.bgColor}` }}>
                                    <Img src={product.mainPhoto} alt="" />
                                    <Name>{product.name}</Name>
                                    <Price>{product.price} ₾</Price>
                                </Card>

                            </StyledSwiperSlide>
                        ))}
                    </StyledSwiper>
                </ProdDiv>
            ))}
        </Container>
    )
}

const Container = styled.div`

`
const ProdDiv = styled.div`
    padding: 0 0 0 25px;
`
const Title = styled.h1`
    margin-top: 30px;
`
const StyledSwiper = styled(Swiper)`
  padding-top: 50px; 
  margin-bottom: 50px;
`;
const StyledSwiperSlide = styled(SwiperSlide)`
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    border: 1px solid black;
    border-radius: 8px;
    height: auto;
    padding: 0 0 15px 0;
`

const Img = styled.img`
    width: 100px;
    /* position: absolute; */
    position: relative;
    top: -40px;
`
const Price = styled.h3`
    font-size: 16px;
    font-weight: 500;
`
const Name = styled.h2`
    font-size: 15px;
    text-align: center;
`