import React from 'react';
import StatsDisplay from './components/StatsDisplay'
import Graph from './components/Graph'
import MarkerPrice from './components/MarkerPrice'
import moment from 'moment';

const api_url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

class App extends React.Component {

  state={
    fetchingData: true,
    data: null,
  }

  componentDidMount()
  {
    console.log('Component Mounted');
    const getData = () =>{
      fetch(api_url).then(d => d.json()).then((Data) =>{
        const arr = [];
        let count = 0;
        for(let date in Data.bpi)
        {
          arr.push({
            date: moment(date).format('MMM Do YY'),
            pDollars: Data.bpi[date].toLocaleString('us-EN',{style:'currency',currency:'USD'}),
            index: count,//prev days
            pValue: Data.bpi[date]//price
          });
          count++;
        }
        this.setState({
          data:arr,
          fetchingData:false 
        });
      }).catch((e) =>{
        console.log(e);
      });
    }
    getData();
  }

  render() {
    return (
      <div>
      <StatsDisplay data={this.state.data}></StatsDisplay>
      </div>
    );
  }
}

export default App;