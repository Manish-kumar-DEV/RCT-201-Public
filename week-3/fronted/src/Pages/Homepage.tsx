import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import ProductCard from '../Components/ProductCard';
import { getProducts } from '../Redux/app/app.action';
import { useAppDispatch, useAppSelector } from '../Redux/store';


const Homepage = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((store) => store.AppReducer.data)

    useEffect(() => {
        if(products.length === 0){  
            dispatch(getProducts())
        }
    },[])
 
  return (
    <div>
        <Flex flexWrap={'wrap'} justifyContent={'center'}>
        {products.length > 0 && products.map(item => {
            return <ProductCard key={item.id} {...item} />
        })}

        </Flex>
    </div>
  )
}

export default Homepage