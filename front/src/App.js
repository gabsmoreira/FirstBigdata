import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import auth from "../src/auth.js"
import MediaContainer from "./components/MediaContainer"



import {amber500, amber700, grey50, grey500} from '@material-ui/core/colors'
 
class App extends Component {
  state ={
    auth: null,
    username: "",
    password:"",
    confirmed_password: ""

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  registerRequest = () => {
    if(this.state.confirmed_password === this.state.password){
      auth.register(this.state.username, this.state.password,(result) => {
          this.setState({auth: result});
          localStorage.setItem("user", result);
          this.setState({auth:result, username: "", password: "", confirm_password: ""});

      });
    }
  }

  loginRequest = () => {
    auth.login(this.state.username, this.state.password,(result) => {
        console.log(result)
        this.setState({auth: result});
        localStorage.setItem("user", result);
        this.setState({auth:result});
    });
  }

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  

  renderLogin() {
    const loginf = () => {
      return(
      <Paper style={style} zDepth={2}>
        <TextField
          id="username"
          label="Username"
          value={this.state.name}
          style={formStyle}
          onChange={this.handleChange('username')}
          margin="normal"/>
          <TextField
            id="password"
            label="Password"
            value={this.state.password}
            style={formStyle}
            onChange={this.handleChange('password')}
            margin="normal"/>
          <Button  variant="contained" color="primary" style={styleButton} onClick={this.loginRequest}>Login</Button>
        </Paper>
      )
    }

    const registerf = () => {
      return(
      <Paper style={style} zDepth={2}>
        <TextField
          id="username"
          label="Username"
          value={this.state.name}
          style={formStyle}
          onChange={this.handleChange('username')}
          margin="normal"/>
          <TextField
            id="password"
            label="Password"
            value={this.state.password}
            style={formStyle}
            onChange={this.handleChange('password')}
            margin="normal"/>

          <TextField
            id="confirmed_password"
            label="Confirm password"
            value={this.state.confirm_password}
            style={formStyle}
            onChange={this.handleChange('confirmed_password')}
            margin="normal"/>
          <Button  variant="contained" color="primary" style={styleButton} onClick={this.registerRequest}>Register</Button>
        </Paper>
      )
    }

    



    const style = {
      backgroundColor: grey50,
      textAlign: 'center',
      marginTop: '10%'
    };

    const formStyle={
        width:'90%',
        marginLeft:'5%',
        marginRight:'5%',
        marginTop:'2.5%',
        marginBottom:'2.5%',
    };
    const styleButton={
        margin:12,
        width:'15%',
        // marginLeft: '5%'
    };

    const { value } = this.state;
    return (
      
      <div className="LoginForm row">
      <div className="col s12 m2 l2"></div>
      <div className="col s12 m8 l8">
      <Tabs value={value} onChange={this.handleChangeTab}>
      <Tab label="Login" />
      <Tab label="Register" />
      </Tabs>

      {value === 0 && loginf()}
      {value === 1 && registerf()}

        
      </div>
      </div>

    );
  }
  
  renderApp(){
    return(
      <div >
        <div style={{padding:20, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
          <MediaContainer   /> 
        </div>

      </div>
    );
  }

  render(){
      if(this.state.auth === null || this.state.auth === 'undefined'){
        return(
          this.renderLogin()
        );
      }
      else{
        return(this.renderApp());
      }
  }
}

export default App;




