import React from 'react';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close'
import { Button, TextField, Box, Typography } from '@mui/material';
import { axiosData } from '../../../util/api';
import Cookies from 'js-cookie'

export default function AuthForgotPwdModal({ setAuth, setOpen }) {

    const styles = {
        container: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '320px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        title: {
            fontFamily: `"Noto Sans JP", sans- serif !important`,
            fontSize: '30px',
            fontWeight: 600
        },
        close: {
            cursor: 'pointer'
        },
        input: {
            width: '100%',
            marginTop: '20px'
        },
        text: {
            fontFamily: '"Noto Sans JP", sans- serif !important',
            fontSize: '15px',
            marginTop: '10px'
        },
        button: {
            fontFamily: `"Noto Sans JP", sans- serif !important`,
            backgroundColor: 'var(--primary)',
            width: '100%',
            marginTop: '30px',
            letterSpacing: '10px'
        }
    }

    const [email, setEmail] = React.useState('')

    const handleGetPassCode = async () => {
        if (!email) {
            toast.error('メールアドレスを入力してください。')
        } else {
            try {
                const res = await axiosData('/getPassCode', {
                    email: email,
                })
                if (res) {
                    Cookies.set('resetEmail', email)
                    setAuth(3)
                } else {
                    toast.error('dont correct email')
                }
            } catch (error) {
                toast.error('サーバー接続時にエラーが発生しました。')
            }
        }
    }

    return (
        <Box sx={{ ...styles.container }}>
            <Box sx={{ ...styles.header }}>
                <Typography sx={{ ...styles.title }}>パスワード再設定</Typography>
                <CloseIcon sx={{ ...styles.close }} onClick={() => setOpen(false)} />
            </Box>
            <TextField
                label="メールアドレス"
                variant="standard"
                id='forgot_email'
                sx={{ ...styles.input }}
                onChange={(event) => setEmail(event.target.value)}
            />
            <Button
                variant="contained"
                sx={{ ...styles.button }}
                size='large'
                onClick={handleGetPassCode}
            >確認</Button>
            <Typography
                sx={{ ...styles.text, display: 'flex', justifyContent: 'end', cursor: 'pointer' }}
                onClick={() => setAuth(0)}
            >ログインに戻る</Typography>
        </Box>
    );
}