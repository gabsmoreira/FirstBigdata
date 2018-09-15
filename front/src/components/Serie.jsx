import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../download.jpeg'
import StarRatingComponent from 'react-star-rating-component';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';





class Serie extends Component {
    constructor(props){
    super(props);
    this.state = {
        rating: 3
    }
  }

  handleRating = (value) =>{
      console.log(value)
      this.setState({rating: value})
      // fazer request para mudar rating da serie

  }

    render() {
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
        <Card >
            <img src={logo} width="100%"/>
            <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
                {this.props.film.name}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" color="primary">
                Download Link
            </Button>
            </CardActions>
            <IconButton color="primary" style={styles.button}  aria-label="Add to list">
                <AddShoppingCartIcon />
            </IconButton>
            <StarRatingComponent 
                name="rate1" 
                starCount={5}
                value={this.state.rating}
                style={styles.stars}
                onStarClick = {this.handleRating}
              />
        </Card>
      );
    }
}

export default Serie;
