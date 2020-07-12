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
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import logo from '../../assets/logo.svg'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
        marginBottom: '3em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '2em'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1.25em'
        }
    },
    logo: {
        height: '8em',
        [theme.breakpoints.down('md')]: {
            height: '7em'
        },
        [theme.breakpoints.down('xs')]: {
            height: '5.5em'
        }
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
        backgroundColor: theme.palette.common.blue,
        color: 'white',
        borderRadius: '0px'
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        '&:hover': {
            opacity: 1
        }
    },
    drawerIcon: {
        height: '50px',
        width: '50px'
    },
    drawerIconContainer: {
        marginLeft: 'auto',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
        opacity: 1
    }
}))
export default function Header(props) {
    const classes = useStyles()
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true)
    };
    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null)
        setOpenMenu(false)
        setSelectedIndex(i)
    }
    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false)
    };
    const handleChange = (e, newValue) => {
        setValue(newValue)
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
    const tabs = (
        <React.Fragment>
            <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor='primary'>
                <Tab className={classes.tab} component={Link} to='/' label='Home' />
                <Tab className={classes.tab} component={Link} to='/services' label='Service' aria-controls='simple-menu' aria-haspopup='true' onMouseOver={handleClick} />
                <Tab className={classes.tab} component={Link} to='/revolution' label='The Revolution' />
                <Tab className={classes.tab} component={Link} to='about' label='About Us' />
                <Tab className={classes.tab} component={Link} to='contact' label='Contact Us' />
            </Tabs>
            <Button variant='contained' color='secondary' className={classes.button}>Free Estimate</Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={openMenu} onClose={handleClose} MenuListProps={{ onMouseLeave: handleClose }} classes={{ paper: classes.menu }} elevation={0}>
                {menuOptions.map((option, i) => (
                    <MenuItem key={i} onClick={(event) => { handleMenuItemClick(event, i); setValue(1); handleClose() }} component={Link} to={option.link} className={classes.menuContainer} classes={{ root: classes.menuItem }} selected={i === selectedIndex && value === 1}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
    const drawer = (
        <React.Fragment>
            <SwipeableDrawer classes={{ paper: classes.drawer }} disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)} >
                <List disablePadding>
                    <ListItem onClick={() => { setOpenDrawer(false); setValue(0) }} divider button component={Link} to='/' selected={value === 0}>
                        <ListItemText className={value === 0 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography>Home</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => { setOpenDrawer(false); setValue(1) }} divider button component={Link} to='/services' selected={value === 1}>
                        <ListItemText className={value === 1 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography>Services</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => { setOpenDrawer(false); setValue(2) }} divider button component={Link} to='/revolution' selected={value === 2}>
                        <ListItemText className={value === 2 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography>The Revolution</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => { setOpenDrawer(false); setValue(3) }} divider button component={Link} to='/about' selected={value === 3}>
                        <ListItemText className={value === 3 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography>About Us</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => { setOpenDrawer(false); setValue(4) }} divider button component={Link} to='/contact' selected={value === 4}>
                        <ListItemText className={value === 4 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography>Contact Us</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => { setOpenDrawer(false); setValue(5) }} divider button component={Link} to='/estimate' selected={value === 5} className={classes.drawerItemEstimate}>
                        <ListItemText className={value === 5 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography>Free Estimate</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple >
                <MenuIcon className={classes.drawerIcon}>

                </MenuIcon>
            </IconButton>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' color='primary'>
                    <Toolbar disableGutters={true}>
                        <Button className={classes.logoContainer} component={Link} to='/' onClick={() => setValue(0)}>
                            <img alt='company logo' src={logo} className={classes.logo} />
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}