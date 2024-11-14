import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Rating, Typography, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { json, useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getParamsFromURL } from '../../util/manageURL';
import { axiosData } from '../../util/api';
import { styles } from '../styles/productStyle';
import { filterItems } from '../../util/filterItems';

export default function Products() {

    const [cart, setCart] = useState([])
    const [displayData, setDisplayData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const [searchParams] = useSearchParams()

    const getData = async () => {
        var data = getParamsFromURL(searchParams);
        data.userID = Cookies.get('userID');
        console.log(data.userID, "<<<<<data.userID");
        var res = await axiosData('/getProduct', data)
        if (searchParams.get('page') === 'product') {
            var _res = [];
            var startPoint = (page - 1) * 12;
            var endPoint = page * 12 > res.length ? res.length : page * 12;
            if (res.length % 12 === 0) {
                setTotalPages(res.length / 12)
            } else {
                setTotalPages(Math.floor(res.length / 12) + 1)
            }
            for (var idx = startPoint; idx < endPoint; idx++) {
                _res.push(res[idx])
            }
            setDisplayData(_res)
        } else {
            var _res = [];
            var cookiesData = [];
            if (Cookies.get('cart')) {
                var cookiesCart = JSON.parse(Cookies.get('cart'))
            }
            if (cookiesCart.length % 12 === 0) {
                setTotalPages(cookiesCart.length / 12)
            } else {
                setTotalPages(Math.floor(cookiesCart.length / 12) + 1)
            }
            for (var idx = 0; idx < res.length; idx++) {
                if (cookiesCart.includes(res[idx].id)) {
                    cookiesData.push(res[idx])
                }
            }
            var startPoint = (page - 1) * 12;
            var endPoint = page * 12 > cookiesData.length ? cookiesData.length : page * 12;
            for (var idx = startPoint; idx < endPoint; idx++) {
                _res.push(cookiesData[idx])
            }
            setDisplayData(_res)
        }
    }

    useEffect(() => {
        getData()
    }, [page])

    useEffect(() => {
        getData()
        setPage(1)
        setTotalPages(1)
    }, [window.location.href])

    useEffect(() => {
        if (Cookies.get('cart')) {
            setCart(JSON.parse(Cookies.get('cart')))
        }

        getData()
    }, [])

    const pageChangeHandler = (event, value) => {
        setPage(value)
    }

    const navigate = useNavigate()

    const moveToProductDetail = (id) => {
        const newURL = new URLSearchParams()
        newURL.set('product', id)

        navigate(`/product-detail?${newURL.toString()}`, { replace: true })
    }

    const handleCart = (id, action) => {
        var cookiesCart = []
        if (Cookies.get('cart')) {
            cookiesCart = JSON.parse(Cookies.get('cart'))
        }
        if (action) {
            cookiesCart.push(id)
            Cookies.set('cart', JSON.stringify(cookiesCart))
            setCart(cookiesCart)
        } else if (Cookies.get('cart')) {
            cookiesCart = cookiesCart.filter(item => item !== id)
            Cookies.set('cart', JSON.stringify(cookiesCart))
            setCart(cookiesCart)
        } else {
            setCart([])
        }
        getData()
    }

    return (
        <Container sx={{ ...styles.container }}>
            <Typography sx={{ ...styles.title }}>商品紹介</Typography>
            <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
                {
                    displayData.length === 0 ?
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            marginTop: '50px',
                            marginBottom: '50px',
                            textAlign: 'center',
                            fontSize: '17px',
                            letterSpacing: '10px',
                            fontFamily: '"Noto Sans JP", sans-serif !important'
                        }}>資料がありません!</Box>
                        :
                        displayData.map((product, idx) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginTop: '30px' }} key={idx}>
                                <Card id={'product' + idx} sx={{ ...styles.card }}>
                                    <CardActionArea sx={{ ...styles.cardActionArea }}>
                                        <CardMedia
                                            component="img"
                                            image={"/assets/img/products/" + product.img}
                                            alt={product.img}
                                            sx={{ ...styles.cardMedia }}
                                            onClick={() => moveToProductDetail(product.id)}
                                        />
                                        <CardContent id='productCardContent' sx={{ ...styles.cardContent }}>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                sx={{ ...styles.intro }}
                                            >
                                                {product.intro.length > 20 ? product.intro.slice(0, 20) + '...' : product.intro}
                                            </Typography>
                                            <Box sx={{ ...styles.box1 }}>
                                                <Box sx={{ ...styles.sizeContent }}>
                                                    {
                                                        JSON.parse(product.size).map((ele, jdx) => (
                                                            ele ?
                                                                < Typography gutterBottom variant="h5" sx={{ ...styles.size }} key={jdx}>
                                                                    {filterItems.size.value[jdx]}
                                                                </Typography>
                                                                :
                                                                null
                                                        ))
                                                    }
                                                </Box>
                                                {
                                                    cart.indexOf(product.id) !== -1 ?
                                                        <FavoriteIcon onClick={() => handleCart(product.id, false)} />
                                                        :
                                                        <FavoriteBorderIcon onClick={() => handleCart(product.id, true)} />
                                                }
                                            </Box>
                                            <Box sx={{ ...styles.box2 }}>
                                                <Rating
                                                    name="text-feedback"
                                                    value={Number(product.review)}
                                                    readOnly
                                                    precision={0.5}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                />
                                                <Typography>¥{product.price}</Typography>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                }
            </Grid>
            {
                displayData.length === 0 ?
                    null
                    :
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={pageChangeHandler}
                        sx={{
                            width: 'fit-content',
                            marginInline: 'auto',
                            marginTop: '15px',
                            marginBottom: '15px'
                        }}
                    />
            }
        </Container >
    )
}