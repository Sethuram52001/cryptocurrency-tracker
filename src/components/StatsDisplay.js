import React from 'react'; 

const api_url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

class StatsDisplay extends React.Component {

	state={
		currentPrice: null,
		dailyChange: null,//24 hour change
		dailyChangeP:null,
		monthlyChange: null,//monthly change
		monthlyChangeP: null,
		lastUpdated: null
	}

	componentDidMount =()=>
	{
	  	console.log("StatsDisplay Mounted");
	  	/*const getData = () =>{
		const {data} = this.props;
      	//console.log(data[30].pValue);
      	fetch(api_url).then(d => d.json()).then((Data) =>
      	{
      		console.log(Data);
      		const current_price =  Data.bpi.USD.rate_float;
      		const daily_change = current_price-data[30].pValue;
      		const daily_changeP = (daily_change/data[30].pValue)*100;
      		const monthly_change = current_price-data[0].pValue;
      		const monthly_changeP = ((monthly_change)/data[0].pValue)*100;
      		const last_updated = Data.time.updated;
      		this.setState({
      			currentPrice:current_price,
      			dailyChange:daily_change.toLocaleString('us-EN',{style:'currency',currency:'USD'}),
      			dailyChangeP:daily_changeP.toFixed(2)+'%',
      			monthlyChange:monthly_change.toLocaleString('us-EN',{style:'currency',currency:'USD'}),
      			monthlyChangeP:monthly_changeP.toFixed(2)+'%',
      			lastUpdated:last_updated		 
      		});
      	});
    	}
    	//getData();*/
    }

	getData = () =>{
		const {data} = this.props;
      	//console.log(data[30].pValue);
      	fetch(api_url).then(d => d.json()).then((Data) =>
      	{
      		console.log(Data);
      		const current_price =  Data.bpi.USD.rate_float;
      		const daily_change = current_price-data[30].pValue;
      		const daily_changeP = (daily_change/data[30].pValue)*100;
      		const monthly_change = current_price-data[0].pValue;
      		const monthly_changeP = ((monthly_change)/data[0].pValue)*100;
      		const last_updated = Data.time.updated;
      		this.setState({
      			currentPrice:current_price,
      			dailyChange:daily_change.toLocaleString('us-EN',{style:'currency',currency:'USD'}),
      			dailyChangeP:daily_changeP.toFixed(2)+'%',
      			monthlyChange:monthly_change.toLocaleString('us-EN',{style:'currency',currency:'USD'}),
      			monthlyChangeP:monthly_changeP.toFixed(2)+'%',
      			lastUpdated:last_updated		 
      		});
      	});
    }

	render() {
		{/*(this.getData()*/}
		return (
			<div>
				<button onClick={this.getData}>button</button>
				<div className="StatsBar">
					<p>current price: {this.state.currentPrice}</p>
					<p>last updated: {this.state.lastUpdated}</p>
					<p>daily change: {this.state.dailyChange}</p>
					<p>daily change : {this.state.dailyChangeP}</p>
					<p>monthly change: {this.state.monthlyChange}</p>
					<p>monthly change : {this.state.monthlyChangeP}</p>
					<p>last updated: {this.state.lastUpdated}</p>
				</div>
			</div>
		);
	}
}

export default StatsDisplay;