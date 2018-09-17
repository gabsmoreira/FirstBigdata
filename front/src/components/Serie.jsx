import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRatingComponent from 'react-star-rating-component';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import auth from '../auth';
import Paper from '@material-ui/core/Paper';




class Serie extends Component {
    constructor(props){
    super(props);
    this.state = {
        rating: this.props.film.score,
        open: false,
        seen: false,
        imgStyle: null,
        hover: 4,
    }
  }
  
    componentWillMount = () => {
        console.log(this.props.film.name);
        this.state.rating = 0;
  }

  handleRating = (value) =>{
      console.log(value)
      this.setState({rating: value})
      // fazer request para mudar rating da serie

  }

  onClickImage = () => {
      this.setState({open: true})
      auth.checkSeen(localStorage.getItem('user'), this.props.film.id, (result) =>{
          this.setState({seen: result});
      })

  }

  hasSeen = () =>{
      this.setState({seen: true});
      auth.hasSeen(localStorage.getItem('user'), this.props.film.id, this.state.rating, (result) =>{
    })

  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleHoverOn = () => {
    this.setState({hover: 18})
  }

  handleHoverOff = () => {
    this.setState({hover: 4})
  }

    render() {
        const dialog = () => {
            return  (
                <Dialog
                    // fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                    >
                    <DialogTitle id="responsive-dialog-title">{this.props.film.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        <span>
                Name: {this.props.film.name}
              </span>
              <br></br>
              <span>
                Genres: {this.props.film.genres}
              </span>
              <br></br>
              <span>
                Actors: {this.props.film.actors}
              </span>
              <br></br>
              <span>
                Producer: {this.props.film.Producer}
              </span>
              <br></br>
              <span>
                Number of seasons: {this.props.film.seasons}
              </span>
              <br></br>
              <span>
                Where to find it (legally): {this.props.film.where}
              </span>
              <br></br>
              <span>
                Where to find it (not as legal): {this.props.film.link}
              </span>
              <br></br>
              <span>
              Your Rating: 
              <StarRatingComponent 
                            name="rate1" 
                            starCount={5}
                            value={this.state.rating}
                            style={styles.stars}
                            onStarClick = {this.handleRating}
                            
                        />
               </span>
                </DialogContentText>
                    </DialogContent>
                    
                    <DialogActions>
                        {this.state.seen? <IconButton aria-label="Seen">
                                            <Visibility/>
                                          </IconButton> :
                                        <IconButton aria-label="Seen" onClick={this.hasSeen}>
                                        <VisibilityOff/>
                                    </IconButton>}
                    
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                        Close
                        </Button>

                    </DialogActions>
                </Dialog>
            )
        }




      const styles = {
        card: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
        stars : {
            marginLeft:'5%',
            marginRight:'5%',
        },
        button: {
        }
      };

      return(
          <div>
            <Paper style={{height:"100%", width:"100%"}} elevation={this.state.hover}>
            <img src={"data:image/jpg;base64, " + this.props.film.image} width="100%" height="100%" onClick={this.onClickImage} onMouseOver={this.handleHoverOn} onMouseOut={this.handleHoverOff}/>    
            </Paper>
            {dialog()}
        </div>

      );
    }
}

export default Serie;
