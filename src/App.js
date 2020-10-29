import React, { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = { monsters: [], searchField: '' };
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((res) => res.json())
			.then((users) => {
				console.log(users);
				this.setState((state) => ({
					...state,
					monsters: [...users, ...state.monsters],
				}));
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	searchFieldHandler = (e) => {
		this.setState({searchField: e.target.value});
	}

	render() {
		const { monsters, searchField } = this.state;
		const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLocaleLowerCase()));

		return (
			<div className='App'>
				<h1>Monsters Rolodex</h1>
				<SearchBox placeholder='search monsters' onChange={this.searchFieldHandler} />
				<CardList monsters={filteredMonsters} />
			</div>
		);
	}
}

export default App;
