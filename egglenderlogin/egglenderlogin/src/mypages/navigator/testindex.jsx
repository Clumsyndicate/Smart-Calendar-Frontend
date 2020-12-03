import React, {Component,useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutAct} from '../login/store/creator'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from "@material-ui/core/Popper";
  const StyledBar = withStyles({
    root: {
    //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      background: 'linear-gradient(45deg, #673ab7 30%, #33c9dc 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  })(AppBar);

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    
  });
class TestNavigator extends Component{
    constructor(props) {
        super(props);
        this.state = { anchorEl: null, open: false };
      }
    render(){
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);
        const handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
        };
    
        const handleClose = () => {
        this.setState({ anchorEl: null });
        };

        const renderMenu = (
            <Menu
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open= {this.state.count}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          );
        return(
            <div className={classes.root}>
            <StyledBar position="static">
            <Toolbar>
            <Button color="inherit">
                <Link to='/Homepage' style={{ color: 'white' }}>Home</Link>
            </Button>
            {this.props.loginData.hasLogin ? 
            (
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        >
                        <AccountCircle />
                    </IconButton>
                    <Popper open={open} anchorEl={this.state.anchorEl} transition>
                    <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link to='/myProfile' style={{ color: 'black' }}>Calender</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link className="dropdown-item" href = "logoutAct" onClick={this.props.logoutAct}>Logout</Link>
                        </MenuItem>
                    </Menu>
                    </Popper>
                </div>    
            ) 
            : 
            (
            <div>
            <Button color="inherit">
                <Link to='/login' style={{ color: 'white' }}>login</Link>
            </Button>
            <Button color="inherit">
                <Link to='/myProfile' style={{ color: 'white' }}>ToCalendar</Link>
            </Button>

            </div>
                
            )}







            {/* <Button color="inherit">
                <Link to='/login' style={{ color: 'white' }}>login</Link>
            </Button>
            <Button color="inherit">
                <Link to='/myProfile' style={{ color: 'white' }}>Mycalender</Link>
            </Button>
            <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    >
                    <AccountCircle />
            </IconButton>
            <Popper open={open} anchorEl={this.state.anchorEl} transition>
                <div>
                
                    <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </div>
            </Popper> */}
            
            </Toolbar>
            </StyledBar>
            <renderMenu1/>
            </div>
        )
    }
}


TestNavigator.propTypes = {
    classes: PropTypes.object.isRequired,
  };
const mapStateToProps = state =>
{
    return {
        loginData: state.login
    }
}
export default connect(mapStateToProps,{logoutAct})(withStyles(styles)(TestNavigator))