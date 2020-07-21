import React from 'react';

class LineChart extends React.Component {
	
	state={
		hover: null,
		activePoint: null
	}

	/*constructor(props)
	{
		super(props);
		this.setState({
			hover: null,
			activePoint: null 
		});
	}*/

	componentDidMount = () =>{
		console.log('LineChart Component Mounted');
		console.log(this.props.data);
	}

	//min and max values for SVG
	getX()
	{
		const {data} = this.props;
		return{
			min: data[0].index,
			max: data[data.lenght - 1].index
		}
	}

	getY()
	{
		const {data} = this.props;
		const arr = data.map(obj => obj.pValue);
		const minY = Math.min.apply(null,arr);
		const maxY = Math.max.apply(null,arr);
		return{
			min: minY,
			max: maxY
		}
	}

	//SVG coordinates
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

	//SVG path
	makePath()
	{
		const {data,color} = this.props;
		//let pathD = "M " + this.getSvgX(data[0].index) + " " + this.getSvgY(data[0].pValue) + " ";
		let pathD = `M ${this.getSvgX(data[0].index)} ${this.getSvgY(data[0].pValue)}`;

		/*pathD += data.map((point,i) => {
			return "L " + this.getSvgX(point.index) + " " + this.getSvgY(point.pValue) + " ";
		}).join("");*/

		pathD += data.map((point,i) => {
			return `L ${this.getSvgX(point.index)} ${this.getSvgY(point.pValue)}`
		})

		return (<path className="linechart_path" d={pathD} style={{stroke:color}} />);
	}

	//shaded area
	makeArea()
	{
		const {data} = this.props;
		//let pathD = "M " + this.getSvgX(data[0].index) + " " + this.getSvgY(data[0].pValue) + " ";
		let pathD = `M ${this.getSvgX(data[0].index)} ${this.getSvgY(data[0].pValue)}`

		/*pathD += data.map((point,i) => {
			return "L " + this.getSvgX(point.index) + " " + this.getSvgY(point.pValue) + " ";
		}).join("");*/
		pathD += data.map((point,i) => {
			return `L ${this.getSvgX(point.index)} ${this.getSvgY(point.pValue)}`
		})

		const x = this.getX();
		const y = this.getY();
		//pathD += "L " + this.getSvgX(x.max) + " " + this.getSvgY(y.min) + " " + "L " + this.getSvgX(x.min) + " " + this.getSvgY(y.min) + " ";
		pathD += `L ${this.getSvgX(x.max)} ${this.getSvgY(y.min)} L ${this.getSvgX(x.min)} ${this.getSvgY(y.min)}`

		return <path className="linechart_area" d={pathD} />
	}

	//axis
	makeAxis()
	{
		const {yLabelSize} = this.props;
		const x = this.getX();
		const y = this.getY();

		return (
				<g className="linechart_axis" >
				<line x1={this.getSvgX(x.min) -yLabelSize} y1={this.getSvgY(y.min)}
				 x2={this.getSvgX(x.max)} y2={this.getSvgY(y.min)} strokeDasharray = "5" />
				<line x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.min)} 
				x2={this.getSvgX(x.max)} y2={this.getSvgY(y.max)} strokeDasharray = "5" />
				</g>
			);
	}

	render() {
		return (
			<div>
				<svg  width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={'linechart'} >
        			<g>
          				{this.makeAxis()}
          				{this.makePath()}
          				{this.makeArea()}
          			</g>
      			</svg>
			</div>
		);
	}
}

LineChart.defaultProps = {
	data: [],
	color: '#2196F3',
	pointRadius: 5,
	svgHeight: 300,
	svgWidth: 900,
	xLabelSize: 20,
	yLabelSize: 80
}

export default LineChart;