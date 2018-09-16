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



// var iconv = require('iconv');

// function toUTF8(body) {
//   // convert from iso-8859-1 to utf-8
//   var ic = new iconv.Iconv('iso-8859-1', 'utf-8');
//   var buf = ic.convert(body);
//   return buf.toString('utf-8');
// }

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
        //const imagem = this.props.film.image.toString('utf-8')
        // var i = new Blob(this.props.film.image, {type: "image/jpg;charset=ISO-8859-1"})
        // window.URL.createObjectURL(i)

      return(
        <Card >
            <img src={logo} width="100%"/>
            {/* <img src={"data:image/jpg;base64," + i} /> */}
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
