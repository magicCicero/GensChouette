import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

export default function Header() {

    const styles = {
        box: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            backgroundColor: 'var(--primary)',
            color: 'white',
            height: '30px',
        },
        percent: {
            fontSize: '11px',
            backgroundColor: 'var(--secondary)',
            paddingInline: '10px',
            borderRadius: '10px',
            color: 'var(--purple)'
        },
        link: {
            display: 'flex',
            alignItems: 'center',
            color: 'white'
        },
        text: {
            fontSize: '11px'
        }
    }

    return (
        <Box sx={{ ...styles.box }}>
            <Typography style={{ ...styles.text }} className="primary-font">プレミアムセール</Typography>
            <Typography style={{ ...styles.percent }}>-35%</Typography>
            <Link to='/product?reduce=true' style={{ ...styles.link }}>
                <Typography style={{ ...styles.text }} className="primary-font">もっと見る</Typography>
                <ArrowRightAltRoundedIcon />
            </Link>
        </Box>
    )
}
