import React from 'react';
import StatsDisplay from './components/StatsDisplay'
import LineChart from './components/LineChart'
import ToolTip from './components/ToolTip'
import moment from 'moment';
import  './App.css'

const api_url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

class App extends React.Component {

  state={
    fetchingData: true,
    data: null,
    hoverLoc: null,
    activePoint: null
  }

  componentDidMount()
  {
    console.log('App Component Mounted');
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

  handleHover(hoverLoc,activePoint)
  {
    this.setState({
      hoverLoc: hoverLoc,//hover location
      activePoint: activePoint //active point on the line chart
    });
  }

  render() {
    return (
      <div className="main">
        <div className="title"><h1>Bitcoin Tracker</h1></div>
        <div className="StatsDisplay_container">
        {this.state.data ?
        <StatsDisplay data={this.state.data}></StatsDisplay>
        :null}
        </div>
        <div className="linechart_title">
        <h3>Line Chart <i className="fa fa-line-chart" aria-hidden="true"></i> </h3>
        </div>
        <div className='ToolTip_container'>
        {this.state.hoverLoc ? 
        <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> 
        :null}
        </div>
        <div className="LineChart_container">
        {!this.state.fetchingData ?  
        <LineChart data={this.state.data} onHover={(a,b) => this.handleHover(a,b)} ></LineChart>
        :null}
        </div>
        <div className="Reference"><a href="https://www.coindesk.com/price/bitcoin" target="_blank">Powered by CoinDesk</a></div>
      </div>
    );
  }
}

export default App;

