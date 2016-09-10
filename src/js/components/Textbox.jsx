import React from 'react';

var Textbox = React.createClass({
    render: function(){
    	return(
    		<div className='textbox'>
    			{this.props.text}
    		</div>
    	);
    }
});

module.exports = Textbox;