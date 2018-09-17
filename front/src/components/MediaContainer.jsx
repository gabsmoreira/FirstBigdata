import React, { Component } from 'react';
import Serie from './Serie';
import auth from '../auth';



class MediaContainer extends Component {
    constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    this.props = nextProps
    if(nextProps.update == true){
      auth.search(this.props.search, this.props.genre, (result) => {
        this.setState({data: result})
      })
    }
  }

  componentWillMount = () =>{
    console.log(this.props.search, this.props.genre)
    auth.getList((result) =>{
      // console.log('A: ' + result[1])
      // const json = {'id': result[0],
      //               'name': result[1],
      //               'idProducer': result[2],
      //               'numberSeasons': result[3],
      //               'rating': result[4],
      //               'find': result[5],
      //               'download': result[6]}
      // console.log(typeof(result))  
      this.setState({data: result})
    })
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
        
        this.state.data.map(show =>{
          // console.log(show[7])
          const json = {'id': show[0],
                    'name': show[1],
                    'Producer': show[2],
                    'genres': show[3],
                    'actors': show[4],
                    'seasons': show[5],
                    'avg_score': show[6],
                    'where': show[7],
                    'link': show[8],
                    'image': show[9]}
          return (
            <Serie film={json} />
          );
        })

      );
    }
}

export default MediaContainer;
