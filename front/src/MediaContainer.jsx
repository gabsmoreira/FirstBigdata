import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
import logo from './download.jpeg'



class MediaContainer extends Component {
    constructor(props){
    super(props);
    this.state = {
      data : [
        {
          name: "Tirtoper",
          producer: "Tirta",
          img: "./download.jpeg",
          rating: 3
        },
        {
          name: "Graicer",
          producer: "Tirta",
          img: "./download.jpeg",
          rating: 5
        },
        {
          name: "Graber",
          producer: "Grabers",
          img: "./download.jpeg",
          rating: 5
        },
        {
          name: "Tirtoper",
          producer: "Tirta",
          img: "./download.jpeg",
          rating: 3
        },
        {
          name: "Graicer",
          producer: "Tirta",
          img: "./download.jpeg",
          rating: 5
        },
        {
          name: "Graber",
          producer: "Grabers",
          img: "./download.jpeg",
          rating: 5
        },
        {
          name: "Tirtoper",
          producer: "Tirta",
          img: "./download.jpeg",
          rating: 3
        },
        {
          name: "Graicer",
          producer: "Tirta",
          img: "./download.jpeg",
          rating: 5
        },
        {
          name: "Graber",
          producer: "Grabers",
          img: "./download.jpeg",
          rating: 5
        },

      ]

    }
  }

  
  

    render() {
      const styles = {
        card: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
      };


      return(
        this.state.data.map(film =>{
          return (
            <Card >
              {/* <CardMedia
                height="140"
                width="120"
                image={film.img}
                title="Contemplative Reptile"
              /> */}
              <img src={logo} width="100%"/>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {film.name}
                </Typography>
                <Typography component="h3">
                  Rating: {film.rating}
                </Typography>
                <Typography gutterBottom variant="headline" component="h3">
                  Producer: {film.producer}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Download Link
                </Button>
              </CardActions>
            </Card>
            
          );
        })

      );

      
        
    
    }

    
}

export default MediaContainer;
