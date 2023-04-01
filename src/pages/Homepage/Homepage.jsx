import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import styled from 'styled-components'
import axios from 'axios'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'
import { DataContext } from '../../context/DataProvider'

SwiperCore.use([Navigation, Pagination, Autoplay])

export const Homepage = () => {
    const { data } = useContext(DataContext)

    const [activeSubcategoryIndexes, setActiveSubcategoryIndexes] = useState([])
    return (
        <Container>
            <Header />
            <Products>

                {data?.map((item, index) => {
                    const activeSubcategoryIndex = activeSubcategoryIndexes[index] ?? 0;
                    const subCategories = item.subCategories || [];
                    return (
                        <ProdDiv key={item.id}>
                            <Title style={{ color: index === 0 ? 'var(--white)' : 'var(--black)' }}>{item.name}</Title>
                            {item.products.length === 0 ? (
                                <Wrapper>
                                    <BtnDiv>
                                        {subCategories.map((subCategory, subIndex) => (
                                            <SButton
                                                key={subCategory.id}
                                                onClick={() => {
                                                    const newIndexes = [...activeSubcategoryIndexes];
                                                    newIndexes[index] = subIndex;
                                                    setActiveSubcategoryIndexes(newIndexes);
                                                }}
                                            >
                                                {subCategory.name}
                                            </SButton>
                                        ))}
                                    </BtnDiv>
                                    <StyledSwiper
                                        spaceBetween={30}
                                        slidesPerView={2.2}
                                        autoplay={{ delay: 3000 }}
                                        breakpoints={{
                                            600: {
                                                slidesPerView: 2.8,
                                                spaceBetween: 50
                                            }
                                        }}
                                    >
                                        {subCategories[activeSubcategoryIndex]?.products?.map((product) => (
                                            <StyledSwiperSlide key={product.id}>
                                                <Card
                                                    to={`/products/${item.id}/${product.id}`}
                                                    style={{ backgroundColor: `${product.bgColor}` }}
                                                >
                                                    <Img src={product.mainPhoto} alt="" />
                                                    <Name>{product.name}</Name>
                                                    <Price>{product.price} ₾</Price>
                                                </Card>
                                            </StyledSwiperSlide>
                                        )
                                        )}
                                    </StyledSwiper>
                                </Wrapper>
                            ) : (
                                <StyledSwiper
                                    spaceBetween={30}
                                    slidesPerView={2.2}
                                    autoplay={{ delay: 3000 }}
                                    breakpoints={{
                                        600: {
                                            slidesPerView: 2.8,
                                            spaceBetween: 50
                                        }
                                    }}
                                >
                                    {item.products.map((product) => (
                                        <StyledSwiperSlide key={product.id}>
                                            <Card
                                                to={`/products/${item.id}/${product.id}`}
                                                style={{ backgroundColor: `${product.bgColor}` }}
                                            >
                                                <Img src={product.mainPhoto} alt="" />
                                                <Name>{product.name}</Name>
                                                <Price>{product.price} ₾</Price>
                                            </Card>
                                        </StyledSwiperSlide>
                                    ))}
                                </StyledSwiper>
                            )}
                        </ProdDiv>
                    );
                })}
            </Products>
            <Footer />
        </Container>
    );
}

const Container = styled.div`
`
const Wrapper = styled.div`
    
`
const Products = styled.div`
    transform: translateY(-260px);
    
`
const ProdDiv = styled.div`
    padding: 0 0 0 25px;
    @media screen and (min-width: 600px){
        padding: 0 0 0 50px;
    }

`
const Title = styled.h1`
    margin-top: 30px;
    font-size: 32px;
    @media screen and (min-width: 600px){
        margin: 50px 20px;;
    }
`
const StyledSwiper = styled(Swiper)`
  padding-top: 50px; 
  margin-bottom: 50px;

  @media screen and (min-width: 600px){
    width: 100%;
  }
`;
const StyledSwiperSlide = styled(SwiperSlide)`
`

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    border-radius: 8px;
    height: auto;
    padding: 0 0 15px 0;
    text-decoration: none;
    color: var(--black);
    min-height: 180px;
    height: auto;
`

const Img = styled.img`
    width: 100px;
    position: relative;
    top: -40px;

    @media screen and (min-width: 600px){
        width: 24%;
    }
`
const Price = styled.h3`
    font-size: 16px;
    font-weight: 500;
    @media screen and (min-width: 600px){
        font-size: 22px;
    }
`
const Name = styled.h2`
    font-size: 15px;
    text-align: center;
    @media screen and (min-width: 600px){
        font-size: 22px;
    }
`

const BtnDiv = styled.div`
    display: flex;
    gap: 10px;
    
`

const SButton = styled.button`
    height: 32px;
    border-radius: 16px;
    background-color: black;
    color: white;
    padding: 0 8px;

    @media screen and (min-width: 600px){
       padding: 0 15px;
       height: 40px;
       font-size: 18px;
       margin: 10px 0 50px 0;
    }
`