import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import FilterAndSort from '../Components/FilterAndSort';
import ProductCard from '../Components/ProductCard';
import { getProducts } from '../Redux/app/app.action';
import { useAppDispatch, useAppSelector } from '../Redux/store';


const Homepage = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((store) => store.AppReducer.data)
    const [searchParams] = useSearchParams()
    const location = useLocation()

    // const customFilter = (item, index) => {  
    //         //searchParams.getAll('filter).includes(item.category) 
    // }

    useEffect(() => {
        if(products.length === 0 || location){  
            const getProductsParam = {
                params: {
                    category: searchParams.getAll('filter')
                    // _sort: "price",
                    // _order: 
                }
            }
            dispatch(getProducts(getProductsParam))
        }
    },[location.search])
 
  return (
    <div>
        <Flex>
        <Box minW='300px'>
            <FilterAndSort />
        </Box>
        
        <Flex flexWrap={'wrap'} justifyContent={'center'}>
        {products.length > 0 && products.map(item => {
            return <ProductCard key={item.id} {...item} />
        })}
        </Flex>
        </Flex>
    </div>
  )
}

export default Homepage