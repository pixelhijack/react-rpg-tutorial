import _ from 'underscore';
import React from 'react';
import Inputfield from './components/Inputfield.jsx';
import Textbox from './components/Textbox.jsx';

var App = React.createClass({
	getDefaultProps: function(){
		return {
			rooms: [
				{
					id: 'inTheHallOfFame',
					name: 'In the Hall of Fame',
					question:'\nYou\'ve just entered to the hall of fame where you see many heros and their weapons.\n A door opens immediately in front of you and after a while the walls starts to move.\n Do you try to get a weapon (sword) before running through the door?\n',
					outcomes: [{
						condition: {
							answer: true
						}, 
						result: {
							weapon: true,
							room: 'inTheThroatOfTheGreatLion'
						}
					},{
						condition: {
							answer: false
						}, 
						result: {
							weapon: false,
							room: 'inTheThroatOfTheGreatLion'
						}
					}]
				}, {
					id: 'inTheThroatOfTheGreatLion',
					name: 'In the Throat of the Great Lion',
					question: '\nYou\'ve just entered to the room of the Great Lion and it sees you. You have a weapon so starts to attack you to save its own life.\n Do you drop your weapon down immediately?\n',
					next: 'inTheLandlordsSecretChamber'
				}
			]
		}
	},
	getInitialState: function(){
		return { 
			room: 'inTheHallOfFame',
			weapon: false
		};
	},
	getRoom: function(id){
		return this.props.rooms.find(function(room){
			return room.id === id;
		});
	},
	translateAnswer: function(answer){
		if(answer === 'yes'){
			return true;
		}else if(answer === 'no'){
			return false;
		}else{
			return undefined;
		};
	},
	onAppKeyUp: function(e){
		var next, 
			typed = this.translateAnswer(e.target.value);

		if(typed !== 'undefined'){
			next = this.getRoom(this.state.room).outcomes.find(function(outcome){
				return _.isMatch({
					answer: typed
				}, outcome.condition);
			}.bind(this));

			if(next){
				this.setState(next.result);
			}
		}	
	},
	render: function(){
		console.log('State changed, rerendering! State: ', this.state);
		return(
			<div>
				<h1>{this.getRoom(this.state.room).name}</h1>
				<Textbox text={this.getRoom(this.state.room).question}></Textbox>
				<Inputfield onKeyUp={this.onAppKeyUp}/>
			</div>
		);
	}
});

module.exports = App;