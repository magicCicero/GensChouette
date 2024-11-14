import React, { useEffect, useState } from "react";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import Product from "./product";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { axiosData } from "../../util/api";
import { styles, setting1 } from '../styles/homeStyle'

function FashionProduct() {
    const [displayData, setDisplayData] = useState(null)

    const getData = async () => {
        var res = await axiosData('/getProduct', {
            size: [],
            review: [5],
            type: [],
            sex: [],
            matchType: [],
            casual: [],
            new: false,
            minPrice: '',
            maxPrice: '',
            search: '',
            userID: ''
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
        navigate('/product?page=product&review=5')
    }

    return (
        <Box>
            <Container sx={{ ...styles.section }}>
                <Box sx={{ ...styles.slider.container, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box sx={{ width: { xs: '100%', sm: '50%', md: '33%', lg: '25%' } }}>
                        <Box sx={{ ...styles.slider.intro.container }}>
                            <Box sx={{ ...styles.slider.intro.textArea }}>
                                <Typography sx={{ ...styles.primaryText }} s>人気商品</Typography>
                                <Typography sx={{ ...styles.slider.intro.text }} className="primary-font">
                                    嬉しいお知らせです - 最新の服が発売されました！快適なカジュアルから華やかなドレスまで、あらゆるスタイルや気分にちょうど良いラインナップを取り揃えています。
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{ ...styles.slider.intro.button }}
                                className="primary-font"
                                onClick={() => moveToProductPage('new', false)}
                            >
                                今すぐ購入
                                <ArrowRightAltRoundedIcon />
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ ...styles.slider.slides.container }}>
                        <Slider {...setting1} sx={{ border: 'none' }}>
                            {displayData &&
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

            <Container>
                <Divider />
            </Container>
        </Box>
    );
}

export default FashionProduct;