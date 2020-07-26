(this["webpackJsonpcryptocurrency-tracker"]=this["webpackJsonpcryptocurrency-tracker"]||[]).push([[0],{13:function(e,t,a){},15:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(7),c=a.n(i),s=(a(13),a(1)),o=a(2),l=a(4),h=a(3),u=a(5),v=a.n(u),g="https://api.coindesk.com/v1/bpi/currentprice.json",m=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={currentPrice:0,dailyChange:null,dailyChangeP:null,monthlyChange:null,monthlyChangeP:null,lastUpdated:null,valueChangeD:-1,valueChangeM:-1},e.componentDidMount=function(){console.log("StatsDisplay Component Mounted");var t=e.props.data;console.log("props:",t),e.getData=function(){var t=e.props.data;fetch(g).then((function(e){return e.json()})).then((function(a){var n=a.bpi.USD.rate_float,r=n-t[30].pValue,i=r/t[30].pValue*100,c=n-t[0].pValue,s=c/t[0].pValue*100,o=a.time.updated;e.setState({currentPrice:n,dailyChange:r.toLocaleString("us-EN",{style:"currency",currency:"USD"}),dailyChangeP:i.toFixed(2)+"%",monthlyChange:c.toLocaleString("us-EN",{style:"currency",currency:"USD"}),monthlyChangeP:s.toFixed(2)+"%",lastUpdated:o,valueChangeD:r,valueChangeM:c})})).catch((function(e){console.log(e)}))},e.getData()},e}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"StatsBar"},r.a.createElement("div",{className:"currentPriceBox"},r.a.createElement("div",{className:"heading"},"PRICE"),r.a.createElement("div",{className:"text"},this.state.currentPrice.toLocaleString("us-EN",{style:"currency",currency:"USD"})),r.a.createElement("div",{className:"text"},"Updated "+v()(this.state.lastUpdated).fromNow())),r.a.createElement("div",{className:"dailyChangeBox"},r.a.createElement("div",{className:"heading"},"24 HOUR CHANGE "),r.a.createElement("div",{className:"text"},this.state.dailyChange),r.a.createElement("div",{className:"text"},this.state.valueChangeD>=0&&r.a.createElement("i",{className:"fa fa-caret-up fa-1x ",style:{color:"#66F900"},"aria-hidden":"true"}),this.state.valueChangeD<0&&r.a.createElement("i",{className:"fa fa-caret-down fa-1x ",style:{color:"#F93500"},"aria-hidden":"true"}),this.state.dailyChangeP)),r.a.createElement("div",{className:"monthlyChangeBox"},r.a.createElement("div",{className:"heading"},"MONTHLY CHANGE"),r.a.createElement("div",{className:"text"},this.state.monthlyChange),r.a.createElement("div",{className:"text"},this.state.valueChangeM>=0&&r.a.createElement("i",{className:"fa fa-caret-up fa-1x",style:{color:"#66F900"},"aria-hidden":"true"}),this.state.valueChangeM<0&&r.a.createElement("i",{className:"fa fa-caret-down fa-1x ",style:{color:"#F93500"},"aria-hidden":"true"}),this.state.monthlyChangeP))))}}]),a}(r.a.Component),d=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={hoverLoc:null,activePoint:null},n}return Object(o.a)(a,[{key:"getMinX",value:function(){return this.props.data[0].index}},{key:"getMaxX",value:function(){var e=this.props.data;return e[e.length-1].index}},{key:"getMinY",value:function(){var e=this.props.data.map((function(e){return e.pValue}));return Math.min.apply(null,e)}},{key:"getMaxY",value:function(){var e=this.props.data.map((function(e){return e.pValue}));return Math.max.apply(null,e)}},{key:"getSvgX",value:function(e){var t=this.props,a=t.svgWidth,n=t.yLabelSize;return n+e/this.getMaxX()*(a-n)}},{key:"getSvgY",value:function(e){var t=this.props,a=t.svgHeight,n=t.xLabelSize;return((a-n)*this.getMaxY()-(a-n)*e)/(this.getMaxY()-this.getMinY())}},{key:"makePath",value:function(){var e=this,t=this.props,a=t.data,n=t.color,i="M ".concat(this.getSvgX(a[0].index)," ").concat(this.getSvgY(a[0].pValue)," ");return i+=a.map((function(t,a){return"L ".concat(e.getSvgX(t.index)," ").concat(e.getSvgY(t.pValue),"   ")})),r.a.createElement("path",{className:"linechart_path",d:i,style:{stroke:n}})}},{key:"makeAxis",value:function(){var e=this.props.yLabelSize,t=this.getMinX(),a=this.getMaxX(),n=this.getMinY(),i=this.getMaxY();return r.a.createElement("g",{className:"linechart_axis"},r.a.createElement("line",{x1:this.getSvgX(t)-e,y1:this.getSvgY(n),x2:this.getSvgX(a),y2:this.getSvgY(n)}),r.a.createElement("line",{x1:this.getSvgX(t)-e,y1:this.getSvgY(i),x2:this.getSvgX(a),y2:this.getSvgY(i)}))}},{key:"makeArea",value:function(){var e=this,t=this.props.data,a="M ".concat(this.getSvgX(t[0].index)," ").concat(this.getSvgY(t[0].pValue)," ");a+=t.map((function(t,a){return"L   ".concat(e.getSvgX(t.index),"  ").concat(e.getSvgY(t.pValue)," ")}));var n=this.getMinX(),i=this.getMaxX(),c=this.getMinY();this.getMaxY();return a+="L  ".concat(this.getSvgX(i)," ").concat(this.getSvgY(c)," L ").concat(this.getSvgX(n)," ").concat(this.getSvgY(c)," "),r.a.createElement("path",{className:"linechart_area",d:a})}},{key:"makeLabels",value:function(){var e=this.props,t=e.svgHeight,a=e.svgWidth,n=e.xLabelSize,i=e.yLabelSize;return r.a.createElement("g",{className:"linechart_label"},r.a.createElement("text",{transform:"translate(".concat(i/2,", 20)"),textAnchor:"middle"},this.getMaxY().toLocaleString("us-EN",{style:"currency",currency:"USD"})),r.a.createElement("text",{transform:"translate(".concat(i/2,", ").concat(t-n-5,")"),textAnchor:"middle"},this.getMinY().toLocaleString("us-EN",{style:"currency",currency:"USD"})),r.a.createElement("text",{transform:"translate(".concat(i,", ").concat(t,")"),textAnchor:"start"},this.props.data[0].date),r.a.createElement("text",{transform:"translate(".concat(a,", ").concat(t,")"),textAnchor:"end"},this.props.data[this.props.data.length-1].date))}},{key:"getCoords",value:function(e){var t=this,a=this.props,n=a.svgWidth,r=a.data,i=a.yLabelSize,c=document.getElementsByClassName("linechart")[0].getBoundingClientRect(),s=(c.width-n)/2,o=e.clientX-c.left-s,l=[];r.map((function(e,a){l.push({svgX:t.getSvgX(e.index),svgY:t.getSvgY(e.pValue),d:e.date,p:e.pDollars})}));for(var h={},u=0,v=n;u<l.length;u++)Math.abs(l[u].svgX-this.state.hoverLoc)<=v&&(v=Math.abs(l[u].svgX-this.state.hoverLoc),h=l[u]);o-i<0?this.stopHover():(this.setState({hoverLoc:o,activePoint:h}),this.props.onHover(o,h))}},{key:"stopHover",value:function(){this.setState({hoverLoc:null,activePoint:null}),this.props.onHover(null,null)}},{key:"makeActivePoint",value:function(){var e=this.props,t=e.color,a=e.pointRadius;return r.a.createElement("circle",{className:"linechart_point",style:{stroke:t},r:a,cx:this.state.activePoint.svgX,cy:this.state.activePoint.svgY})}},{key:"createLine",value:function(){var e=this.props,t=e.svgHeight,a=e.xLabelSize;return r.a.createElement("line",{className:"hoverLine",x1:this.state.hoverLoc,y1:-8,x2:this.state.hoverLoc,y2:t-a})}},{key:"render",value:function(){var e=this,t=this.props,a=t.svgHeight,n=t.svgWidth;return r.a.createElement("div",null,r.a.createElement("svg",{width:n,height:a,viewBox:"0 0 ".concat(n," ").concat(a),className:"linechart",onMouseLeave:function(){return e.stopHover()},onMouseMove:function(t){return e.getCoords(t)}},r.a.createElement("linearGradient",{x1:"0",y1:"0",x2:"100%",y2:"100%",id:"gradient"},r.a.createElement("stop",{stopColor:"#c86dd7",offset:"0"}),r.a.createElement("stop",{stopColor:"#3023ae",offset:"100%"})),r.a.createElement("g",{fill:"url(#gradient)"},this.makeAxis(),this.makePath(),this.makeArea(),this.makeLabels(),this.state.hoverLoc?this.createLine():null,this.state.hoverLoc?this.makeActivePoint():null)))}}]),a}(n.Component);d.defaultProps={data:[],color:"#FFBE3B",pointRadius:5,svgHeight:450,svgWidth:1200,xLabelSize:20,yLabelSize:80};var p=d,f=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.hoverLoc,a=e.activePoint,n=document.getElementsByClassName("linechart")[0].getBoundingClientRect(),i={};return i.width="100px",i.left=t+n.left-50,r.a.createElement("div",{className:"hover",style:i},r.a.createElement("div",{className:"date"},a.d),r.a.createElement("div",{className:"price"},a.p))}}]),a}(n.Component),y=(a(15),function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={fetchingData:!0,data:null,hoverLoc:null,activePoint:null},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;console.log("App Component Mounted");fetch("https://api.coindesk.com/v1/bpi/historical/close.json").then((function(e){return e.json()})).then((function(t){var a=[],n=0;for(var r in t.bpi)a.push({date:v()(r).format("MMM Do YY"),pDollars:t.bpi[r].toLocaleString("us-EN",{style:"currency",currency:"USD"}),index:n,pValue:t.bpi[r]}),n++;e.setState({data:a,fetchingData:!1})})).catch((function(e){console.log(e)}))}},{key:"handleHover",value:function(e,t){this.setState({hoverLoc:e,activePoint:t})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"main"},r.a.createElement("div",{className:"title"},r.a.createElement("h1",null,"Bitcoin Tracker")),r.a.createElement("div",{className:"StatsDisplay_container"},this.state.data?r.a.createElement(m,{data:this.state.data}):null),r.a.createElement("div",{className:"linechart_title"},r.a.createElement("h3",null,"Line Chart ",r.a.createElement("i",{className:"fa fa-line-chart","aria-hidden":"true"})," ")),r.a.createElement("div",{className:"ToolTip_container"},this.state.hoverLoc?r.a.createElement(f,{hoverLoc:this.state.hoverLoc,activePoint:this.state.activePoint}):null),r.a.createElement("div",{className:"LineChart_container"},this.state.fetchingData?null:r.a.createElement(p,{data:this.state.data,onHover:function(t,a){return e.handleHover(t,a)}})),r.a.createElement("div",{className:"Reference"},r.a.createElement("a",{href:"https://www.coindesk.com/price/bitcoin",target:"_blank"},"Powered by CoinDesk")))}}]),a}(r.a.Component));a(16),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,a){e.exports=a(17)}},[[8,1,2]]]);
//# sourceMappingURL=main.f14336cf.chunk.js.map