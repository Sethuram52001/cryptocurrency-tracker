import React from 'react';

const api_url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

class Graph extends React.Component {
	
	state={}

	render() {
		return (
			<div>
				<svg width="100" height="100">
					<circle cx="50" cy="50" r="40" />
				</svg>
			</div>
		);
	}
}

export default Graph;