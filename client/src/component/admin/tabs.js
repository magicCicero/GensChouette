import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AdminTabs() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabEventHandler = (tabID) => {
        if (tabID === 0) {
            navigate('/admin?tab=user', { replace: true })
        } else {
            navigate('/admin?tab=sell', { replace: true })
        }
    }

    return (
        <Box sx={{ width: '100%', marginTop: '30px' }}>
            <Container>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab
                            label={
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <PersonIcon />
                                    <Typography>ユーザー管理</Typography>
                                </Box>
                            }
                            id='admin-tab-0'
                            aria-controls='admin-tabpanel-0'
                            onClick={() => tabEventHandler(0)}
                        />
                        <Tab
                            label={
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <PaymentIcon />
                                    <Typography>支払い管理</Typography>
                                </Box>
                            }
                            id='admin-tab-1'
                            aria-controls='admin-tabpanel-1'
                            onClick={() => tabEventHandler(1)}
                        />
                    </Tabs>
                </Box>
            </Container>
        </Box>
    );
}
