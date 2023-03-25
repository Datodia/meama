import React from 'react'
import { useParams } from 'react-router-dom'

export const Products = () => {
    const { id } = useParams()

    console.log(id)
    return (
        <div>{id}</div>
    )
}
