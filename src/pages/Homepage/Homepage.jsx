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

    // console.log(data)
    const [activeSubcategoryIndexes, setActiveSubcategoryIndexes] = useState([])


    return (
        <Container>
            <Header />
            {data?.map((item, index) => {
                const activeSubcategoryIndex = activeSubcategoryIndexes[index] ?? 0;
                const subCategories = item.subCategories || [];
                return (
                    <ProdDiv key={item.id}>
                        <Title>{item.name}</Title>
                        {item.products.length === 0 ? (
                            <>
                                <div>
                                    {subCategories.map((subCategory, subIndex) => (
                                        <button
                                            key={subCategory.id}
                                            onClick={() => {
                                                const newIndexes = [...activeSubcategoryIndexes];
                                                newIndexes[index] = subIndex;
                                                setActiveSubcategoryIndexes(newIndexes);
                                            }}
                                            className={subIndex === activeSubcategoryIndex ? "active" : ""}
                                        >
                                            {subCategory.name}
                                        </button>
                                    ))}
                                </div>
                                <StyledSwiper
                                    spaceBetween={30}
                                    slidesPerView={2.2}
                                    autoplay={{ delay: 3000 }}
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
                            </>
                        ) : (
                            <StyledSwiper spaceBetween={30} slidesPerView={2.2} autoplay={{ delay: 3000 }}>
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
            <Footer />
        </Container>
    );
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

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    border: 1px solid black;
    border-radius: 8px;
    height: auto;
    padding: 0 0 15px 0;
    text-decoration: none;
    color: var(--black);
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