import React, { useEffect, useState } from "react";
import { Box, Button, Container, ImageListItem, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import Product from "./product";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { axiosData } from "../../util/api";
import { styles, setting2 } from "../styles/homeStyle";

function CasualProduct() {
    const [displayData, setDisplayData] = useState(null)

    const getData = async () => {
        var res = await axiosData('/getProduct', {
            size: [],
            review: [],
            type: [],
            sex: [],
            matchType: [],
            casual: ['casual'],
            new: false,
            minPrice: '',
            maxPrice: '',
            search: '',
            userID: '',
            discount: false
        })

        if (res.length < 4) {
            res = [...res, ...res, ...res, ...res]
        }
        setDisplayData(res)
    }

    useEffect(() => {
        getData()
    }, [])

    const navigate = useNavigate()

    const moveToProductPage = (discount) => {
        if (discount) {
            navigate('/product?page=product&casual=casual&discount=true')
        } else {
            navigate('/product?page=product&casual=casual')
        }
    }

    return (
        <Box>
            <Box sx={{ backgroundColor: 'var(--secondary)' }}>
                <Container>
                    <Box sx={{ ...styles.introSection.container }}>
                        <Box sx={{ ...styles.introSection.chdContainer }}>
                            <ImageListItem >
                                <img
                                    src={`/assets/img/beauty.png`}
                                    alt='img'
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </Box>
                        <Box sx={{
                            ...styles.introSection.chdContainer,
                            paddingBottom: {
                                xs: '30px',
                                sm: '30px',
                                md: '0px'
                            }
                        }}>
                            <Box sx={{ ...styles.introSection.textContainer }}>
                                <Typography sx={{
                                    ...styles.primaryText,
                                    fontWeight: 600
                                }}>
                                    ステップインスタイル
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    gap: '20px',
                                    marginTop: '15px'
                                }}>
                                    <Typography sx={{
                                        fontSize: {
                                            xs: '15px',
                                            sm: '20px',
                                        },
                                        fontWeight: 600,
                                        borderBottom: '2px solid var(--gray)'
                                    }} className="primary-font">スタイリッシュな</Typography>
                                    <Button variant="contained"
                                        onClick={() => moveToProductPage(true)}
                                        sx={{
                                            backgroundColor: 'var(--primary)',
                                        }}>
                                        -35%
                                    </Button>
                                </Box>
                                <Typography sx={{
                                    marginTop: '30px',
                                    fontSize: '17px',
                                    fontWeight: 600
                                }} className="primary-font">
                                    リーズナブルな価格でワードローブをアップグレードして、自分のスタイルを表現しましょう。
                                </Typography>
                                <Box sx={{
                                    width: '100%',
                                    textAlign: 'center',
                                    marginTop: '30px'
                                }}>
                                    <Button variant="contained"
                                        onClick={() => moveToProductPage(false)}
                                        sx={{
                                            backgroundColor: 'var(--primary)',
                                            paddingInline: '30px'
                                        }}
                                        className="primary-font">
                                        今すぐ購入
                                        <ArrowRightAltRoundedIcon />
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Container sx={{ ...styles.section }}>
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

export default CasualProduct;