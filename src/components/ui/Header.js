import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}
const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em'
    },
    logo: {
        height: '8em'
    },
    logoContainer: {
        padding: 0
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px'
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginLeft: '50px',
        marginRight: '25px',
        height: '45px',
    },
    menu: {
        backgroundColor: theme.palette.common.arcBlue,
        color: 'white',
        borderRadius: '0px'
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        '&:hover': {
            opacity: 1
        }
    }
}))
export default function Header(props) {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    };
    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null)
        setOpen(false)
        setSelectedIndex(i)
    }
    const handleClose = (e) => {
        setAnchorEl(null);
        setOpen(false)
    };
    const handleChange = (e, value) => {
        setValue(value)
    }
    const menuOptions = [{ name: "Services", link: "/services" }, { name: 'Custom Software Development', link: '/customsoftware' }, { name: 'Mobile App Development', link: '/mobileapps' }, { name: 'Website Development', link: '/websites' }]
    // useEffect() means componentWillMount()
    useEffect(() => {
        const path = window.location.pathname
        switch (path) {
            case "/":
                if (value !== 0)
                    setValue(0)
                break;
            case "/services":
                if (value !== 1)
                    setValue(1)
                break;
            case "/customsoftware":
                if (value !== 1) {
                    setValue(1)
                    setSelectedIndex(0)
                }
                break;
            case "/mobileapps":
                if (value !== 1) {
                    setValue(1)
                    setSelectedIndex(1)
                }
                break;
            case "/websites":
                if (value !== 1) {
                    setValue(1)
                    setSelectedIndex(2)
                }
                break;
            case "/revolution":
                if (value !== 2)
                    setValue(2)
                break;
            case "/about":
                if (value !== 3)
                    setValue(3)
                break;
            case "/contact":
                if (value !== 4)
                    setValue(4)
                break;
            case "/estimate":
                if (value !== 5)
                    setValue(5)
                break;
            default:
                break;
        }
    }, [value])
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' color='primary'>
                    <Toolbar disableGutters={true}>
                        <Button className={classes.logoContainer} component={Link} to='/' onClick={() => setValue(0)}>
                            <img alt='company logo' src={logo} className={classes.logo} />
                        </Button>
                        <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor='primary'>
                            <Tab className={classes.tab} component={Link} to='/' label='Home' />
                            <Tab className={classes.tab} component={Link} to='/services' label='Service' aria-controls='simple-menu' aria-haspopup='true' onMouseOver={handleClick} />
                            <Tab className={classes.tab} component={Link} to='/revolution' label='The Revolution' />
                            <Tab className={classes.tab} component={Link} to='about' label='About Us' />
                            <Tab className={classes.tab} component={Link} to='contact' label='Contact Us' />
                        </Tabs>
                        <Button variant='contained' color='secondary' className={classes.button}>Free Estimate</Button>
                        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} MenuListProps={{ onMouseLeave: handleClose }} classes={{ paper: classes.menu }} elevation={0}>
                            {menuOptions.map((option, i) => (
                                <MenuItem key={i} onClick={(event) => { handleMenuItemClick(event, i); setValue(1); handleClose() }} component={Link} to={option.link} className={classes.menuContainer} classes={{ root: classes.menuItem }} selected={i === selectedIndex && value === 1}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}