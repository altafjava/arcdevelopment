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
        '& .MuiListItemText-root': {
            opacity: 1
        }
    },
    appBar: {
        zIndex: theme.zIndex.modal + 1
    }
}))
export default function Header(props) {
    const classes = useStyles()
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
    const theme = useTheme()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true)
    };
    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null)
        setOpenMenu(false)
        props.setSelectedIndex(i)
    }
    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false)
    };
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
    const menuOptions = [{ name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 }, { name: 'Custom Software Development', link: '/customsoftware', activeIndex: 1, selectedIndex: 1 }, { name: 'Mobile App Development', link: '/mobileapps', activeIndex: 1, selectedIndex: 2 }, { name: 'Website Development', link: '/websites', activeIndex: 1, selectedIndex: 3 }]
    const routes = [{ name: "Home", link: "/", activeIndex: 0 }, { name: "Services", link: "/services", activeIndex: 1, ariaOwns: anchorEl ? 'simple-menu' : undefined, ariaHaspopup: anchorEl ? true : undefined, mouseOver: event => handleClick(event) }, { name: "The Revolution", link: "/revolution", activeIndex: 2 }, { name: "About Us", link: "/about", activeIndex: 3 }, { name: "Contact Us", link: "/contact", activeIndex: 4 }]
    // useEffect() means componentWillMount()
    //when browser refresh then check setValue to required tab
    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (props.value !== route.activeIndex) {
                        props.setValue(route.activeIndex)
                        if (route.selectedIndex && route.selectedIndex !== props.selectedIndex)
                            props.setSelectedIndex(route.selectedIndex)
                    }
                    break;
                case '/estimate':
                    if (props.value !== 5)
                        props.setValue(5)
                    break;
                default:
                    break;
            }
        })
    }, [props.value, menuOptions, routes, props.selectedIndex, props])
    const tabs = (
        <React.Fragment>
            <Tabs value={props.value === undefined || props.value === 5 ? false : props.value} onChange={handleChange} className={classes.tabContainer} indicatorColor='primary'>
                {routes.map((route, i) => (
                    <Tab key={i} className={classes.tab} component={Link} to={route.link} label={route.name} aria-owns={route.ariaOwns} aria-haspopup={route.ariaHaspopup} onMouseOver={route.mouseOver} />
                ))}
            </Tabs>
            <Button variant='contained' color='secondary' className={classes.button} component={Link} to='/estimate' onClick={() => handleChange(5)}>Free Estimate</Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={openMenu} onClose={handleClose} MenuListProps={{ onMouseLeave: handleClose }} classes={{ paper: classes.menu }} elevation={0} style={{ zIndex: 1302 }}>
                {menuOptions.map((option, i) => (
                    <MenuItem key={`${option}${i}`} onClick={(event) => { handleMenuItemClick(event, i); props.setValue(1); handleClose() }} component={Link} to={option.link} className={classes.menuContainer} classes={{ root: classes.menuItem }} selected={i === props.selectedIndex && props.value === 1}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
    const drawer = (
        <React.Fragment>
            <SwipeableDrawer classes={{ paper: classes.drawer }} disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)} >
                <div className={classes.toolbarMargin} />
                <List disablePadding className={classes.appBar}>
                    {routes.map(route => (
                        < ListItem key={`${route}${route.activeIndex}`} onClick={() => { setOpenDrawer(false); props.setValue(route.activeIndex) }} divider button component={Link} to={route.link} selected={props.value === route.activeIndex} classes={{ selected: classes.drawerItemSelected }}>
                            <ListItemText className={classes.drawerItem} disableTypography>{route.name}</ListItemText>
                        </ListItem>
                    ))}
                    <ListItem onClick={() => { setOpenDrawer(false); setValue(5) }} divider button component={Link} to='/estimate' selected={props.value === 5} classes={{ selected: classes.drawerItemSelected, root: classes.drawerItemEstimate }} >
                        <ListItemText className={classes.drawerItem} disableTypography>Free Estimate</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple >
                <MenuIcon className={classes.drawerIcon}>
                </MenuIcon>
            </IconButton>
        </React.Fragment >
    )
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' color='primary' className={classes.appBar}>
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