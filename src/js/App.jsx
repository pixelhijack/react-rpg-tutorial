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
					questions:[{
						condition: {

						}, 
						question: {
							text: '\nYou\'ve just entered to the hall of fame where you see many heros and their weapons.\n A door opens immediately in front of you and after a while the walls starts to move.\n Do you try to get a weapon (sword) before running through the door?\n'
						}
					}],
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
					questions: [{
						condition: {
							weapon: true
						},
						question: {
							text: '\nYou\'ve just entered to the room of the Great Lion and it sees you. You have a weapon so starts to attack you to save its own life.\n Do you drop your weapon down immediately?\n'
						}
					}, {
						condition: {
							weapon: false
						}, 
						question: {
							text: '\nYou\'ve just entered to the room of the Great Lion and it sees you. You don\'t have a weapon so it starts to approach you smoothly.\n Do you pet the Great Lion?\n'
						}
					}],
					outcomes: [{
						condition: {
							weapon: true,
							answer: true
						},
						result: {
							text: 'The Great Lion let you take your weapon back and pass through.\n',
							next: 'inTheLandlordsSecretChamber'
						}
					},{
						condition: {
							weapon: false,
							answer: true
						},
						result: {
							weapon: true,
							text: 'The Great Lion gave you a weapon for such kindness.\n',
							next: 'inTheLandlordsSecretChamber'
						}
					},{
						condition: {
							weapon: true,
							answer: false
						},
						result: {
							text: 'You poor... What did you think? You cannot defeat the Great Lion.\n',
							next: 'inTheCemetery'
						}
					},{
						condition: {
							weapon: false,
							answer: false
						},
						result: {
							text: 'The Great Lion is sad but let you to pass through.\n',
							next: 'inTheLandlordsSecretChamber'
						}
					}]
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
	getQuestion: function(room){
		var the = room.questions.find(function(question){
			return _.isMatch(this.state, question.condition);
		}.bind(this));

		return the.question.text;
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
				<Textbox text={this.getQuestion(this.getRoom(this.state.room))}></Textbox>
				<Inputfield onKeyUp={this.onAppKeyUp}/>
			</div>
		);
	}
});

module.exports = App;