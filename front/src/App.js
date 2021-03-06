import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import auth from "../src/auth.js"
import MediaContainer from "./components/MediaContainer"
import Icon from '@material-ui/core/Icon';




import {amber500, amber700, grey50, grey500} from '@material-ui/core/colors';
import MenuAppBar from './components/MenuAppBar';

var genres = [{'key': 1, 'value': "Terror" },
              {'key': 2, 'value': "Science Fiction"},
              {'key': 3, 'value': 'Action'},
              {'key': 4, 'value': 'Comedy'},
              {'key': 5, 'value': 'All'}
            ]
class App extends Component {
  state ={
    auth: null,
    username: "",
    password:"",
    confirmed_password: "",
    authConfirmed: false,
    series: null,
    search: null,
    genre: "All",
    updateComponent: false,
    mode: "Browse",
    menuShow: false

  }

  componentDidMount = () => {
    const user = localStorage.getItem("user");
    this.setState({auth:user})
    if(user != null){
      this.setState({authConfirmed:true})
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  registerRequest = () => {
    if(this.state.confirmed_password === this.state.password){
      auth.register(this.state.username, this.state.password,(result) => {
          localStorage.setItem("user", result);
          this.setState({auth:result, password: "", confirm_password: "", authConfirmed:true});

      });
    }
  }

  deleteUser = () => {
    auth.deleteUser(this.state.username, (result) => {
      console.log("deleted user");
    });
    this.setState({auth: null, authConfirmed: false})
  }

  loginRequest = () => {
    auth.login(this.state.username, this.state.password,(result) => {
        if(result != 0){
          // console.log(result)
          localStorage.setItem("user", result);
          this.setState({auth: result, password: "", authConfirmed:true});
        }
    });
  }

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  handleLogout = () => {
    this.setState({auth: null, authConfirmed: false})
  }

  listSeriesRequest = () => {
    
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,  updateComponent: false
    });

  };

  searchShows = () => {
    this.setState({updateComponent: true})
    // this.setState({search: "", genre: ""})
  }

  onChangeMode = (event) => {
    // console.log(event.currentTarget.id)
    this.setState({mode: event.currentTarget.id})
    this.setState({menuShow: false})
    // this.setState({mode:})
  }

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
            type="password"
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
            type="password"
            label="Password"
            value={this.state.password}
            style={formStyle}
            onChange={this.handleChange('password')}
            margin="normal"/>

          <TextField
            id="confirmed_password"
            type="password"
            label="Confirm password"
            value={this.state.confirm_password}
            style={formStyle}
            onChange={this.handleChange('confirmed_password')}
            margin="normal"/>
          <Button  variant="contained" color="primary" style={styleButton} onClick={this.registerRequest}>Register</Button>
        </Paper>
      )
    };

     

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
      <MenuAppBar auth={this.state.authConfirmed} menu={this.state.menuShow} handleLogout={this.handleLogout} mode={this.state.mode} onChangeMode={this.onChangeMode}/>
      {/* {this.state.mode === "Browse"?
        <div>
        <div style={{marginLeft:'5%',
          marginRight:'5%'}}>
  
          
  
          <TextField
            id="error"
            placeholder="Search"
            value={this.state.search}
            onChange={this.handleChange('search')}
            style={{marginRight: 50}}
            // wish = {plz no two lines, thx}
          />
          <TextField
            id="select-currency-native"
            select
            value={this.state.genre}
            onChange={this.handleChange('genre')}
            SelectProps={{
              native: true,
            }}
            helperText="Please select the genre"
            margin="normal"
            style={{height: "50%"}}
            >
            {genres.map(option => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </TextField>
  
          <Button variant="contained" color="primary" style={{marginLeft:"2%"}} onClick={this.searchShows} >
            Search
          </Button>
          </div>
  
          <div style={{padding:20, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
            <MediaContainer search={this.state.search} genre={this.state.genre} update={this.state.updateComponent} user={this.state.auth} mode={this.state.mode}/> 
          </div>
          </div>
      :
          <div>
          <div style={{marginLeft:'5%',
            marginRight:'5%'}}>

          </div>

        <div style={{padding:20, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
          <MediaContainer search={""} genre={""} update={this.state.updateComponent} user={this.state.auth} mode={this.state.mode}/> 
        </div>
        </div>
      
      
      
      
      } */}
      
      

      </div>
    );
  }

   app (){
    if(this.state.mode === 'Browse'){
      return(
        <div >
          <MenuAppBar auth={this.state.authConfirmed} menu={this.state.menuShow} handleLogout={this.handleLogout} mode={this.state.mode} onChangeMode={this.onChangeMode}/>
        <div>
        <div style={{marginLeft:'5%',
          marginRight:'5%'}}>
          <TextField
            id="error"
            placeholder="Search"
            value={this.state.search}
            onChange={this.handleChange('search')}
            style={{marginRight: 50}}
            // wish = {plz no two lines, thx}
          />
          <TextField
            id="select-currency-native"
            select
            value={this.state.genre}
            onChange={this.handleChange('genre')}
            SelectProps={{
              native: true,
            }}
            helperText="Please select the genre"
            margin="normal"
            style={{height: "50%"}}
            >
            {genres.map(option => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </TextField>
  
          <Button variant="contained" color="primary" style={{marginLeft:"2%"}} onClick={this.searchShows} >
            Search
          </Button>
          </div>
  
          <div style={{padding:20, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
            <MediaContainer search={this.state.search} genre={this.state.genre} update={this.state.updateComponent} user={this.state.auth} mode={this.state.mode}/> 
          </div>
          </div>
          </div>

      )
    }
    else if(this.state.mode === 'Profile'){
      return(
        <div style={{alignContent:'center', justifyContent:'center'}}>
          <MenuAppBar auth={this.state.authConfirmed} menu={this.state.menuShow} handleLogout={this.handleLogout} mode={this.state.mode} onChangeMode={this.onChangeMode}/>
          {/* <Paper style={{backgroundColor: grey50, textAlign: 'center', marginTop: '10%', width:200, height:200}} zDepth={2}> */}
         <span>Username: {this.state.username}</span>
         <br></br>
         <span>ID: {this.state.auth}</span>
         <br></br>
         <Button variant="contained" color="secondary" style={{marginLeft:"2%"}} onClick={this.deleteUser}>
          DELETE BUTTON
         </Button>
         {/* </Paper> */}
        </div>
      )
    }
    else{
      return(
        <div >
          <MenuAppBar auth={this.state.authConfirmed} menu={this.state.menuShow} handleLogout={this.handleLogout} mode={this.state.mode} onChangeMode={this.onChangeMode}/>
        <div>
        <div style={{marginLeft:'5%',
          marginRight:'5%'}}>

        </div>

      <div style={{padding:20, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
        <MediaContainer search={""} genre={""} update={this.state.updateComponent} user={this.state.auth} mode={this.state.mode}/> 
      </div>
      </div>
      </div>
      )
    }
  };
  
  render(){
    if(this.state.auth === null || this.state.auth === 'undefined'){
      return(
        this.renderLogin()
        );
      }
      else{
        return(this.app());
      }
  }
}

export default App;




