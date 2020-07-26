import React, { Component } from 'react';

class ToolTip extends Component {

  render() {
    const {hoverLoc, activePoint} = this.props;// to get the point on the line chart
    //The Element.getBoundingClientRect() method returns the size of an element and 
    //its position relative to the viewport.
    const svgLocation = document.getElementsByClassName("linechart")[0].getBoundingClientRect();

    let placementStyles = {};
    let width = 100;
    placementStyles.width = width + 'px';
    placementStyles.left = hoverLoc + svgLocation.left - (width/2);

    return (
      <div className='hover' style={ placementStyles }>
        <div className='date'>{ activePoint.d }</div>
        <div className='price'>{ activePoint.p }</div>
      </div>
    )
  }
}

export default ToolTip;