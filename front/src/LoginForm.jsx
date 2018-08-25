import React, { Component } from 'react';
import Paper from '@material-ui/Paper';
import TextField from '@material-ui/TextField';
import {Tabs, Tab} from '@material-ui/Tabs';
import Slider from '@material-ui/Slider';
import RaisedButton from '@material-ui/RaisedButton';
import './css/materialize.css'
import auth from './auth';

import {amber500,amber700, blue500, grey300, grey400, grey200, grey600, grey800, grey900, grey500, grey50} from '@material-ui/styles/colors';





class LoginForm extends Component {
    constructor(props){
    super(props);
    this.state = {
      error : '',
      login : true,
      image: './img/metting.jpg',
      colorLoginTab: grey500,
      colorRegisterTab:grey500,
      textFields : {
        email : '',
        password : '',
        name : ''
      }
    }
  }

  registerRequest = () => {
      console.log("REQUESTANDO A REGISTERACAO DOS BANG dscds");
      auth.register(this.state.textFields.email, this.state.textFields.password, this.state.textFields.name,(result) => {
        this.setState({auth: result});
        localStorage.setItem("user", result);
      })
  }

  loginRequest = () => {
    auth.login(this.state.textFields.name, this.state.textFields.password,(result) => {
        this.setState({auth: result});
        localStorage.setItem("user", result);
    })
}

  handleTextChange = (event) => {
    let text = this.state.textFields
    this.setState({ ...this.state, textFields: 
      { ...this.state.textFields,[event.target.id] : event.target.value }}
    )
  }


  

    render() {

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
        }
        const styleButton={
            color: amber700,
            margin:12,
            width:'15%',
            marginLeft: '5%'
        }

        return (
            <div className="LoginForm row">
                <div className="col s12 m2 l2"></div>
                <div className="col s12 m8 l8">
                <Paper style={style} zDepth={2}>
                <Tabs inkBarStyle={{background:amber700}}>
                    <Tab label="Login" style={{backgroundColor: this.state.colorLoginTab}} >
                        <div>
                        <TextField
                            style={formStyle}
                            floatingLabelText="Username"
                            hintText=""
                            id = 'name'
                            underlineFocusStyle={{borderColor: amber700}}
                            floatingLabelShrinkStyle={{color:amber700}}
                            onChange={this.handleTextChange}/>
                        
                        
                        <TextField
                            style={formStyle}
                            floatingLabelText="Password"
                            hintText=""
                            id='password'
                            type="password"
                            underlineFocusStyle={{borderColor: amber700}}
                            floatingLabelShrinkStyle={{color:amber700}}
                            onChange={this.handleTextChange}/>
                        <RaisedButton label="Login" style={styleButton} backgroundColor={amber500} onClick={this.loginRequest}/>
                        </div>
                    </Tab>
                    <Tab label="Register" style={{backgroundColor:this.state.colorRegisterTab}} >
                        <div>
                        <TextField
                            style={formStyle}
                            floatingLabelText="Email"
                            hintText=""
                            id='email'
                            underlineFocusStyle={{borderColor: amber700}}
                            floatingLabelShrinkStyle={{color:amber700}}
                            onChange={this.handleTextChange}/>
                            
                        <TextField
                            style={formStyle}
                            floatingLabelText="Username"
                            hintText=""
                            id='name'
                            underlineFocusStyle={{borderColor: amber700}}
                            floatingLabelShrinkStyle={{color:amber700}}
                            onChange={this.handleTextChange}/>
                        <TextField
                            style={formStyle}
                            floatingLabelText="Password"
                            hintText=""
                            id='password'
                            type="password"
                            underlineFocusStyle={{borderColor: amber700}}
                            floatingLabelShrinkStyle={{color:amber700}}
                            onChange={this.handleTextChange}/>
                        <RaisedButton label="Register" style={styleButton} backgroundColor={amber500} onClick={this.registerRequest}/>

                        </div>
                    </Tab>
                </Tabs>
                </Paper>
                </div>
                <div className="col s12 m2 l2"></div>


             </div>
        );
    }
}

export default LoginForm;
