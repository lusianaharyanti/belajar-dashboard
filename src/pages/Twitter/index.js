import React, { Component } from 'react';
// import { Route, NavLink, HashRouter } from "react-router-dom";
import axios from 'axios';


import logodua from '../../twitter.png';
import '../../App.css';


class Twitter extends Component {                                   
	constructor(props){                                             
		super(props);

		this.handelInputchange = this.handelInputchange.bind(this); 
		this.handleClick = this.handleClick.bind(this);  
		this.renderHasil = this.renderHasil.bind(this);
		this.handleDetailClick = this.handleDetailClick.bind(this);             


		this.state={
			newData : [],                                               
			url: '',
			baru:'',
			count: 0,
			fullname:'',
			buttonClicked: false,
			buttonClick: false,
			value: this.props.default
		};
		// const apiKey = '4e14eec447c8433cb452d6b89551f003';
		// const apiUrl = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=';
		// this.url = apiUrl + apiKey;
		// literals
		// concat = 'ayam' + ' ' + 'goreng'
		this.apiUrl = 'https://apps.twitter.com/app/15442415/B1S1t4C6daCwvYhivbKtoMIJS';

	}

	componentDidMount() {
		axios.get(this.apiUrl).then(res => {
			this.setState({ newData: res.data.user });
			this.setState({ count: res.data.user.length });

		});
	}

	handelInputchange({ target }) {                                  
		const { value } = target;
		const { newData } = this.state;
		const url = newData.filter(user => user.name.toLowerCase().search(value.toLowerCase()))
		console.log(url);
	}

	handleClick() { 				//untuk button seacrh news
		this.setState({
			buttonClicked: true,
		})
	}  

	handleDetailClick(twitter, e) {	//untuk menampilkan data
		this.props.history.push({
			pathname: `/pages/Hasil/`,
			state: {	
				id: twitter.id, 
				url: twitter.author,
				description: twitter.description,
				images: twitter.profile_image_url_https
			}
		})
	}

	renderHasil() {
		const { newData, buttonClicked } = this.state;     
		console.log(newData)
		if (buttonClicked && newData && newData[0]) {      
			return (
				<div>   
				<h4 className="output">Select from {this.state.count} Twitter View</h4>
				<ul>
				{this.state.newData.map((twitter, i) => {     
					return (
						<li className="output" key={i}>       
						
						<strong className="output" onClick={this.handleDetailClick.bind(this, twitter)}>{twitter.name}</strong>
						<br/>
						<div className="output">{twitter.id}</div>
						<div className="output">{twitter.author}</div>
						<div className="output">{twitter.description}</div>
						<div className="output2"><img src={twitter.profile_image_url_https}/></div>
						</li>
					);
				})
			}
			</ul>
			</div>
			)
		} else {
			return;
		}
	}

	render() {
		return (

			<div className="App"> 
			<img src={logodua} className="logo2" alt="pict"/> 
			

			<div id="inti">
			<input className="inputan" 
				type="text"
				name='search'
				value ={this.props.data}
				onChange={this.handelInputchange}
			/>

			<button className="btn" 
			type="button" 
			onClick={this.handleClick}>
			Search Tweet
			</button>

			<div  id="hasil-pencarian">
				{this.renderHasil()}
			</div>

			<div>
			<p className="App-intro"> {this.state.url} </p>
			</div>
			</div>
			</div>    
			);
	}
}

export default Twitter;