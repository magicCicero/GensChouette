import React, { useEffect } from 'react'
import Header from '../component/include/header'
import Navbar from '../component/include/navbar'
import TopMenu from '../component/include/topMenu'
import Footer from '../component/include/footer'
import Products from '../component/product/products'
import Filter from '../component/product/filter'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Cookies from 'js-cookie';

export default function ProductPage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchParams.get('page')) {
            const newURL = new URLSearchParams();
            newURL.set('page', 'product');
            navigate(`/product?${newURL.toString()}`, { replace: true });
        }

        if(!Cookies.get('cart')) {
            Cookies.set('cart', '[]')
        }
    }, [])

    return (
        <>
            <Header />
            <Navbar />
            <TopMenu />
            <Filter />
            <Products />
            <Footer />
        </>
    )
}