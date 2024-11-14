import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { ImageListItem, Modal, AppBar, Box, Toolbar, InputBase, IconButton, Button, Paper, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import DirectionsIcon from '@mui/icons-material/Directions';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthLoginModal from './modal/login_modal';
import AuthRegModal from './modal/reg_modal';
import AuthForgotPwdModal from './modal/forgot_pwd_modal';
import AuthPasscodeModal from './modal/passcode_modal';
import AuthResetPwdModal from './modal/reset_pwd_modal';
import NavMobileMenu from './nav_mobile_menu';
import Cookies from 'js-cookie';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    flexGrow: 1
}));

export default function Navbar() {

    const styles = {
        appbar: {
            backgroundColor: 'white',
            boxShadow: 'none',
            borderBottom: '1px solid var(--secondary)'
        },
        logo: {
            width: '50px',
            marginRight: '15px',
            marginTop: '20px',
            marginBottom: '20px',
            cursor: 'pointer'
        },
        search: {
            fontFamily: `"Noto Sans JP", sans- serif !important`,
            color: 'black',
            display: 'block',
        }
    }

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [auth, setAuth] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get('search'))

    useEffect(() => {
        if (searchParams.get('search')) {
            setSearch(searchParams.get('search'))
        }
    }, [])

    const handleModalOpen = () => {
        if (Cookies.get('user')) {
            switch (Cookies.get('user')) {
                case '82':
                    navigate('/admin')
                    break;
                case '29':
                    navigate('/customer')
                    break;
                default:
                    navigate('/user')
                    break;
            }
        } else {
            setOpen(true)
            setAuth(0, false)
        }
    }

    const handleModalClose = () => {
        setOpen(false)
    }

    const moveToPageHandler = (param) => {
        navigate('/product?page=' + param, { replace: true })
    }

    const moveToHomePage = () => {
        navigate('/')
    }

    const logoutManagePageHandler = () => {
        Cookies.remove('user')
        Cookies.remove('userID')
        navigate('/');
    }

    const searchHandler = (event) => {
        event.preventDefault()
        if (!search) {
            const _searchParams = new URLSearchParams(location.search)
            _searchParams.delete('search')
            const newURL = `${location.pathname}?${_searchParams.toString()}`;
            navigate(newURL)
        } else if (search && location.pathname === '/') {
            const newURL = new URLSearchParams(searchParams);
            newURL.set('page', 'product')
            newURL.set('search', search)
            navigate(`/product?${newURL.toString()}`, { replace: true })
        } else {
            const _searchParams = new URLSearchParams(location.search)
            _searchParams.set('search', search)
            const newURL = `${location.pathname}?${_searchParams.toString()}`;
            navigate(newURL)
        }
    }

    const modalShow = () => {
        switch (auth) {
            case 0:
                return (<AuthLoginModal setAuth={setAuth} setOpen={setOpen} />)
            case 1:
                return (<AuthRegModal setAuth={setAuth} setOpen={setOpen} />)
            case 2:
                return (<AuthForgotPwdModal setAuth={setAuth} setOpen={setOpen} />)
            case 3:
                return (<AuthPasscodeModal setAuth={setAuth} setOpen={setOpen} />)
            default:
                return (<AuthResetPwdModal setAuth={setAuth} setOpen={setOpen} />)
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' sx={{ ...styles.appbar }}>
                <Toolbar>
                    <ImageListItem sx={{ ...styles.logo }} onClick={() => moveToHomePage()}>
                        <img src={`/assets/img/logo.png`} alt='logo' loading="lazy" />
                    </ImageListItem>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <Paper
                            component="form"
                            onSubmit={searchHandler}
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                        >
                            <InputBase
                                sx={{ pl: 1, flex: 1 }}
                                placeholder="検索語......"
                                defaultValue={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} onClick={searchHandler}>
                                <SearchIcon />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color="primary" sx={{ p: '10px' }} onClick={searchHandler}>
                                <DirectionsIcon />
                            </IconButton>
                        </Paper>
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" onClick={() => moveToPageHandler('product')}>
                            <FavoriteBorderRoundedIcon sx={{ color: 'var(--dark)' }} />
                        </IconButton>
                        <IconButton size="large" onClick={handleModalOpen}>
                            <AccountCircle sx={{ color: 'var(--dark)' }} />
                        </IconButton>
                        <IconButton size="large" onClick={() => moveToPageHandler('cart')}>
                            <ShoppingCartRoundedIcon sx={{ color: 'var(--dark)' }} />
                        </IconButton>
                        {
                            Cookies.get('user') ?
                                <IconButton size="large" onClick={() => logoutManagePageHandler()}>
                                    <LogoutIcon sx={{ color: 'var(--dark)' }} />
                                </IconButton>
                                :
                                null
                        }
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls='primary-search-account-menu-mobile'
                            aria-haspopup="true"
                            onClick={(event) => setMobileMoreAnchorEl(event.currentTarget)}
                        >
                            <MoreIcon sx={{ color: 'var(--dark)' }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <NavMobileMenu
                setOpen={setOpen}
                mobileMoreAnchorEl={mobileMoreAnchorEl}
                setMobileMoreAnchorEl={setMobileMoreAnchorEl}
                setAuth={setAuth}
            />
            <Modal
                keepMounted
                open={open}
                onClose={handleModalClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                {modalShow()}
            </Modal>
        </Box>
    );
}