import React, { Component } from 'react';
// import { Route, NavLink, HashRouter } from "react-router-dom";
import axios from 'axios';


import logodua from '../../Google.png';
import '../../App.css';


class Google extends Component {                                 
	constructor(props){                                        
		super(props);

		this.handelInputchange= this.handelInputchange.bind(this);    
		this.handleClick = this.handleClick.bind(this);               
		this.renderHasil = this.renderHasil.bind(this); 
		this.handleDetailClick = this.handleDetailClick.bind(this);              


		this.state = {
			newData : [],                                               
			url : '',
			baru : '',
			count : 0,
			fullname : '',
			buttonClicked : false,
			buttonClick : false,
			value : this.props.default
		};
		// const apiKey = '4e14eec447c8433cb452d6b89551f003';
		// const apiUrl = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=';
		// this.url = apiUrl + apiKey;
		// literals
		// concat = 'ayam' + ' ' + 'goreng'
		this.apiUrl = 'http://api.apixu.com/v1/current.json?key=205d45eadda6463f84335112180608&q=indonesia';

	}

	

	componentDidMount() {
		axios.get(this.apiUrl).then(res => {
			this.setState({ newData: res.data.location });
			this.setState({ count: res.data.location.length });

		});
	}

	handelInputchange({ target }) {                                  
		const { value } = target;
		const { newData } = this.state;
		const url = newData(location => location.name.toLowerCase().search(value.toLowerCase()))
		console.log(url);
	}

	handleClick() { 				//untuk button seacrh news
		this.setState({
			buttonClicked: true,
		})
	}  

	handleDetailClick(wheater, e) {	//untuk menampilkan data
		this.props.history.push({
			pathname: `/pages/Details/`,
			state: {	
				name: wheater.name, 
				lat: wheater.lat,
				lon: wheater.lon,
				tz_id: wheater.tz_id,
				local : wheater.localtime
			}
		})
	}

	renderHasil() {
		const { newData, buttonClicked } = this.state;     
		console.log(newData)
		if (buttonClicked && newData && newData[0]) {      
			return (
				<div>   
				<h4 className="output">Select from {this.state.count} wheater View</h4>
				<ul>
				{this.state.newData.map((wheater, i) => {     
					return (
						<li className="output" key={i}>       
						
						<strong className="output" onClick={this.handleDetailClick.bind(this, wheater)}>{wheater.name}</strong>
						<br/>
						<div className="output">{wheater.name}</div>
						<div className="output">{wheater.lat}</div>
						<div className="output">{wheater.lon}</div>
						<div className="output">{wheater.tz_id}</div>
						<div className="output">{wheater.localtime}</div>
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
				name="city"
				placeholder="Input Your City"
				value ={this.props.data}
				onChange={this.handelInputchange}
			/>

			<button className="btn" 
			type="button" 
			onClick={this.handleClick}>
			Search Wheater
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

export default Google;