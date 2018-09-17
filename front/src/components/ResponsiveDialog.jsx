import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    this.state.open = nextProps.open;
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    // const { fullScreen } = this.props;
    console.log(this.props.data)
    return (
      <div>
        {/* <Button onClick={this.handleClickOpen}>Open responsive dialog</Button> */}
        <Dialog
          // fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.props.data.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span>
                Name: {this.props.data.name}
              </span>
              <br></br>
              <span>
                Actors: {this.props.data.score}
              </span>
              <br></br>
              <span>
                Producer: {this.props.data.idProducer}
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);