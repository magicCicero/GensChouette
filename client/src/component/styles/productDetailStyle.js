export const styles = {
    container: {
        marginTop: '50px',
        marginBottom: '50px'
    },
    grid: {
        width: '100%',
        marginInline: 'auto'
    },
    gridItem1: {
        paddingLeft: '20px !important',
        paddingRight: '20px'
    },
    img: {
        width: '100%',
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
    },
    cardBox: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: 2
    },
    cardReviewTxt: {
        fontSize: '18px',
        fontWeight: 600
    },
    cardReview: {
        display: 'flex',
        alignItems: 'center',
        gap: 2
    },
    cardMark: {
        fontSize: '40px'
    },
    gridItem2: {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '0px !important',
        paddingLeft: '20px !important',
        paddingRight: '20px'
    },
    typeTxt: {
        fontFamily: `"Noto Sans JP", sans- serif !important`,
        color: 'var(--primary)',
        fontSize: {
            xs: '20px',
            md: '40px'
        },
        fontWeight: 600
    },
    reviewBox: {
        display: 'flex',
        alignItems: 'center',
        gap: {
            xs: 1,
            md: 2
        },
        marginTop: '15px'
    },
    reviewTxt: {
        fontSize: {
            xs: '12px',
            md: '18px'
        },
        fontWeight: 600
    },
    reviewSubBox: {
        display: 'flex',
        alignItems: 'center',
        gap: {
            xs: 1,
            md: 2
        }
    },
    cardReviewMark: {
        fontSize: {
            xs: '25px',
            md: '40px'
        }
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'end',
        gap: 2,
        marginTop: '10px'
    },
    price: {
        display: 'flex',
        fontSize: '30px',
        color: '#dc3545',
        lineHeight: '35px !important'
    },
    prePrice: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '18px',
        textDecoration: 'line-through'
    },
    discount: {
        color: '#dc3545'
    },
    sizeTxt: {
        marginTop: '10px',
        fontSize: {
            xs: '12px',
            md: '25px'
        },
        fontWeight: 600
    },
    sizeContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: {
            xs: 1,
            md: 2
        },
        marginTop: '10px'
    },
    size: {
        fontSize: {
            xs: '10px',
            md: '12px'
        },
        border: '1px solid var(--gray)',
        width: 'fit-content',
        padding: {
            xs: '2px',
            md: 1
        }
    },
    infoTxt: {
        marginTop: '20px',
        fontSize: {
            xs: '12px',
            md: '18px'
        },
        fontWeight: 600
    },
    intro: {
        marginTop: '30px',
        fontSize: '13px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'end',
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row'
        }
    },
    button: {
        backgroundColor: 'var(--primary)',
        marginInline: '10px',
        marginTop: '30px'
    }
}