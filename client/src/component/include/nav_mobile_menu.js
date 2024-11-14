import * as React from 'react';
import { Menu, MenuItem, Typography, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useNavigate } from 'react-router-dom';

export default function NavMobileMenu({ setOpen, mobileMoreAnchorEl, setMobileMoreAnchorEl, setAuth }) {

    const styles = {
        font: {
            fontFamily: `"Noto Sans JP", sans- serif !important`,
        },
        menuItem: {
            paddingRight: '30px'
        }
    }

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const navigate = useNavigate();

    const moveToPageHandler = (pageTab) => {
        navigate('/product?page=' + pageTab)
        setMobileMoreAnchorEl(null)
    }

    const authModalOpen = () => {
        setOpen(true)
        setAuth(0)
        setMobileMoreAnchorEl(null)
    }

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id='primary-search-account-menu-mobile'
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={() => setMobileMoreAnchorEl(null)}
        >
            <MenuItem sx={{ ...styles.menuItem }} onClick={() => moveToPageHandler('product')}>
                <IconButton size="large" color="inherit">
                    <FavoriteBorderRoundedIcon />
                </IconButton>
                <Typography sx={{ ...styles.font }}>商品一覧</Typography>
            </MenuItem>
            <MenuItem sx={{ ...styles.menuItem }} onClick={authModalOpen}>
                <IconButton size="large" color="inherit">
                    <AccountCircle />
                </IconButton>
                <Typography sx={{ ...styles.font }}>ログイン</Typography>
            </MenuItem>
            <MenuItem sx={{ ...styles.menuItem }} onClick={() => moveToPageHandler('cart')}>
                <IconButton size="large" color="inherit">
                    <ShoppingCartRoundedIcon />
                </IconButton>
                <Typography sx={{ ...styles.font }}>バスケット</Typography>
            </MenuItem>
        </Menu>
    );
}