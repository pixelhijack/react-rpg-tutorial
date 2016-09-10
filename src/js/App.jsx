import React from 'react';
import Inputfield from './components/Inputfield.jsx';
import Textbox from './components/Textbox.jsx';

var App = React.createClass({
	render: function(){
		return(
			<div>
				<Textbox text='Hello I am a dummy textbox.'></Textbox>
				<Inputfield />
			</div>
		);
	}
});

module.exports = App;