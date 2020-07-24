import React from 'react';

class SvgLineChart extends React.Component {
	

	constructor(props) {
		super(props);
	}

	//get min x & y
	//get max x & y
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
    	return {
      		min: data.reduce((min, p) => p.pValue < min ? p.pValue : min, data[0].pValue),
      		max: data.reduce((max, p) => p.pValue > max ? p.pValue : max, data[0].pValue)
    	}
  	}

  	  // GET SVG COORDINATES
  	getSvgX(x) 
  	{
    	const {svgWidth, yLabelSize} = this.props;
    	return yLabelSize + (x / this.getX().max * (svgWidth - yLabelSize));
  	}
  
  	getSvgY(y) 
  	{
    	const {svgHeight, xLabelSize} = this.props;
    	const gY = this.getY();
    	return ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) / (gY.max - gY.min);
  	}
  
  	// BUILD SVG PATH
  	makePath()
  	{
    	const {data, color} = this.props;
    	let pathD = "M " + this.getSvgX(data[0].index) + " " + this.getSvgY(data[0].pValue) + " ";

    	pathD += data.map((point, i) => {
      		return "L " + this.getSvgX(point.index) + " " + this.getSvgY(point.pValue) + " ";
    	}).join("");

    	return (
      		<path className="linechart_path" d={pathD} style={{stroke: color}} />
    	);
  	}

  	// BUILD GRID AXIS
  	makeAxis() 
  	{
    	const {yLabelSize} = this.props;
    	const x = this.getX();
    	const y = this.getY();

    	return (
      		<g className="linechart_axis">
        		<line
          			x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.min)}
          			x2={this.getSvgX(x.max)} y2={this.getSvgY(y.min)}
          			strokeDasharray="5" />
        		<line
          			x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.max)}
          			x2={this.getSvgX(x.max)} y2={this.getSvgY(y.max)}
          			strokeDasharray="5" />
      		</g>
    	);
  	}

  	makeLabels()
  	{
    	const {svgHeight, svgWidth, xLabelSize, yLabelSize} = this.props;
    	const padding = 5;
    	return(
      		<g className="linechart_label">
        		{/* Y AXIS LABELS */}
        		<text transform={`translate(${yLabelSize/2}, 20)`} textAnchor="middle">
          		{this.getY().max.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}
        		</text>
        		<text transform={`translate(${yLabelSize/2}, ${svgHeight - xLabelSize - padding})`} textAnchor="middle">
          		{this.getY().min.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}
        		</text>
        		{/* X AXIS LABELS */}
        		<text transform={`translate(${yLabelSize}, ${svgHeight})`} textAnchor="start">
          		{ this.props.data[0].date }
        		</text>
        		<text transform={`translate(${svgWidth}, ${svgHeight})`} textAnchor="end">
          		{ this.props.data[this.props.data.length - 1].date }
        		</text>
      		</g>
    	)
  	}

  	// BUILD SHADED AREA
  	makeArea() 
  	{
    	const {data} = this.props;
    	let pathD = "M " + this.getSvgX(data[0].index) + " " + this.getSvgY(data[0].pValue) + " ";

    	pathD += data.map((point, i) => {
      		return "L " + this.getSvgX(point.index) + " " + this.getSvgY(point.pValue) + " ";
    	}).join("");

    	const x = this.getX();
    	const y = this.getY();
    	pathD += "L " + this.getSvgX(x.max) + " " + this.getSvgY(y.min) + " "
    	+ "L " + this.getSvgX(x.min) + " " + this.getSvgY(y.min) + " ";

    	return <path className="linechart_area" d={pathD} />
  	}

	render() {
		const {svgHeight,svgWidth} = this.props;
		return (
			<div>
				<svg viewBox={`0 0 ${svgHeight} ${svgWidth}`}>
					{this.makePath()}
					{this.makeAxis()}
					{this.makeLabels()}
					{this.makeArea()}
				</svg>
			</div>
		);
	}
}

SvgLineChart.defaultProps = {
	data: [],
	color: '#2196F3',
	svgHeight: 300,
	svgWidth: 900,
	xLabelSize: 20,
	yLabelSize: 80
}

