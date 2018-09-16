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
                    'idProducer': show[2],
                    'numberSeasons': show[3],
                    'score': show[4],
                    'find': show[5],
                    'link': show[6],
                    'image': show[7]}
          return (
            <Serie film={json} />
          );
        })

      );
    }
}

export default MediaContainer;
