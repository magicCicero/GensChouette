import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Container,
    IconButton,
    Tabs,
    Tab,
    Typography,
    Box,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProductModal from './pro_modal';

export default function CustomerTabs() {

    const styles = {
        container: {
            width: '100%',
            marginTop: '20px'
        },
        tabs: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    }

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!searchParams.get('tab') || searchParams.get('tab') === 'product') {
            setValue(0)
        } else {
            setValue(1)
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            navigate(`/customer?tab=product`, { replace: true })
        } else {
            navigate(`/customer?tab=payment`, { replace: true })
        }
    };

    const handleModalOpen = () => {
        setOpen(true)
    }

    return (
        <Box sx={{ ...styles.container }}>
            <Container sx={{ ...styles.tabs }}>
                <Tabs value={value} onChange={handleChange} aria-label="customer tab">
                    <Tab
                        label={<Typography>商品管理</Typography>}
                        id='customer-tab-0'
                        aria-controls='customer-tabpanel-0'
                    />
                    <Tab
                        label={<Typography>販売管理</Typography>}
                        id='customer-tab-1'
                        aria-controls='customer-tabpanel-1'
                    />
                </Tabs>
                {
                    value === 0 ?
                        <Box>
                            <IconButton onClick={handleModalOpen}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Box> : null
                }
            </Container>
            <ProductModal open={open} setOpen={setOpen} modalType='add' value={[]} />
        </Box>
    );
}
