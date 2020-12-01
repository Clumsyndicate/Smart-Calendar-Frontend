import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../utils/request";
import shortid from 'shortid';
import decoder from 'jwt-decode'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });


class LoginF2 extends Component 
{
    state = {
        info: {
        userName: '',
        userPwd: '',      
        },
        
        errMessage: [],
    };
    handleSubmit = async e => {
        e.preventDefault();
        const {data} =await this.props.loginFn.loginAct(this.state.info);
        if(data.status===1)
        {
            this.props.noteFn.addNoteAct({
                type: 'alert-primary',
                text: 'Incorrect username or password!',
                id: shortid.generate()
            })
        }
        if(data.status===0)
        {
            localStorage.setItem('storeTOKEN', data.mytoken)
            this.props.loginFn.syncInfoAct(decoder(data.mytoken))
            this.props.history.push('/myProfile')
            this.props.noteFn.addNoteAct({
                type: 'alert-primary',
                text: 'You have successfully login!',
                id: shortid.generate()
            })
        }
        // console.log(data);
    };
    handleInput = data =>
    {
        this.setState({
            info:{
                ...this.state.info,
                [data.target.id]:data.target.value
            }
            
        });
    }
    render(){
        const { userName,  userPwd,} = this.state.info;
        const { classes } = this.props;
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <form className={classes.form} onSubmit = {this.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName" 
                        label="User Name"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleInput}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="userPwd"
                        autoComplete="current-password"
                        onChange={this.handleInput}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                        Don't have an account?
                        <Button color="inherit">
                            <Link to='/register' style={{ color: 'Black' }}>Signup</Link>
                        </Button>
                        </Grid>
                    </Grid>
                    </form>
                </div>
                </Container>
        )
    }
}
export default withRouter(withStyles(styles)(LoginF2));
