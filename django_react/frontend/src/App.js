import './index.css';
import BellIcon from './icons/bell.svg';
import MessengerIcon from './icons/messenger.svg';
import CaretIcon from './icons/caret.svg';
import PlusIcon from './icons/plus.svg';
import dataProfile from "../DataFetching";
import dataProject from "./dataProject";
import dataClubs from './dataClubs';
import dataDepartment from './dataDepartment';
import DropdownMenu from "../DropDown";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ExplorePage from "./components/ExplorePage";
import ProfileOne from "./components/ProfileOne";
import ProfileSelf from "./components/MyProfile/ProfileSelf";
import ScrollableTabsButtonForce from "./components/tabs";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Friend from "./components/PostTab/Friend";
import {
  MotionScene,
  MotionScreen,
  SharedElement,
  useMotion
} from "react-motion-layout";
import { MotionLayoutProvider } from "react-motion-layout";
import axios from 'axios';
import ProjectTab from './components/uProjectTab/ProjectTab';
import Project from './components/project/Project';
import Feed from './components/feed';
import Club from './components/Club/Club';
import Department from './components/Department/Department';
import ExploreIcon from '@material-ui/icons/Explore';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CreatePostModal from './CreatePostModal';

function getProfile(id){
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
      const str = "/api/profiles/" + id
      axios.get(str)
          .then(res =>{
              console.log(res)
              setProfiles(res.data)
          })
          .catch(err => {
              console.log(err)
          })
  }, [])
  return (
                  profiles
                  /*profiles.map(profile => {
                    const {major, day, experienceOne, experienceTwo, experienceThree,
                          experienceFour, experienceFive, skillOne, skillTwo, SkillThree,
                          skillFour, skillFive, name, goalOne, goalTwo, goalThree,
                          goalOneDesc, goalTwoDesc, goalThreeDesc, meetMe, lookFor} = profile;
                    })*/
  )
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function UserGreeting() {
  const p = getProfile(window.REP_LOG_APP_PROPS.id)
  return (
    <div>
      <Typography>
        Welcome, {p.firstName}
      </Typography>
    </div>
  )
}

function GuestGreeting(){
  return(
    <div>
      <Typography>
        Welcome. 
        <Button variant='outlined' href="/login" color="primary">
          Login
        </Button>
      </Typography>

    </div>
  )
}
function Greeting() {
  const isLoggedIn = getProfile(window.REP_LOG_APP_PROPS.id);
  if (isLoggedIn != undefined) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}


