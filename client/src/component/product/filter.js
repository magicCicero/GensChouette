import {
    Accordion, AccordionDetails, AccordionSummary, Container, Grid, Box, FormGroup, FormControlLabel, Typography, FormControl,
    RadioGroup, Rating, TextField, InputAdornment
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import React, { useEffect, useState } from 'react'
import { filterItems } from '../../util/filterItems';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getParamsFromURL, manageURL } from '../../util/manageURL';

export default function Filter() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const [filterParams, setFilterParams] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    const setURL = async (filter, id) => {
        if (filter === 'minPrice') {
            if (Number(id)) {
                setMinPrice(id)
            } else {
                setMinPrice('')
            }
        } else if (filter === 'maxPrice') {
            if (Number(id)) {
                setMaxPrice(id)
            } else {
                setMaxPrice('')
            }
        }
        if (!Number(id) && (filter === 'minPrice' || filter === 'maxPrice')) {
            id = 0
        }
        manageURL(filter, id, navigate, searchParams, location)
    }

    useEffect(() => {
        var res = getParamsFromURL(searchParams)
        setMinPrice(res.minPrice)
        setMaxPrice(res.maxPrice)
        setFilterParams(res)
    }, [])

    return (
        <Container>
            <Accordion sx={{
                boxShadow: 'none',
                borderBottom: '1px solid var(--gray)',
                borderRadius: '0px !important'
            }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>フィルター</AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={3} sx={{ marginTop: '20px' }}>
                                <Typography className="primary-font" sx={{
                                    fontWeight: 600,
                                    paddingBottom: '15px'
                                }}>{filterItems.matchType.id}</Typography>
                                <FormGroup>
                                    {
                                        filterItems.matchType.value.map((ele, idx) => (
                                            filterParams ?
                                                filterParams.matchType.indexOf(ele.value) !== -1 ?
                                                    <FormControlLabel
                                                        control={<Checkbox defaultChecked />}
                                                        label={ele.txt}
                                                        key={idx}
                                                        onClick={() => setURL('matchType', ele.value)}
                                                    />
                                                    :
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label={ele.txt}
                                                        key={idx}
                                                        onClick={() => setURL('matchType', ele.value)}
                                                    />
                                                : null
                                        ))
                                    }
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3} sx={{ marginTop: '20px' }}>
                                <Typography className="primary-font" sx={{
                                    fontWeight: 600,
                                    paddingBottom: '15px'
                                }}>{filterItems.type.id}</Typography>
                                <FormGroup>
                                    {
                                        filterItems.type.value.map((ele, idx) => (
                                            filterParams ?
                                                filterParams.type.indexOf(ele.value) !== -1 ?
                                                    <FormControlLabel
                                                        control={<Checkbox defaultChecked />}
                                                        label={ele.txt}
                                                        key={idx}
                                                        onClick={() => setURL('type', ele.value)}
                                                    />
                                                    :
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label={ele.txt}
                                                        key={idx}
                                                        onClick={() => setURL('type', ele.value)}
                                                    />
                                                : null
                                        ))
                                    }
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3} sx={{ marginTop: '20px' }}>
                                <Typography className="primary-font" sx={{
                                    fontWeight: 600,
                                    paddingBottom: '15px'
                                }}>{filterItems.size.id}</Typography>
                                <FormGroup>
                                    {
                                        filterItems.size.value.map((ele, idx) => (
                                            filterParams ?
                                                filterParams.size.indexOf(ele) !== -1 ?
                                                    <FormControlLabel
                                                        control={<Checkbox defaultChecked />}
                                                        label={ele}
                                                        key={idx}
                                                        onClick={() => setURL('size', ele)}
                                                    />
                                                    :
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label={ele}
                                                        key={idx}
                                                        onClick={() => setURL('size', ele)}
                                                    />
                                                : null
                                        ))
                                    }
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3} sx={{ marginTop: '20px' }}>
                                <Typography className="primary-font" sx={{
                                    fontWeight: 600,
                                    paddingBottom: '15px'
                                }}>{filterItems.review.id}</Typography>
                                <FormGroup>
                                    {
                                        filterItems.review.value.map((ele, idx) => (
                                            filterParams ?
                                                filterParams.review.indexOf(String(ele)) !== -1 ?
                                                    <FormControlLabel
                                                        control={<Checkbox defaultChecked />}
                                                        label={<Rating defaultValue={ele} readOnly />}
                                                        key={idx}
                                                        onClick={() => setURL('review', ele)}
                                                    />
                                                    :
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label={<Rating defaultValue={ele} readOnly />}
                                                        key={idx}
                                                        onClick={() => setURL('review', ele)}
                                                    />
                                                : null
                                        ))
                                    }
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3} sx={{ marginTop: '20px' }}>
                                <Typography
                                    className="primary-font"
                                    sx={{
                                        fontWeight: 600,
                                        paddingBottom: '15px'
                                    }}
                                >{filterItems.casual.id}</Typography>
                                <FormControl>
                                    <RadioGroup defaultValue="all">
                                        {
                                            filterItems.casual.value.map((ele, idx) => (
                                                filterParams ?
                                                    filterParams.casual.indexOf(ele.value) !== -1 ?
                                                        <FormControlLabel
                                                            control={<Checkbox defaultChecked />}
                                                            label={ele.txt}
                                                            key={idx}
                                                            onClick={() => setURL('casual', ele.value)}
                                                        />
                                                        :
                                                        <FormControlLabel
                                                            control={<Checkbox />}
                                                            label={ele.txt}
                                                            key={idx}
                                                            onClick={() => setURL('casual', ele.value)}
                                                        />
                                                    : null
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3} sx={{ marginTop: '20px' }}>
                                <Typography
                                    className="primary-font"
                                    sx={{
                                        fontWeight: 600,
                                        paddingBottom: '15px'
                                    }}
                                >{filterItems.sex.id}</Typography>
                                <FormControl>
                                    <RadioGroup defaultValue="all">
                                        {
                                            filterItems.sex.value.map((ele, idx) => (
                                                filterParams ?
                                                    filterParams.sex.indexOf(ele.value) !== -1 ?
                                                        <FormControlLabel
                                                            control={<Checkbox defaultChecked />}
                                                            label={ele.txt}
                                                            key={idx}
                                                            onClick={() => setURL('sex', ele.value)}
                                                        />
                                                        :
                                                        <FormControlLabel
                                                            control={<Checkbox />}
                                                            label={ele.txt}
                                                            key={idx}
                                                            onClick={() => setURL('sex', ele.value)}
                                                        />
                                                    : null
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} sx={{ marginTop: '20px' }}>
                                <Typography
                                    className="primary-font"
                                    sx={{
                                        fontWeight: 600,
                                        paddingRight: '20px',
                                        minWidth: '35px'
                                    }}
                                >価格</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    gap: {
                                        sm: 1,
                                        md: 2
                                    },
                                    alignItems: 'center'
                                }}>
                                    <TextField
                                        label="低価格"
                                        id="min-price"
                                        sx={{ m: 1, width: '25ch' }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <CurrencyYenIcon fontSize="small" />
                                            </InputAdornment>,
                                        }}
                                        variant="standard"
                                        size="small"
                                        placeholder='0'
                                        onChange={(event) => setURL('minPrice', event.target.value)}
                                        value={minPrice}
                                    />
                                    {/* {
                                        filterParams ?
                                            filterParams.minPrice ?
                                                <TextField
                                                    label="低価格"
                                                    id="min-price"
                                                    sx={{ m: 1, width: '25ch' }}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">
                                                            <CurrencyYenIcon fontSize="small" />
                                                        </InputAdornment>,
                                                    }}
                                                    variant="standard"
                                                    size="small"
                                                    placeholder='0'
                                                    onChange={(event) => setURL('minPrice', event.target.value)}
                                                    value={filterParams.minPrice}
                                                />
                                                :
                                                <TextField
                                                    label="低価格"
                                                    id="min-price"
                                                    sx={{ m: 1, width: '25ch' }}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">
                                                            <CurrencyYenIcon fontSize="small" />
                                                        </InputAdornment>,
                                                    }}
                                                    variant="standard"
                                                    size="small"
                                                    placeholder='0'
                                                    onChange={(event) => setURL('minPrice', event.target.value)}
                                                />
                                            :
                                            null
                                    } */}
                                    <TextField
                                        label="高価格"
                                        id="max-price"
                                        sx={{ m: 1, width: '25ch' }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <CurrencyYenIcon fontSize="small" />
                                            </InputAdornment>,
                                        }}
                                        variant="standard"
                                        size="small"
                                        placeholder='10000'
                                        onChange={(event) => setURL('maxPrice', event.target.value)}
                                        value={maxPrice}
                                    />
                                    {/* {
                                        filterParams ?
                                            filterParams.maxPrice ?
                                                <TextField
                                                    label="高価格"
                                                    id="max-price"
                                                    sx={{ m: 1, width: '25ch' }}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">
                                                            <CurrencyYenIcon fontSize="small" />
                                                        </InputAdornment>,
                                                    }}
                                                    variant="standard"
                                                    size="small"
                                                    placeholder='10000'
                                                    onChange={(event) => setURL('maxPrice', event.target.value)}
                                                    value={maxPrice}
                                                />
                                                :
                                                <TextField
                                                    label="高価格"
                                                    id="max-price"
                                                    sx={{ m: 1, width: '25ch' }}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">
                                                            <CurrencyYenIcon fontSize="small" />
                                                        </InputAdornment>,
                                                    }}
                                                    variant="standard"
                                                    size="small"
                                                    placeholder='10000'
                                                    onChange={(event) => setURL('maxPrice', event.target.value)}
                                                />
                                            :
                                            null
                                    } */}
                                </Box>
                                {
                                    filterParams ?
                                        filterParams.new ?
                                            <Box>
                                                <FormControlLabel
                                                    control={<Checkbox defaultChecked />}
                                                    label='新着情報'
                                                    sx={{ marginTop: '20px' }}
                                                    onClick={() => setURL('new', true)}
                                                />
                                            </Box>
                                            :
                                            <Box>
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label='新着情報'
                                                    sx={{ marginTop: '20px' }}
                                                    onClick={() => setURL('new', true)}
                                                />
                                            </Box>
                                        :
                                        null
                                }
                                {
                                    filterParams ?
                                        filterParams.discount ?
                                            <Box>
                                                <FormControlLabel
                                                    control={<Checkbox defaultChecked />}
                                                    label='割引商品'
                                                    sx={{ marginTop: '10px' }}
                                                    onClick={() => setURL('discount', true)}
                                                />
                                            </Box>
                                            :
                                            <Box>
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label='割引商品'
                                                    sx={{ marginTop: '10px' }}
                                                    onClick={() => setURL('discount', true)}
                                                />
                                            </Box>
                                        :
                                        null
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}