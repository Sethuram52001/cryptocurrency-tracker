import React from 'react';

const api_url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

class StatsDisplay extends React.Component {

	/*constructor(props) 
	{
		super(props);
		this.state={
			currentPrice: null,
			dailyChange: null,//24 hour change
			dailyChangeP:null,
			monthlyChange: null,//monthly change
			monthlyChangeP: null,
			lastUpdated: null
		}
	}*/

	state={
			currentPrice: null,
			dailyChange: null,//24 hour change
			dailyChangeP:null,
			monthlyChange: null,//monthly change
			monthlyChangeP: null,
			lastUpdated: null
	}

	componentDidMount = () =>
	{
		console.log('StatsDisplay Component Mounted');
		/*this.getData = () =>{
			const {data} = this.props;
			//console.log('props:',data);
			fetch(api_url).then(d => d.json()).then((Data)=>{
				//console.log(Data);
				const current_price =  Data.bpi.USD.rate_float;
      			const daily_change = current_price-data[30].pValue;
      			const daily_changeP = (daily_change/data[30].pValue)*100;
      			const monthly_change = current_price-data[0].pValue;
      			const monthly_changeP = ((monthly_change)/data[0].pValue)*100;
      			const last_updated = Data.time.updated;
      			this.setState({
      				currentPrice:current_price,
      				dailyChange:daily_change,
      				dailyChangeP:daily_changeP,
      				monthlyChange:monthly_change,
      				monthlyChangeP:monthly_changeP,
      				lastUpdated:last_updated 
      			});
			}).catch((e)=>{console.log(e);}); 
		}*/
		this.getData();
	}

		getData = () =>{
			const {data} = this.props;
			//console.log('props:',data);
			fetch(api_url).then(d => d.json()).then((Data)=>{
				//console.log(Data);
				const current_price =  Data.bpi.USD.rate_float;
      			const daily_change = current_price-data[30].pValue;
      			const daily_changeP = (daily_change/data[30].pValue)*100;
      			const monthly_change = current_price-data[0].pValue;
      			const monthly_changeP = ((monthly_change)/data[0].pValue)*100;
      			const last_updated = Data.time.updated;
      			this.setState({
      				currentPrice:current_price,
      				dailyChange:daily_change,
      				dailyChangeP:daily_changeP,
      				monthlyChange:monthly_change,
      				monthlyChangeP:monthly_changeP,
      				lastUpdated:last_updated 
      			});
			}).catch((e)=>{console.log(e);}); 
		}

	render() {
		return (
			<div></div>
		);
	}
}

export default StatsDisplay;