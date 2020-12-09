import React, {Component} from 'react'
import classnames  from 'classnames'
import {withRouter} from 'react-router-dom'
import shortid from 'shortid'
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


class Registerf2 extends Component 
{
    state = {
        info: {
        userName: '',
        userEmail: '',
        userPwd: '',
        userPwd2: '',
             
        },
        
        errMessage: [],
    };
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ errMessage: [] });
        console.log(this.state.info)
        // const { data } = await this.props.registerFn.registerAct(
        //   this.state
        // );
        const {data} = await this.props.registerFn.registerAct(this.state.info)
        console.log(data)
        if(data.status === 1)
        {
            console.log(data.msg)
            if(data.msg ==="Username has already existed")
            {
                this.props.noteFn.addNoteAct({
                    type: 'alert-primary',
                    text: 'Username has already existed',
                    id: shortid.generate()
                })
            }
            return this.setState(
                {
                    errMessage:data.msg,
                }
            );
        }
        this.props.history.push("/login")
        this.props.noteFn.addNoteAct({
            type: 'alert-primary',
            text: 'You have successfully Sign up! Now you can login!',
            id: shortid.generate()
        })
    }
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
        const { userName, userEmail, userPwd, userPwd2} = this.state.info;
        const {errMessage}  =this.state;
        const { classes } = this.props;
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    SIGN UP
                    </Typography>
                    <form className={classes.form} onSubmit = {this.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName" 
                        label="User Name"
                        name="username"
                        autoFocus
                        onChange={this.handleInput}
                    />
                     <small id="userNameHelp" className="form-text text-muted">
                            {errMessage[0] === 'userName' && errMessage[1] }
                    </small>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userEmail" 
                        label="User Email"
                        name="userEmail"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleInput}
                    />
                      <small id="userEmailHelp" className="form-text text-muted">
                            {errMessage[0] === 'userEmail' && errMessage[1] }
                    </small>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userPwd" 
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        onChange={this.handleInput}
                    />
                    <small id="userEmailHelp" className="form-text text-muted">
                            {errMessage[0] === 'userPwd' && errMessage[1] }
                    </small>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Confirm Password"
                        type="password"
                        id="userPwd2"
                        onChange={this.handleInput}
                    />
                     <small id="userEmailHelp" className="form-text text-muted">
                            {errMessage[0] === 'userPwd2' && errMessage[1] }
                    </small>
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
                        Sign Up
                    </Button>
                    </form>
                </div>
                </Container>
        )
    }
}
export default withRouter(withStyles(styles)(Registerf2));
