import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TopMenu() {

    const styles = {
        box: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            paddingTop: '10px',
            paddingBottom: '10px'
        },
        text: {
            fontSize: '12px',
            color: 'var(--primary)',
            fontFamily: `"Noto Sans JP", sans- serif !important`,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'red'
            }
        }
    }

    const navigate = useNavigate()

    const moveToNewProductPage = () => {
        navigate('/product?page=product&new=true')
    }

    const moveToFashionProductPage = () => {
        navigate('/product?page=product&review=5')
    }

    const moveToChdProductPage = () => {
        navigate('/product?page=product&sex=boy')
    }

    const moveToCasualProductPage = () => {
        navigate('/product?page=product&casual=casual')
    }

    const moveToNonCasualProductPage = () => {
        navigate('/product?page=product&casual=nonCasual')
    }

    return (
        <Box sx={{ ...styles.box }}>
            <Typography style={{ ...styles.text }} onClick={moveToNewProductPage}>新着情報</Typography>
            <Typography style={{ ...styles.text }} onClick={moveToFashionProductPage}>人気商品</Typography>
            <Typography style={{ ...styles.text }} onClick={moveToChdProductPage}>子供服</Typography>
            <Typography style={{ ...styles.text }} onClick={moveToCasualProductPage}>カジュアル</Typography>
            <Typography style={{ ...styles.text }} onClick={moveToNonCasualProductPage}>フォーマル</Typography>
        </Box>
    )
}
