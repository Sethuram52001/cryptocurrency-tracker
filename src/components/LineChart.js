import React, {Component} from "react";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverLoc: null,
      activePoint: null 
    }
  }
  // get min and max x
  getMinX()
  {
    const {data} = this.props;
    return data[0].index;//0 th index
  }

  getMaxX()
  {
    const {data} = this.props;
    return data[data.length - 1].index;//last index - 31st day
  }

  // get min and max y
  getMinY()
  {
    const {data} = this.props;
    const arr = data.map(obj => obj.pValue);
    const min_y = Math.min.apply(null,arr);
    return min_y;
  }

  getMaxY()
  {
    const {data} = this.props;
    const arr = data.map(obj => obj.pValue);
    const max_y = Math.max.apply(null,arr);
    return max_y;
  }

  // get SVG coordinates
  getSvgX(x) 
  {
    const {svgWidth, yLabelSize} = this.props;
    return yLabelSize + (x / this.getMaxX() * (svgWidth - yLabelSize));
  }

  getSvgY(y) 
  {
    const {svgHeight, xLabelSize} = this.props;
    return ((svgHeight - xLabelSize) * this.getMaxY() - (svgHeight - xLabelSize) * y) / (this.getMaxY() - this.getMinY());
  }

  // build SVG path
  makePath() 
  {
    const {data, color} = this.props;
    //let pathD = "M " + this.getSvgX(data[0].index) + " " + this.getSvgY(data[0].pValue) + " ";
    let pathD = `M ${this.getSvgX(data[0].index)} ${this.getSvgY(data[0].pValue)} `;

    pathD += data.map((point, i) => {
      return `L ${this.getSvgX(point.index)} ${this.getSvgY(point.pValue)}   `;
    });

    return (
      <path className="linechart_path" d={pathD} style={{stroke: color}} />
    );
  }

  // axis
  makeAxis() 
  {
    const {yLabelSize} = this.props;
    const x_min = this.getMinX(),x_max = this.getMaxX();
    const y_min = this.getMinY(),y_max = this.getMaxY();

    return (
      <g className="linechart_axis">
        <line
          x1={this.getSvgX(x_min) - yLabelSize} y1={this.getSvgY(y_min)}
          x2={this.getSvgX(x_max)} y2={this.getSvgY(y_min)}
        />
        <line
          x1={this.getSvgX(x_min) - yLabelSize} y1={this.getSvgY(y_max)}
          x2={this.getSvgX(x_max)} y2={this.getSvgY(y_max)}
        />
      </g>
    );
  }

  // shaded area
  makeArea() 
  {
    const {data} = this.props;
    let pathD = `M ${this.getSvgX(data[0].index)} ${this.getSvgY(data[0].pValue)} `;

    pathD += data.map((point, i) => {
      return `L   ${this.getSvgX(point.index)}  ${this.getSvgY(point.pValue)} `;
    });

    const x_min = this.getMinX(), x_max = this.getMaxX();
    const y_min = this.getMinY(), y_max = this.getMaxY();
    pathD += `L  ${this.getSvgX(x_max)} ${this.getSvgY(y_min)} L ${this.getSvgX(x_min)} ${this.getSvgY(y_min)} `;

    return <path className="linechart_area" d={pathD} />
  }

  // labels
  makeLabels()
  {
    const {svgHeight, svgWidth, xLabelSize, yLabelSize} = this.props;
    const padding = 5;
    return(
      <g className="linechart_label">
        {/* Y AXIS LABELS */}
        <text transform={`translate(${yLabelSize/2}, 20)`} textAnchor="middle">
          {this.getMaxY().toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}
        </text>
        <text transform={`translate(${yLabelSize/2}, ${svgHeight - xLabelSize - padding})`} textAnchor="middle">
          {this.getMinY().toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}
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

  // closes point to mouse
  getCoords(e)
  {
    const {svgWidth,data,yLabelSize} = this.props;
    //The Element.getBoundingClientRect() method returns the size of an 
    //element and its position relative to the viewport.
    const svgLocation = document.getElementsByClassName("linechart")[0].getBoundingClientRect();
    const adjustment = (svgLocation.width - svgWidth)/2;
    //The clientX read-only property of the MouseEvent interface provides the horizontal coordinate 
    //within the application's client area at which the event occurred (as opposed to the coordinate
    // within the page).
    const relativeLoc = e.clientX - svgLocation.left - adjustment;

    let svgData = [];
    data.map((point,i) => {
      svgData.push({
        svgX: this.getSvgX(point.index),
        svgY: this.getSvgY(point.pValue),
        d: point.date,
        p: point.pDollars,
      });
    });

    let closestPoint = {};
    for(let i =0,c=svgWidth;i<svgData.length;i++)
    {
      if(Math.abs(svgData[i].svgX - this.state.hoverLoc) <= c)
      {
        c = Math.abs(svgData[i].svgX - this.state.hoverLoc);
        closestPoint = svgData[i];
      }
    }

    if(relativeLoc - yLabelSize < 0)
    {
      this.stopHover();
    }
    else
    {
      this.setState({
        hoverLoc: relativeLoc,
        activePoint: closestPoint 
      });
      this.props.onHover(relativeLoc,closestPoint);
    }
  }

  //stop hovering
  stopHover()
  {
    this.setState({
      hoverLoc: null,
      activePoint: null 
    });
    this.props.onHover(null,null);
  }

  // make active point
  makeActivePoint()
  {
    const {color,pointRadius} = this.props;
    return(
        <circle className="linechart_point" style={{stroke:color}} 
        r={pointRadius} cx={this.state.activePoint.svgX} cy={this.state.activePoint.svgY}
        >  
        </circle>
      );
  }

  //make hover line
  createLine()
  {
    const {svgHeight, xLabelSize} = this.props;
    return (
          <line className='hoverLine' x1={this.state.hoverLoc} y1={-8} x2={this.state.hoverLoc} y2={svgHeight - xLabelSize}></line>
      );  
  }

  render() {
    const {svgHeight, svgWidth} = this.props;

    return (
      <div>
      <svg  width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={'linechart'}
            onMouseLeave={ () => this.stopHover() } 
            onMouseMove={ (e) => this.getCoords(e) } >

            <linearGradient x1="0" y1="0" x2="100%" y2="100%" id="gradient">
              <stop stopColor="#c86dd7" offset="0"/>
              <stop stopColor="#3023ae" offset="100%"/>
            </linearGradient>

        <g fill="url(#gradient)">
          {this.makeAxis()}
          {this.makePath()}
          {this.makeArea()}
          {this.makeLabels()}
          {this.state.hoverLoc ? this.createLine() : null}
          {this.state.hoverLoc ? this.makeActivePoint() : null}
        </g>
      </svg>
      </div>
    );
  }
}
// DEFAULT PROPS
LineChart.defaultProps = {
  data: [],
  color: '#FFBE3B',
  pointRadius: 5,
  svgHeight: 450,
  svgWidth: 1200,
  xLabelSize: 20,
  yLabelSize: 80
}

export default LineChart;

/*<i class="fa fa-line-chart" aria-hidden="true"></i>*/

/*
              <stop stopColor="#FF8F00" offset="0"/>
              <stop stopColor="#FFE4C0" offset="100%"/>
*/

/*
            <linearGradient x1="0" y1="0" x2="100%" y2="100%" id="gradient">
              <stop stop-color="#c86dd7" offset="0"/>
              <stop stop-color="#3023ae" offset="100%"/>
            </linearGradient>
*/

/*
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0" stop-color="#FFB600" />
              <stop offset="100" stop-color="#FFD765" />
            </linearGradient>
*/


/*
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            </linearGradient>
*/