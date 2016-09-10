import React from 'react';
import Inputfield from './components/Inputfield.jsx';
import Textbox from './components/Textbox.jsx';

var App = React.createClass({
	getInitialState: function(){
		return {
			rooms: [
				{
					id: 'inTheHallOfFame',
					name: 'In the Hall of Fame',
					question:'\nYou\'ve just entered to the hall of fame where you see many heros and their weapons.\n A door opens immediately in front of you and after a while the walls starts to move.\n Do you try to get a weapon (sword) before running through the door?\n',
					next: 'inTheThroatOfTheGreatLion'
				}, {
					id: 'inTheThroatOfTheGreatLion',
					name: 'In the Throat of the Great Lion',
					question: '\nYou\'ve just entered to the room of the Great Lion and it sees you. You have a weapon so starts to attack you to save its own life.\n Do you drop your weapon down immediately?\n',
					next: 'inTheLandlordsSecretChamber'
				}
			], 
			currentRoom: 'inTheHallOfFame'
		};
	},
	getRoom: function(id){
		return this.state.rooms.find(function(room){
			return room.id === id;
		});
	},
	onAppKeyUp: function(e){
		if(e.target.value === 'yes'){
			this.setState({ 
				currentRoom: this.getRoom(this.state.currentRoom).next
			});
		}		
	},
	render: function(){
		console.log('State changed, rerendering! State: ', this.state);
		return(
			<div>
				<h1>{this.getRoom(this.state.currentRoom).name}</h1>
				<Textbox text={this.getRoom(this.state.currentRoom).question}></Textbox>
				<Inputfield onKeyUp={this.onAppKeyUp}/>
			</div>
		);
	}
});

module.exports = App;