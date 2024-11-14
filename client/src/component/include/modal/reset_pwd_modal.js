import * as React from 'react';
import { toast } from 'react-toastify';
import { Button, FormControl, Input, InputAdornment, InputLabel, Box, Typography, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close'
import Cookies from 'js-cookie'
import { axiosData } from '../../../util/api';

export default function AuthResetPwdModal({ setAuth, setOpen }) {

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

    const [pwd, setPwd] = React.useState('')
    const [confirmPwd, setConfirmPwd] = React.useState('')
    const [showResetPwd, setShowResetPwd] = React.useState(false);
    const [showResetConfirmPwd, setShowResetConfirmPwd] = React.useState(false);

    const handleResetPwd = async () => {
        if (!pwd) {
            toast.error('パスワードを入力してください。')
        } else if (!confirmPwd) {
            toast.error('確認パスワードを入力してください。')
        } else if (pwd !== confirmPwd) {
            toast.error('パスワードが一致しません。')
        } else {
            try {
                const res = await axiosData('/resetPwd', {
                    email: Cookies.get('resetEmail'),
                    pwd: pwd
                })
                if (res) {
                    toast.success('パスワードがリセットされました。')
                    setAuth(0)
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
            <FormControl sx={{ ...styles.input }} variant="standard">
                <InputLabel>パスワード</InputLabel>
                <Input
                    type={showResetPwd ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowResetPwd((show) => !show)}
                            >
                                {showResetPwd ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={(event) => setPwd(event.target.value)}
                />
            </FormControl>
            <FormControl sx={{ ...styles.input }} variant="standard">
                <InputLabel>パスワード</InputLabel>
                <Input
                    type={showResetConfirmPwd ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowResetConfirmPwd((show) => !show)}
                            >
                                {showResetConfirmPwd ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={(event) => setConfirmPwd(event.target.value)}
                />
            </FormControl>
            <Button
                variant="contained"
                sx={{ ...styles.button }}
                size='large'
                onClick={handleResetPwd}
            >パスワード再設定</Button>
            <Typography
                sx={{ ...styles.text, display: 'flex', justifyContent: 'end', cursor: 'pointer' }}
                onClick={() => setAuth(0)}
            >ログインに戻る</Typography>
        </Box>
    );
}