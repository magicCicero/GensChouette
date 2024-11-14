import React, { useEffect, useState } from "react";
import { Box, Button, Container, Divider, ImageListItem, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import Product from "./product";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { axiosData } from "../../util/api";
import { styles, setting2 } from '../styles/homeStyle'

function ChildProduct() {
    const [displayData, setDisplayData] = useState(null)

    const getData = async () => {
        var res = await axiosData('/getProduct', {
            size: [],
            review: [],
            type: [],
            sex: ['boy'],
            matchType: [],
            casual: [],
            new: false,
            minPrice: '',
            maxPrice: '',
            search: '',
            userID: '',
            discount: false
        })

        if (res.length < 3) {
            res = [...res, ...res, ...res]
        }
        setDisplayData(res)
    }

    useEffect(() => {
        getData()
    }, [])

    const navigate = useNavigate()

    const moveToProductPage = () => {
        navigate('/product?page=product&sex=boy')
    }

    return (
        <Box>
            <Container sx={{ ...styles.section }}>
                <Box sx={{ ...styles.introSection.container }}>
                    <Box sx={{ ...styles.introSection.chdContainer }}>
                        <ImageListItem >
                            <img
                                src={`/assets/img/child.png`}
                                alt='img'
                                loading="lazy"
                            />
                        </ImageListItem>
                    </Box>
                    <Box sx={{ ...styles.introSection.chdContainer }}>
                        <Box sx={{ ...styles.introSection.textContainer }}>
                            <ImageListItem sx={{ width: '25%', marginInline: 'auto' }}>
                                <img
                                    src={`/assets/img/child-symbol.png`}
                                    alt='img'
                                    loading="lazy"
                                />
                            </ImageListItem>
                            <Typography sx={{ ...styles.primaryText, fontWeight: 600 }}>
                                遊び心のあるプリント、鮮やかなカラー、クラシックなスタイルなど、お子様の好みや個性に合わせた様々なファッションアイテムをご用意しています。
                            </Typography>
                            <Divider sx={{ marginTop: '30px' }} />
                            <Box sx={{}}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: 'var(--primary)', paddingInline: '30px' }}
                                    className="primary-font"
                                    onClick={moveToProductPage}
                                >
                                    今すぐ購入
                                    <ArrowRightAltRoundedIcon />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ ...styles.section }} />
                <Box sx={{ ...styles.introSection.slider }}>
                    <Box sx={{ width: '100%' }}>
                        <Slider {...setting2} sx={{ border: 'none' }}>
                            {
                                displayData &&
                                displayData.map((product, idx) => {
                                    return (
                                        <Product info={product} key={idx} />
                                    )
                                })
                            }
                        </Slider>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default ChildProduct;