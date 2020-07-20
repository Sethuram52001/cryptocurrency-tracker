import React from 'react';
import moment from 'moment';

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
			currentPrice: 0,
			dailyChange: null,//24 hour change
			dailyChangeP:null,
			monthlyChange: null,//monthly change
			monthlyChangeP: null,
			lastUpdated: null
	}

	componentDidMount = () =>
	{
		console.log('StatsDisplay Component Mounted');
		const {data} = this.props;
		console.log('props:',data);
		this.getData = () =>{
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
      				dailyChange:daily_change.toLocaleString('us-EN',{style:'currency',currency:'USD'}),
      				dailyChangeP:daily_changeP.toFixed(2) + '%',
      				monthlyChange:monthly_change.toLocaleString('us-EN',{style:'currency',currency:'USD'}),
      				monthlyChangeP:monthly_changeP.toFixed(2) + '%',
      				lastUpdated:last_updated 
      			});
			}).catch((e)=>{console.log(e);}); 
		}
		this.getData();
	}

	render() {
		return (
			<div>
				<div className="StatsBar">
					<div className="currentPriceBox">
						<div className="heading">PRICE</div>
						<div className="text">{this.state.currentPrice.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}</div>
						<div className="text">{"Updated " + moment(this.state.lastUpdated).fromNow()}</div>
					</div>
					<div className="dailyChangeBox">
						<div className="heading">24 HOUR CHANGE </div>
						<div className="text">{this.state.dailyChange}</div>
						<div className="text">{this.state.dailyChangeP}</div>
					</div>
					<div className="monthlyChangeBox">
						<div className="heading">MONTHLY CHANGE</div>
						<div className="text">{this.state.monthlyChange}</div>
						<div className="text">{this.state.monthlyChangeP}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default StatsDisplay;
					
				