import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, FormControl, Input, InputAdornment, InputLabel, TextField, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { axiosData } from '../../../util/api'
import Cookies from 'js-cookie'

export default function AuthLoginModal({ setAuth, setOpen }) {

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

    const [showLoginPwd, setShowLoginPwd] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const [pwd, setPwd] = React.useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        console.log(email, "<<<<< email");
        if (!email) {
            toast.error('メールアドレスを入力してください。')
        } else if (!pwd) {
            toast.error('パスワードを入力してください。')
        } else {
            const res = await axiosData('/loginUser', {
                email: email,
                pwd: pwd
            })
            if (res) {
                Cookies.set('user', res[0].permission)
                Cookies.set('userID', res[0].id)
                switch (res[0].permission) {
                    case 82:
                        navigate('/admin')
                        break;
                    case 29:
                        navigate('/customer')
                        break;
                    default:
                        navigate('/user')
                        break;
                }
            } else {
                toast.error('入力した情報が正確ではありません。!')
            }
        }
    }

    return (
        <Box sx={{ ...styles.container }}>
            <Box sx={{ ...styles.header }}>
                <Typography sx={{ ...styles.title }}>ログイン</Typography>
                <CloseIcon sx={{ ...styles.close }} onClick={() => setOpen(false)} />
            </Box>
            <TextField
                label="メールアドレス"
                variant="standard"
                id='login_email'
                sx={{ ...styles.input }}
                onChange={(event) => setEmail(event.target.value)}
            />
            <FormControl sx={{ ...styles.input }} variant="standard">
                <InputLabel>パスワード</InputLabel>
                <Input
                    type={showLoginPwd ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowLoginPwd((show) => !show)}
                            >
                                {showLoginPwd ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    id='login_pwd'
                    onChange={(event) => setPwd(event.target.value)}
                />
            </FormControl>
            <Typography
                sx={{ ...styles.text, cursor: 'pointer' }}
                onClick={() => setAuth(2)}
            >パスワードをお忘れの方</Typography>
            <Button
                variant="contained"
                sx={{ ...styles.button }}
                size='large'
                onClick={handleLogin}
            >ログイン</Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ ...styles.text }}>初めてご利用される方</Typography>
                <Typography
                    sx={{ ...styles.text, cursor: 'pointer' }}
                    onClick={() => setAuth(1)}
                >新規登録</Typography>
            </Box>
        </Box>
    );
}