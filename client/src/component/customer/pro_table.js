import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Container, Pagination, Rating, Typography } from '@mui/material'
import { axiosData, fetchData } from '../../util/api'
import { filterItems, displayText } from '../../util/filterItems'
import ProductModal from './pro_modal'
import Cookies from 'js-cookie'

const columns = [
    { value: 'id', minW: '20px' },
    { value: 'はじめに', minW: '60px' },
    { value: 'はじめに', minW: '60px' },
    { value: 'ブランド', minW: '60px' },
    { value: 'サイズ', minW: '45px' },
    { value: 'カスタマーレビュー', minW: '130px' },
    { value: 'カテゴリー', minW: '75px' },
    { value: 'ジェンダー', minW: '75px' },
    { value: 'フィットタイプ', minW: '100px' },
    { value: 'ライフスタイル', minW: '100px' },
    { value: '価格', minW: '30px' },
    { value: '以前の価格', minW: '75px' },
    { value: 'ディスカウント', minW: '100px' },
    { value: '', minW: '10px' },
    {value: '', minW: '10px'}
]

function ProTable() {
    const [page, setPage] = useState(1);
    const [proData, setProData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState('')
    useEffect(() => {
        getData()
    }, [page]);

    useEffect(() => {
        if (!open) {
            getData()
        }
    }, [open])

    const getData = async () => {
        try {
            const result = await axiosData('/getProductByUserID', {
                userID: Cookies.get("userID"),
                page: page,
                count: 10
            });

            setProData(result.result)
            setTotalPages(result.totalPage)
        } catch (err) {
            toast.error('サーバー接続時にエラーが発生しました。')
        }
    }

    const handleChange = (event, value) => {
        setPage(value);
        getData();
    };

    const editProductHandler = async (id) => {
        setEditData(proData[id])
        setOpen(true)
    }

    const removeProductHandler = async (id) => {
        const res = await axiosData('/deleteProduct', {
            id: id
        })
        if (res) {
            getData()
        } else {
            toast.error('サーバー接続時にエラーが発生しました。')
        }
    }

    return (
        <Container sx={{ paddingBottom: '50px' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map((element, idx) => (
                                        <TableCell sx={{ backgroundColor: 'var(--gray)', minWidth: element.minW, textAlign: 'center' }} key={idx}>
                                            {element.value}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {proData.length ?
                                (
                                    proData.map((element, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell sx={{ textAlign: 'center' }}>{((page - 1) * 10) + idx + 1}</TableCell>
                                            <TableCell sx={{ width: '80px' }}>
                                                <img src={'/assets/img/products/' + element.img} style={{ width: '80px' }}></img>
                                            </TableCell>
                                            <TableCell>{element.intro.slice(0, 10)}...</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{element.brand}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                                                    {
                                                        JSON.parse(element.size).map((ele, jdx) => (
                                                            ele ?
                                                                <Typography sx={{ minWidth: '35px' }} key={jdx}>{filterItems.size.value[jdx]}</Typography>
                                                                :
                                                                null
                                                        ))
                                                    }
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Rating value={element.review} readOnly precision={0.5} />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{displayText[element.type]}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{displayText[element.sex]}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{displayText[element.matchType]}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{displayText[element.casual]}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>¥{element.price}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {
                                                    element.preprice ?
                                                        "¥" + element.preprice
                                                        :
                                                        <Typography>-</Typography>
                                                }
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {
                                                    element.preprice ?
                                                        Math.floor((element.preprice - element.price) * 100 / element.preprice) + '%' :
                                                        <Typography>-</Typography>
                                                }
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <EditIcon sx={{
                                                    cursor: 'pointer',
                                                }}
                                                    onClick={() => editProductHandler(idx)}

                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <DeleteIcon sx={{
                                                    color: '#d34444',
                                                    cursor: 'pointer',
                                                }}
                                                    onClick={() => removeProductHandler(element.id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                                :
                                <TableRow>
                                    <TableCell
                                        colSpan={14}
                                        sx={{
                                            fontFamily: '"Noto Sans JP", sans- serif !important',
                                            fontSize: '17px',
                                            paddingTop: '20px',
                                            paddingBottom: '20px',
                                            letterSpacing: '10px'
                                        }}
                                    >
                                        資料がありません!
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    proData.length === 0 ?
                        null
                        :
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChange}
                            sx={{
                                width: 'fit-content',
                                marginInline: 'auto',
                                marginTop: '15px',
                                marginBottom: '15px'
                            }}
                        />
                }
                <ProductModal open={open} setOpen={setOpen} modalType="edit" value={editData} />
            </Paper>
        </Container>
    );
}

export default ProTable;
