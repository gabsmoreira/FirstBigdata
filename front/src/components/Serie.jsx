import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRatingComponent from 'react-star-rating-component';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import ResponsiveDialog from "./ResponsiveDialog"




class Serie extends Component {
    constructor(props){
    super(props);
    this.state = {
        rating: this.props.film.score,
        logo: "",
        moreInfo: false
    }
  }
  
    componentWillMount = () => {
        console.log(this.props.film.name);
        switch (this.props.film.name){
            case "Rico e Morte":
                this.state.logo = require("../img/rickandmorty.jpg")
                break;
            case "Jogo das Cadeiras":
                this.state.logo = require("../img/got.jpg")
                break;
            case "98 brooklings":
                this.state.logo = require("../img/99.jpg")
                break;
            case "Anatomia de Cinza":
            this.state.logo = require("../img/greys.jpg")
                break;
            case "Espelho Preto":
                this.state.logo = require("../img/blackmirror.jpg")
                break;
            case "Quimica do mal":
                this.state.logo = require("../img/breakingbad.jpg")
                break;

      }
  }

  handleRating = (value) =>{
      console.log(value)
      this.setState({rating: value})
      // fazer request para mudar rating da serie

  }

  onClickImage = () => {
      this.setState({moreInfo: true})

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
        <Card style={{height:"100%", width:"100%"}}>
            <img src={this.state.logo} width="100%" onClick={this.onClickImage}/>
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
              <ResponsiveDialog open={this.state.moreInfo}/>
        </Card>
      );
    }
}

export default Serie;
