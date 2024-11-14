import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
    Typography,
    Box,
    Modal,
    TextField,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Grid,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { axiosData, fetchData } from '../../util/api';
import { filterItems } from '../../util/filterItems';
import Cookies from 'js-cookie'

export default function ProductModal({ open, setOpen, modalType, value }) {

    const styles = {
        container: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% - 80px)',
            maxWidth: '550px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 5
        },
        grid: {
            paddingTop: '16px !important'
        },
        title: {
            fontFamily: `"Noto Sans JP", sans- serif !important`,
            fontSize: '30px',
            fontWeight: 400,

        },
        input: {
            width: '100%',
            marginTop: '10px'
        },
        text: {
            fontFamily: '"Noto Sans JP", sans- serif !important',
            fontSize: '15px',
            marginTop: '10px'
        },
        size: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '20px',
            gap: '20px',
            color: 'gray',
            flexDirection: {
                xs: 'column',
                sm: 'row'
            }
        },
        button: {
            fontFamily: `"Noto Sans JP", sans- serif !important`,
            backgroundColor: 'var(--primary)',
            width: '100%',
            marginTop: '30px',
            letterSpacing: '10px'
        }
    }

    const [file, setFile] = useState(null);
    const [intro, setIntro] = useState('')
    const [brand, setBrand] = useState('')
    const [size, setSize] = useState([false, false, false, false, false, false, false])
    const [sex, setSex] = useState('');
    const [type, setType] = useState('');
    const [matchType, setMatchType] = useState('');
    const [casual, setCasual] = useState('');
    const [price, setPrice] = useState(null)
    const [prePrice, setPrePrice] = useState(null)

    const handleSizeChange = (id) => {
        var _size = size;
        _size[id] = !_size[id];
        setSize([..._size]);
    }

    useEffect(() => {
        if (modalType === 'edit' && open) {
            setIntro(value.intro)
            setBrand(value.brand)
            setSize(JSON.parse(value.size))
            setSex(value.sex)
            setType(value.type)
            setMatchType(value.matchType)
            setCasual(value.casual)
            setPrice(value.price)
            setPrePrice(value.prePrice)
        }
    }, [open])

    const handleSetPrice = (event) => {
        if (Number(event.target.value) > 0) {
            setPrice(event.target.value)
        }
    }

    const handleModalClose = () => {
        setOpen(false)
        setFile(null)
        setIntro('')
        setBrand('')
        setSize([false, false, false, false, false, false, false])
        setType('')
        setSex('')
        setMatchType('')
        setCasual('')
        setPrice(null)
        setPrePrice(null)
    }

    const addProductHandler = async (_file) => {
        try {
            const res = await axiosData('/addProduct', {
                file: _file,
                intro: intro,
                brand: brand,
                size: size,
                type: type,
                sex: sex,
                matchType: matchType,
                casual: casual,
                price: price,
                prePrice: prePrice,
                userID: Cookies.get('userID')
            })
            if (res) {
                handleModalClose();
                toast.success('新しい商品が追加されました。')
            }
        } catch (error) {
            toast.error('サーバー接続時にエラーが発生しました。')
        }
    }

    const updateProductHandler = async (_file) => {
        try {
            const res = await axiosData('/editProduct', {
                file: _file,
                intro: intro,
                brand: brand,
                size: size,
                type: type,
                sex: sex,
                review: value.review,
                matchType: matchType,
                casual: casual,
                price: price,
                prePrice: prePrice,
                productID: value.id
            })
            toast.success('変更されました。')
            if (res) {
                handleModalClose();
            }
        } catch (error) {
            toast.error('サーバー接続時にエラーが発生しました。')
        }
    }

    const handleAddProduct = async () => {
        if (!file && modalType === 'add') {
            toast.error('写真をアップロードしてください');
        } else if (!intro) {
            toast.error('はじめにを入力してください。');
        } else if (!type) {
            toast.error('カテゴリーを入力してください。');
        } else if (!sex) {
            toast.error('ジェンダーを入力してください。')
        } else if (!matchType) {
            toast.error('フィットタイプを入力してください。')
        } else if (!casual) {
            toast.error('ライフスタイルを入力してください。')
        } else if (!price) {
            toast.error('価格を入力してください。');
        } else {
            if (file) {
                const data = new FormData();
                data.append('file', file);
                await axios.post('http://localhost:3001/upload', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(async (result) => {
                    if (result.status === 200) {
                        try {
                            if (modalType === 'add') {
                                addProductHandler(result.data)
                            } else {
                                updateProductHandler(result.data);
                            }
                        } catch (error) {
                            toast.error('サーバー接続時にエラーが発生しました。')
                        }
                    }
                }).catch((err) => {
                    toast.error('サーバー接続時にエラーが発生しました。')
                })
            } else {
                updateProductHandler('');
            }
        }
    }

    return (
        <Modal keepMounted open={open} onClose={handleModalClose}>
            <Box sx={{ ...styles.container }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ ...styles.title }}>商品追加</Typography>
                    <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleModalClose} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0px', marginTop: '30px' }}>
                    <Typography sx={{ minWidth: '100px', color: 'gray' }}>イメージ:</Typography>
                    <TextField
                        type='file'
                        variant='standard'
                        fullWidth
                        margin='normal'
                        onChange={(event) => setFile(event.target.files[0])} >
                    </TextField>
                </Box>
                <TextField
                    id={'title' + modalType}
                    label="はじめに"
                    variant="standard"
                    value={intro}
                    sx={{ ...styles.input, marginTop: '0px' }}
                    onChange={(event) => setIntro(event.target.value)}
                />
                <TextField
                    id={'brand' + modalType}
                    label="ブランド"
                    variant="standard"
                    value={brand}
                    sx={{ ...styles.input }}
                    onChange={(event) => setBrand(event.target.value)}
                />
                <Box sx={{ ...styles.size }}>
                    <Typography sx={{ minWidth: '55px' }}>{filterItems.size.id}:</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        {
                            filterItems.size.value.map((ele, idx) => (
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={ele}
                                    key={idx}
                                    onClick={() => handleSizeChange(idx)}
                                    checked={size ? size[idx] : false}
                                />
                            ))
                        }
                    </Box>
                </Box>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    <Grid item xs={6}>
                        <FormControl variant="standard" sx={{ minWidth: 120, width: '100%', padding: '0px !important' }}>
                            <InputLabel>{filterItems.type.id}</InputLabel>
                            <Select value={type} onChange={(event) => setType(event.target.value)}>
                                {
                                    filterItems.type.value.map((element, idx) => (
                                        <MenuItem value={element.value} key={idx}>{element.txt}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" sx={{ minWidth: 120, width: '100%' }}>
                            <InputLabel>{filterItems.sex.id}</InputLabel>
                            <Select value={sex} onChange={(event) => setSex(event.target.value)}>
                                {
                                    filterItems.sex.value.map((element, idx) => (
                                        <MenuItem value={element.value} key={idx}>{element.txt}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '0px', width: '100%' }}>
                    <Grid item xs={6}>
                        <FormControl variant="standard" sx={{ minWidth: 120, width: '100%' }}>
                            <InputLabel>{filterItems.matchType.id}</InputLabel>
                            <Select value={matchType} onChange={(event) => setMatchType(event.target.value)}>
                                {
                                    filterItems.matchType.value.map((element, idx) => (
                                        <MenuItem value={element.value} key={idx}>{element.txt}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" sx={{ minWidth: 120, width: '100%' }}>
                            <InputLabel>{filterItems.casual.id}</InputLabel>
                            <Select value={casual} onChange={(event) => setCasual(event.target.value)}>
                                {
                                    filterItems.casual.value.map((element, idx) => (
                                        <MenuItem value={element.value} key={idx}>{element.txt}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '0px', width: '100%' }}>
                    <Grid item xs={6}>
                        <TextField
                            id={'price' + modalType}
                            label="価格"
                            variant="standard"
                            value={price ? price : ''}
                            sx={{ ...styles.input, marginTop: '0px' }}
                            onChange={handleSetPrice}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id={'pre-price' + modalType}
                            label="以前の価格"
                            variant="standard"
                            placeholder='必須ではありません'
                            sx={{ ...styles.input, marginTop: '0px' }}
                            onChange={(event) => setPrePrice(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    sx={{ ...styles.button }}
                    size='large'
                    onClick={handleAddProduct}
                >商品追加</Button>
            </Box>
        </Modal>
    );
}
