export const styles = {
    section: {
        marginTop: '50px',
        marginBottom: '50px'
    },
    primaryText: {
        fontSize: {
            xs: '20px',
            sm: '25px',
            md: '30px'
        },
        fontFamily: `"Noto Sans JP", sans- serif !important`,
        color: 'var(--primary)'
    },
    slider: {
        container: {
            display: 'flex',
            width: {
                xs: '75%',
                sm: '100%'
            },
            marginInline: 'auto'
        },
        intro: {
            container: {
                width: '95%',
                height: '100%',
                marginInline: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '25px'
            },
            textArea: {
                border: '1px solid var(--gray)',
                padding: '10px',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            },
            text: {
                color: 'var(--primary)',
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 600
            },
            button: {
                backgroundColor: 'var(--primary)',
                width: '100%',
                paddingTop: '15px',
                paddingBottom: '15px',
                fontWeight: 500
            }
        },
        slides: {
            container: {
                width: {
                    xs: '100%',
                    sm: '50%',
                    md: '66%',
                    lg: '75%'
                },
                marginTop: {
                    xs: '30px',
                    sm: '0px'
                }
            }
        }
    },
    introSection: {
        container: {
            display: 'flex',
            width: '100%',
            flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row'
            }
        },
        chdContainer: {
            width: {
                xs: '75%',
                sm: '75%',
                md: '40%'
            },
            paddingInline: '5%',
            marginInline: 'auto'
        },
        textContainer: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            marginTop: {
                xs: '30px',
                sm: '30px',
                md: '0px'
            }
        },
        slider: {
            display: 'flex',
            width: {
                xs: '75%',
                sm: '100%'
            },
            marginInline: 'auto'
        }
    }
}

export const introStyle = {
    box: {
        backgroundColor: 'var(--secondary)',
        paddingTop: '50px'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: {
            md: 'row',
            xs: 'column'
        }
    },
    title: {
        fontSize: {
            sm: '40px',
            xs: '25px'
        },
        fontWeight: '600',
        color: 'var(--black)',
        fontFamily: `"Noto Sans JP", sans- serif !important`,
    },
    leftImg: {
        width: 'calc(50% - 275px)',
        display: {
            xs: 'none',
            lg: 'block',
        },
        marginTop: '50px'
    },
    rightImg: {
        width: {
            lg: 'calc(50% - 275px)',
            md: 'calc(100% - 550px)',
            sm: '550px',
            xs: '80%'
        },
        maxWidth: {
            md: '300px',
            sm: '400px',
            xs: 'auto'
        },
        marginInline: {
            xs: 'auto'
        },
        marginTop: {
            xs: '50px'
        }
    },
    text: {
        fontSize: '11px',
        paddingTop: '15px',
        width: '75%',
        marginInline: 'auto',
        textAlign: 'center',
        fontFamily: `"Noto Sans JP", sans- serif !important`,
    }
}

export const setting1 = {
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    slidesToShow: 3,
    speed: 1000,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
}

export const setting2 = {
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    slidesToShow: 4,
    speed: 1500,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 1
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1
            }
        }
    ]
};