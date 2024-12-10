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
        paddingRight: '20px',
        paddingTop: '0 !important'
    },
    gridItem2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '0px !important',
        paddingLeft: '20px !important',
        paddingRight: '20px'
    },
    paper: {
        padding: "1rem"
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
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
}