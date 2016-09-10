import React from 'react';

var Inputfield = React.createClass({
	handleKeyUp: function(e){
		console.log('Inputfield value', e.target.value);
	},
	render: function(){
		return (
			<input 
				className='inputfield'
                type='text'
                placeholder='What do you want to do?'
                onKeyUp={this.props.onKeyUp || this.handleKeyUp} 
                value={this.props.text}/>
		);
	}
});

module.exports = Inputfield;