export default SvgLineChart;

	/*getMinX()
	{
		const {data} = this.props;
		return data[0].index;
	}

	getMinY()
	{
		const {data} = this.props;
		//const arr = data.map(obj => obj.pValue);
		//const min_y = Math.min.apply(null,arr);
		const min_y = data.reduce((min, p) => p.pValue < min ? p.pValue : min, data[0].pValue);
		return min_y;
	}

	
	getMaxX()
	{
		const {data} = this.props;
		return data[data.length - 1].index;
	}

	getMaxY()
	{
		const {data} = this.props;
		//const arr = data.map(obj => obj.pValue);
		//const max_y = Math.max.apply(null,arr);
		const max_y = data.reduce((max, p) => p.pValue > max ? p.pValue : max, data[0].pValue);
		return max_y;
	}*/

		/*getSvgX(x)
	{
		const {svgWidth,yLabelSize} = this.props;
		return (yLabelSize + (x / this.getMaxX() * (svgWidth - yLabelSize)));
	}

	getSvgY(y)
	{
		const {svgHeight,xLabelSize} = this.props;
		return ((svgHeight - xLabelSize) * this.getMaxY() - (svgHeight-xLabelSize) * y) / (this.getMaxY()-this.getMinY());
	}

	makePath()
	{
		const {data,color} = this.props;
		/*let pathD = `M ${this.getSvgX(data[0].index)} ${this.getSvgY(data[0].pValue)} `;

		pathD += data.map((point,i) => {
			return `L ${this.getSvgX(point.index)} ${this.getSvgY(point.pValue)} `;
		});*/

/*		let pathD = "M " + this.getSvgX(data[0].index) + " " + this.getSvgY(data[0].pValue) + " ";

    	pathD += data.map((point, i) => {
      		return "L " + this.getSvgX(point.index) + " " + this.getSvgY(point.pValue) + " ";
    	}).join("");

		return <path className="linechart_path" d={pathD} style={{stroke: color}}></path>
	}

	makeAxis()
	{
		const {yLabelSize} = this.props;
		const minX = this.getMinX(), maxX = this.getMaxX();
		const minY = this.getMinY(), maxY = this.getMaxY();

		return (
				<g className="linechart_axis">
					<line x1={this.getSvgX(minX) - yLabelSize} y1={this.getSvgY(minY)} x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)}>
					</line>
					<line x1={this.getSvgX(minX) - yLabelSize} y1={this.getSvgY(maxY)} x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)}>
					</line>
				</g>
			);
	}

	makeLabels()
	{
		const {svgHeight,svgWidth,xLabelSize,yLabelSize} = this.props;
		const padding = 5;
		return ( 
				<g className="linechart_label">
					x-axis labels
					<text transform={`translate(${yLabelSize},${svgHeight})`} textAnchor="start">{this.props.data[0].date}</text>
					<text transform={`translate(${svgWidth},${svgHeight})`} textAnchor="end">{this.props.data[this.props.data.length-1].date}</text>
					y-axis labels
					<text transform={`translate(${yLabelSize/2},20)`} textAnchor="middle">{this.getMaxY().toLocaleString('us-EN',{style:'currency',currency:'USD'})}</text>
					<text transform={`translate(${yLabelSize/2},20)`} textAnchor="middle">{this.getMinY().toLocaleString('us-EN',{style:'currency',currency:'USD'})}</text>
				</g>
			);	
	}

	//shaded path
	makeArea() 
	{
    	const {data} = this.props;
    	let pathD = "M " + this.getSvgX(data[0].index) + " " + this.getSvgY(data[0].pValue) + " ";

    	pathD += data.map((point, i) => {
      		return "L " + this.getSvgX(point.index) + " " + this.getSvgY(point.pValue) + " ";
    	}).join("");

    	const x_min = this.getMinX();
    	const x_max = this.getMaxX();
    	const y_min = this.getMinY();
    	const y_max = this.getMaxY();
    	pathD += "L " + this.getSvgX(x_max) + " " + this.getSvgY(y_min) + " "
    		+ "L " + this.getSvgX(x_min) + " " + this.getSvgY(y_min) + " ";

    	return <path className="linechart_area" d={pathD} />
  	}*/