import React from 'react'
import Header from '../component/include/header'
import Navbar from '../component/include/navbar'
import Footer from '../component/include/footer'
import ProductDetail from '../component/product-detail/productDetail'

export default function ProductDetailPage() {

    return (
        <>
            <Header />
            <Navbar />
            <ProductDetail />
            <Footer />
        </>
    )
}