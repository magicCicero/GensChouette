import * as React from 'react';
import { toast } from 'react-toastify';
import { Button, FormControl, Input, InputAdornment, InputLabel, TextField, Box, Typography, IconButton, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Visibility, VisibilityOff  } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close'
import { axiosData } from '../../../util/api';

export default function AuthRegModal({ setAuth, setOpen }) {

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

    const [showRegPwd, setShowRegPwd] = React.useState(false);
    const [showRegConfirmPwd, setShowRegConfirmPwd] = React.useState(false);
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [pwd, setPwd] = React.useState('')
    const [role, setRole] = React.useState('29')
    const [confirmPwd, setConfirmPwd] = React.useState('')

    const handleRegister = async () => {
        if (!name) {
            toast.error('名前を入力してください。')
        } else if (!email) {
            toast.error('メールアドレスを入力してください。')
        } else if (!phone) {
            toast.error('電話番号を入力してください。')
        } else if (!pwd) {
            toast.error('パスワードを入力してください。')
        } else if (!confirmPwd) {
            toast.error('確認パスワードを入力してください。')
        } else if (pwd !== confirmPwd) {
            toast.error('パスワードが一致しません。')
        } else {
            try {
                const res = await axiosData('/regUser', {
                    name: name,
                    email: email,
                    phone: phone,
                    pwd: pwd,
                    role: role
                })
                if (res) {
                    setAuth(0)
                }
            } catch (error) {
                toast.error('サーバー接続時にエラーが発生しました。')
            }
        }
    }

    const handleRole = (event) => {
        setRole(event.target.value);
      };

    return (
        <Box sx={{ ...styles.container }}>
            <Box sx={{ ...styles.header }}>
                <Typography sx={{ ...styles.title }}>新規登録</Typography>
                <CloseIcon sx={{ ...styles.close }} onClick={() => setOpen(false)} />
            </Box>
            <TextField
                label="名前"
                variant="standard"
                sx={{ ...styles.input }}
                onChange={(event) => setName(event.target.value)}
            />
            <TextField
                label="メールアドレス"
                variant="standard"
                sx={{ ...styles.input }}
                onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
                label="電話番号"
                variant="standard"
                sx={{ ...styles.input }}
                onChange={(event) => setPhone(event.target.value)}
            />
            <FormControl sx={{ ...styles.input }} variant="standard">
                <InputLabel>パスワード</InputLabel>
                <Input
                    type={showRegPwd ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowRegPwd((show) => !show)}
                            >
                                {showRegPwd ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={(event) => setPwd(event.target.value)}
                />
            </FormControl>
            <FormControl sx={{ ...styles.input }} variant="standard">
                <InputLabel>パスワード</InputLabel>
                <Input
                    type={showRegConfirmPwd ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowRegConfirmPwd((show) => !show)}
                            >
                                {showRegConfirmPwd ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={(event) => setConfirmPwd(event.target.value)}
                />
            </FormControl>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={role}
                    onChange={handleRole}
                >
                    {/* seller */}
                    <FormControlLabel value="29" control={<Radio color="secondary"/>} label="売り手" /> 
                    {/* buyer */}
                    <FormControlLabel value="0" control={<Radio color="success"/>} label="買い手" />
                </RadioGroup>
            </FormControl>

            <Button
                variant="contained"
                sx={{ ...styles.button }}
                size='large'
                onClick={handleRegister}
            >新規登録</Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ ...styles.text }}>既にログイン情報をお持ちの方</Typography>
                <Typography
                    sx={{ ...styles.text, cursor: 'pointer' }}
                    onClick={() => setAuth(0)}
                >ログイン</Typography>
            </Box>
        </Box>
    );
}