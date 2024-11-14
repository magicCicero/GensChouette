import React from 'react'
import { Typography, Rating, Card, CardActionArea, CardContent, CardMedia, Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Product({ info }) {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const moveToProductDetail = (id) => {
        const newURL = new URLSearchParams(searchParams)
        newURL.set('product', id)

        navigate(`/product-detail?${newURL.toString()}`)
    }

    return (
        <Card id='productForTop' sx={{ width: '95%', marginInline: 'auto' }} onClick={() => moveToProductDetail(info.id)}>
            <CardActionArea sx={{ border: 'none', borderBottom: '1px solid var(--gray)' }}>
                <CardMedia
                    component="img"
                    image={"/assets/img/products/" + info.img}
                    alt={info.img}
                    sx={{ height: '250px' }}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            fontSize: '15px',
                            lineHeight: '20px',
                            letterSpacing: '2px'
                        }}
                        className="primary-font">
                        {info.intro.length > 20 ? info.intro.slice(0, 20) + '...' : info.intro}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Rating
                            name="text-feedback"
                            value={info.review}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <Typography>¥{info.price}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}