function App() {
  /*const data123 = JSON.parse(window._DEFAULT_DATA);*/
  const p = getProfile(window.REP_LOG_APP_PROPS.user_id)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [NavAnchorEl, setNavAnchorEl] = React.useState(null);
  const [AnchorAddEl, setAnchorAddEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isAddMenuOpen = Boolean(AnchorAddEl);
  const isNavMenuOpen = Boolean(NavAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [hoverE, setHoverE] = React.useState(null);
  const [hoverF, setHoverF] = React.useState(null);
  const handlePopoverOpenExplore = (event) => {
    setHoverE(event.currentTarget);
  };

  const handlePopoverCloseExplore = () => {
    setHoverE(null);
  };
  const handlePopoverOpenFeed = (event) => {
    setHoverF(event.currentTarget);
  };

  const handlePopoverCloseFeed = () => {
    setHoverF(null);
  };

  const openF = Boolean(hoverF);
  const openE = Boolean(hoverE);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddMenuOpen = (event) => {
    setAnchorAddEl(event.currentTarget);
  };
  const handleNavMenuOpen = (event) => {
    setNavAnchorEl(event.currentTarget);
  };
  const handleNavMenuClose = (event) => {
    setNavAnchorEl(null);
  };
  const handleAddMenuClose = (event) => {
    setAnchorAddEl(null);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
  
    
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to={`/p/self/${p.id}`}>My Profile</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/project/1">My Projects</Link></MenuItem>
    </Menu>
  );
  const navMenuId = 'primary-search-account-menu-nav';

  const renderMenuAdd = (
    <Menu
    AnchorAddEl={AnchorAddEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isAddMenuOpen}
    onClose={handleAddMenuClose}
  >
    <MenuItem onClick={handleAddMenuClose}><CreatePostModal /></MenuItem>
    <MenuItem onClick={handleAddMenuClose}><Link to="/">Chat with Someone</Link></MenuItem>
    <MenuItem onClick={handleAddMenuClose}><Link to="/">Add a Friend</Link></MenuItem>
    <MenuItem onClick={handleAddMenuClose}><Link to="/">Start a Project</Link></MenuItem>
    <MenuItem onClick={handleAddMenuClose}><Link to="/">Start a Club</Link></MenuItem>
    <MenuItem onClick={handleAddMenuClose}><Link to="/">Create a Department</Link></MenuItem>
  </Menu>
  );
  const renderMenuNav = (
    <Menu
      NavAnchorEl={NavAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={navMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isNavMenuOpen}
      onClose={handleNavMenuClose}
    >
      <MenuItem onClick={handleNavMenuClose}><Link to="/logout">Logout</Link></MenuItem>
      <MenuItem onClick={handleNavMenuClose}><Link to="/">Home</Link></MenuItem>
      <MenuItem onClick={handleNavMenuClose}><Link to="/">Settings</Link></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Greeting />
      <MenuItem onClick={handleProfileMenuOpen}>
        <Greeting />
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>


      <MenuItem onClick={handleNavMenuOpen}>
      <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu-nav"
          aria-haspopup="true"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <p>Menu</p>
      </MenuItem>
      <MenuItem>
      <IconButton aria-owns={openE ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpenExplore}
          onMouseLeave={handlePopoverCloseExplore} color="inherit">
        <ExploreIcon />
      </IconButton>

      
      </MenuItem>

    </Menu>
  );

  return (
    <Router>
    <div className="App">
      <Navbar>
      <AppBar position="absolute">
        <Toolbar variant='dense'>
          <IconButton
              edge="start"
              aria-label="account of current user"
              aria-controls={navMenuId}
              aria-haspopup="true"
              onClick={handleNavMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            The Candle
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Greeting />
              <AccountCircle />
            </IconButton>
            <MenuItem>
              <IconButton
               edge="end"
               aria-label="account of current user"
               aria-controls={menuId}
               aria-haspopup="true"
               onClick={handleAddMenuOpen}
               color="inherit">
                <AddIcon />
              </IconButton>
            </MenuItem>
          <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

      <IconButton aria-owns={openE ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpenExplore}
          onMouseLeave={handlePopoverCloseExplore} color="inherit">
       <Link color='white' to='/explore'><ExploreIcon /></Link>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openE}
          hover={hoverE}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handlePopoverCloseExplore}
          disableRestoreFocus
        >
        <Typography>Explore Page</Typography>
        </Popover>
      </IconButton>
      <IconButton aria-owns={openF ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpenFeed}
          onMouseLeave={handlePopoverCloseFeed} color="inherit">
        <Link color='inherit' to={`/feed/${p.id}`}><DynamicFeedIcon /></Link>
        
        
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openF}
          hover={hoverF}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handlePopoverCloseFeed}
          disableRestoreFocus
        >
        <Typography>Feed</Typography>
        </Popover>
      </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>

          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          </Toolbar>
          </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {renderMenuNav}
        {renderMenuAdd}
      </Navbar>
      <MotionLayoutProvider>
      <Switch>
          <Route path="/about">
            <About />

          </Route>
          <Route path="/explore">
            <ExplorePage 
              />
          </Route>
          <Route path="/friend/:friendId">
            <Friend />
          </Route>
          <Route path="/feed/:id">
            <Feed />
          </Route>
          <Route path="/department/:id">
            <Department />
          </Route>
          <Route path="/club/:id" component={dataClubs}>
            <Club />
          </Route>
          <Route path="/editprofile">
            <h1>Edit Profile</h1>
          </Route>
          <Route exact path="/p/:id" component={dataProfile}>
            <ProfileOne
            /*name='hello'
            description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            followers = '245'
            following = {window.REP_LOG_APP_PROPS.cat}
            major={profile1.Major}
            company={profile1.company}
            year='2023'
            day='Saturday Afternoons'
            experienceOne='Leader of non-violent independence movement against British rule'
            experienceTwo='Organized boycotts against British institutions in peaceful forms of civil disobedience'
            experienceThree='Formed Natal Indian Congress in 1894 to fight discrimination'*/
            />
          </Route>
          <Route exact path="/p/self/:id" component={dataProfile}>
            <ProfileSelf
                        />
          </Route>
          <Route exact path="/project/:id" component={dataProject}>
            <Project />
          </Route>
        </Switch>
        </MotionLayoutProvider>
    </div>
    </Router>
    
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}


function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}





export default App;

/*const container = document.getElementById("app");
render(<App />, container); */

