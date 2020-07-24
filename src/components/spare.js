import React from 'react';

class spare extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			hoverLoc: null,
			activePoint: null
		}
	}

	//get min and max for x and y
	getX()
	{
		const {data} = this.props;
		return {
			min: data[0].index,
			max: data[data.length - 1].index
		}
	}

	getY()
	{
		const {data} = this.props;
		const arr = data.map(obj => obj.pValue);
		const min_y = Math.min.apply(null,arr);
		const max_y = Math.max.apply(null,arr);
		return {
			min: min_y,
			max: max_y
		}
	}

	// get SVG coordinates
	getSvgX(x)
	{
		const {svgWidth,yLabelSize} = this.props;
		return yLabelSize + (x/this.getX().max*(svgWidth-yLabelSize));
	}

	getSvgY(y)
	{
		const {svgHeight,xLabelSize} = this.props;
		const gY = this.getY();
		return ((svgHeight - xLabelSize)*gY.max - (svgHeight-xLabelSize)*y)/(gY.max - gY.min);
	}

	makePath()
	{
		const {data,color} = this.props;
		let pathD = `M ${this.getSvgX(data[0].index)} ${this.getSvgY(data[0].pValue)} `;
		pathD += data.map((point,i) => {
			return `L ${this.getSvgX(point.index)} ${this.getSvgY(point.pValue)} `;
		});

		return <path className="linechart_path" d={pathD} style={{stroke:color}} />;
	}

	// shade the area
	makeArea()
	{
		const {data} = this.props;
		let pathD = `M ${this.getSvgX(data[0].index)} ${this.getSvgY(data.pValue) }`;
		const x = this.getX();
		const y = this.getY();
		pathD += `L ${this.getSvgX(x.max)} ${this.getSvgY(y.min)} L ${this.getSvgX(x.min)} ${this.getSvgY(y.min)} `;
		return <path className="linechart_area" d={pathD} />;
	}

	//axis
	makeAxis()
	{
		const {yLabelSize} = this.props;
		const x = this.getX();
		const y = this.getY();
		return (
				<g className="linechart_axis">
					<line x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.min)} x2={this.getSvgX(x.max)} y2={this.getSvgY(y.min)} strokeDasharray="5" />
					<line x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.max)} x2={this.getSvgX(x.max)} y2={this.getSvgY(y.max)} strokeDasharray="5" />
				</g>
			);
	}

	//labels
	makeLabels()
	{
		const {svgHeight,svgWidth,xLabelSize,yLabelSize} = this.props;
		const padding = 5;
		return (
				<g className="linechart_label">
					{/*x-axis labels*/}
					<text transform={`translate(${yLabelSize},${svgHeight})`} textAnchor="start" >
						{this.props.data[0].date}
					</text>
					<text transform={`translate(${svgWidth},${svgHeight})`} textAnchor="end" >
						{this.props.data[this.props.data.length - 1].date}
					</text>
					{/*y-axis labels*/}
					<text transform={`translate(${yLabelSize/2},20)`} textAnchor="middle" >
						{this.getY().max.toLocaleString('us-EN',{style:'currency',currency:'USD'})}
					</text>
					<text transform={`translate(${yLabelSize/2},${svgHeight-xLabelSize-padding})`} textAnchor="middle" >
						{this.getY().min.toLocaleString('us-EN',{style:'currency',currency:'USD'})}
					</text>
				</g>
			);	
	}	

	//closest point to mouse
	getCoords(e)
	{
		const {svgWidth,data,yLabelSize} = this.props;
		const svgLocation = document.getElementsByClassName("linechart")[0]/getBoundingClientRect();
		const adjustment = (svgLocation.width - svgWidth)/2;
		const relativeLoc = e.clientX - svgLocation.left - adjustment;

		let svgData = [];
		data.map((point,i) =>{
			svgData.push({
				svgX: this.getSvgX(point.index);
				SvgY: this.getSvgY(point.pValue);
				d: point.date,
				p: point.pDollars
			});
		});

		let closestPoint = {};
		for(let i=0,c=500;i<svgData.length;i++)
		{
			if(Math.abs(svgData[i].svgX - this.state.hover) <= c)
			{
				
			}
		}
	}

	render() {
		return (
			<div>
				<svg width={svgWidth} height={svgHeigth} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={'linechart'} >
					<g>
						{this.makeAxis()}
						{this.makePath()}
						{this.makeArea()}
						{this.makeLabels()}
					</g>
				</svg>
			</div>
		);
	}
}

// default props
spare.defaultProps = {
	data: [],
	color: '#FFBA3B',
	pointRadius: 5,
	svgHeight: 300,
	svgWidth: 900,
	xLabelSize: 20,
	yLabelSize: 80
}

export default spare;

/*
import React from 'react';

class SvgLineChart extends React.Component {
	

	constructor(props) {
		super(props);
	}

	//get min x & y
	getMinX()
	{
		const {data} = this.props;
		return data[0].index;
	}

	getMinY()
	{
		const {data} = this.props;
		const arr = data.map(obj => obj.pValue);
		const min_y = Math.min.apply(null,arr);
		//const max_y = Math.max.apply(null,arr);
		return min_y;
	}

	//get max x & y
	getMaxX()
	{
		const {data} = this.props;
		return data[data.length - 1].index;
	}

	getMaxY()
	{
		const {data} = this.props;
		const arr = data.map(obj => obj.pValue);
		const max_y = Math.max.apply(null,arr);
		return max_y;
	}

	getSvgX(x)
	{
		const {svgWidth} = this.props;
		return (x/this.getMaxX()*svgWidth);
	}

	getSvgY(y)
	{
		const {svgHeight} = this.props;
		return svgHeight - (y/this.getMaxY()*svgHeight);
	}

	makePath()
	{
		const {data,color} = this.props;
		let pathD = `M ${this.getSvgX(data[0].index)} ${this.getSvgY(data[0].pValue)} `;

		pathD += data.map((point,i) => {
			return `L ${this.getSvgX(point.index)} ${this.getSvgY(point.pValue)} `;
		});

		return <path className="linechart_path" d={pathD} style={{stroke: color}}></path>
	}

	makeAxis()
	{
		const minX = this.getMinX(), maxX = this.getMaxX();
		const minY = this.getMinY(), maxY = this.getMaxY();

		return (
				<g className="linechart_axis">
					<line x1={this.getSvgX(minX)} y1={this.getSvgY(minY)} x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)}>
					</line>
					<line x1={this.getSvgX(minX)} y1={this.getSvgY(minY)} x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)}>
					</line>
				</g>
			);
	}

	render() {
		const {svgHeight,svgWidth} = this.props;
		return (
			<div>
				<svg viewBox={`0 0 ${svgHeight} ${svgWidth}`}>
					{this.makePath()}
					{this.makeAxis()}
				</svg>
			</div>
		);
	}
}

SvgLineChart.defaultProps = {
	data: [],
	color: '#2196F3',
	svgHeight: 300,
	svgWidth: 700
}

export default SvgLineChart;
*/