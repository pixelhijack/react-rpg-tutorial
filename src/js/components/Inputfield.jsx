import React from 'react';

var Inputfield = React.createClass({
	handleKeyPress: function(e){
		console.log('Inputfield value', e.target.value);
	},
	render: function(){
		return (
			<input 
				className='inputfield'
                type='text'
                onKeyPress={this.handleKeyPress} 
                value={this.props.text}/>
		);
	}
});

module.exports = Inputfield;