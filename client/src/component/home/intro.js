import { Box, Button, Container, ImageListItem, Typography } from '@mui/material'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { introStyle } from '../styles/homeStyle';

export default function Intro() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const moveToProductPage = (reduce) => {
        const newURL = new URLSearchParams(searchParams)
        if (reduce) {
            newURL.set('discount', reduce);
        }
        newURL.set('page', 'product');

        navigate(`/product?${newURL.toString()}`, { replace: true });
    }

    return (
        <Box sx={{ ...introStyle.box }}>
            <Container sx={{ ...introStyle.container }}>
                <ImageListItem sx={{ ...introStyle.leftImg }}>
                    <img alt='img' src={`/assets/img/top1.png`} loading="lazy" />
                </ImageListItem>
                <Box sx={{
                    width: {
                        sm: '550px',
                        xs: '100%'
                    },
                    marginInline: 'auto'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'center',
                        gap: '16px'
                    }}>
                        <Box>
                            <Typography sx={{ ...introStyle.title }}>夏のレディース</Typography>
                            <Typography sx={{
                                ...introStyle.title,
                                marginLeft: '20px',
                                borderBottom: '1px solid black'
                            }}>ブランドジーンズ</Typography>
                        </Box>
                        <Box>
                            <Button variant="contained" sx={{ backgroundColor: 'var(--primary)' }} onClick={() => moveToProductPage(true)}>-35%</Button>
                        </Box>
                    </Box>
                    <Typography sx={{ ...introStyle.text }}>
                        強く、偉大に。それは誰もが憧れる存在。ふと気がつくと虜にさせられる、そんなライフ&ファッションスタイルを目指して。
                    </Typography>
                    <Box sx={{ width: '100%', textAlign: 'center', paddingTop: '40px' }}>
                        <Button variant="contained"
                            onClick={() => moveToProductPage(false)}
                            sx={{
                                backgroundColor: 'var(--primary)',
                                paddingInline: '30px'
                            }}
                        >
                            今すぐ購入<ArrowRightAltRoundedIcon />
                        </Button>
                    </Box>
                </Box>
                <ImageListItem sx={{ ...introStyle.rightImg }}>
                    <img alt='img' src={`/assets/img/top2.png`} loading="lazy" />
                </ImageListItem>
            </Container>
        </Box>
    )
}