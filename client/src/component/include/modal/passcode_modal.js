import * as React from 'react'
import { toast } from 'react-toastify'
import { Button, TextField, Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Cookies from 'js-cookie'
import { axiosData } from '../../../util/api'

export default function AuthPasscodeModal({ setAuth, setOpen }) {

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

    const [passCode, setPassCode] = React.useState('')

    const handleGetPassCode = async () => {
        if (Cookies.get('resetEmail')) {
            try {
                await axiosData('/getPassCode', {
                    email: Cookies.get('resetEmail'),
                })
                toast.success('success')
            } catch (error) {
                toast.error('サーバー接続時にエラーが発生しました。')
            }
        } else {
            setAuth(2)
        }
    }

    const handleCheckPassCode = async () => {
        if (!passCode) {
            toast.error('パスコードを入力してください。')
        } else {
            try {
                const res = await axiosData('/checkPassCode', {
                    email: Cookies.get('resetEmail'),
                    passCode: passCode
                })
                if (res) {
                    toast.success('成功しました。')
                    setAuth(4)
                } else {
                    toast.error('パスコードが正しくありません。')
                }
            } catch (error) {
                toast.error('サーバー接続時にエラーが発生しました。')
            }
        }
    }

    return (
        <Box sx={{ ...styles.container }}>
            <Box sx={{ ...styles.header }}>
                <Typography sx={{ ...styles.title }}>パスコード入力</Typography>
                <CloseIcon sx={{ ...styles.close }} onClick={() => setOpen(false)} />
            </Box>
            <TextField
                label="パスコード"
                variant="standard"
                sx={{ ...styles.input }}
                onChange={(event) => setPassCode(event.target.value)}
            />
            <Typography
                sx={{ ...styles.text, cursor: 'pointer' }}
                onClick={handleGetPassCode}
            >再送信</Typography>
            <Button
                variant="contained"
                sx={{ ...styles.button }}
                size='large'
                onClick={handleCheckPassCode}
            >確認</Button>
            <Typography
                sx={{ ...styles.text, display: 'flex', justifyContent: 'end', cursor: 'pointer' }}
                onClick={() => setAuth(0)}
            >ログインに戻る</Typography>
        </Box>
    );
}