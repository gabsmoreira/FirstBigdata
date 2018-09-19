import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
    menuChoice: null,
    option: "Browse"
  };

  componentWillReceiveProps = (nextProps) => {
    this.state.menuChoice = nextProps.menu
  }


  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuChoice = event => {
    this.setState({ menuChoice: event.currentTarget});

  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeMenuChoice = (event) => {
    this.setState({ menuChoice: null, option: event.currentTarget.id});
  };

  handleLogout = () => {
    this.setState({ auth: false });
  };

  render() {
    const { classes } = this.props;
    const  anchorEl = this.state.anchorEl;
    const menuChoice = this.state.menuChoice
    const open = Boolean(anchorEl);
    const openMenu = Boolean(menuChoice)

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton}
                color="inherit" 
                aria-label="Menu" 
                aria-owns={openMenu ? 'menu-choice' : null}
                aria-haspopup="true"
                onClick={this.handleMenuChoice}
                color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-choice"
              anchorEl={menuChoice}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openMenu}
              onClose={this.handleClose}>
                <MenuItem onClick={this.props.onChangeMode} id="Browse">Browse</MenuItem>
                <MenuItem onClick={this.props.onChangeMode} id="Seen">Seen</MenuItem>
              </Menu>


            <Typography variant="title" color="inherit" className={classes.flex}>
              {this.props.mode}
            </Typography>
            {this.props.auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem id='Profile' onClick={this.props.onChangeMode}>Profile</MenuItem>
                  <MenuItem onClick={this.props.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);