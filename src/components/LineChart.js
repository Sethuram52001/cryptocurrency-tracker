import React from 'react';

class LineChart extends React.Component {
	
	state={}

	componentDidMount = () =>{
		console.log('LineChart Component Mounted');
		//console.log(this.props.data);
	}

	//get x & y || max & min
	getX = () =>{
		const {data} = this.props;
		return{
			min: data[0].index,
			max: data[data.length -1].index
		}
	} 

	getY = () =>{
		const {data} = this.props;
		return{
			min: data.reduce((min,i) => i.pValue < min ? i.pValue : min, data[0].pValue),
			max: data.reduce((max,i) => i.pValue > max ? i.pValue : max, data[0].pValue)
		}
	}

	render() {
		return (
			<div></div>
		);
	}
}

export default LineChart;