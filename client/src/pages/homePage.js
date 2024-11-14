import React from 'react'
import Header from '../component/include/header'
import Navbar from '../component/include/navbar'
import TopMenu from '../component/include/topMenu'
import Intro from '../component/home/intro'
import Footer from '../component/include/footer'
import NewProduct from '../component/home/new_product'
import FashionProduct from '../component/home/fashion_product'
import ChildProduct from '../component/home/child_product'
import CasualProduct from '../component/home/casual_product'

export default function HomePage() {
    return (
        <>
            <Header />
            <Navbar />
            <TopMenu />
            <Intro />
            <NewProduct />
            <FashionProduct />
            <ChildProduct />
            <CasualProduct />
            <Footer />
        </>
    )
}