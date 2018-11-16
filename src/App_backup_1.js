import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {			
			videos_id: [],
			videos: []
		}
	}
	render() {
		return (
			<Router>
				<div className="App">
					<div className="app-layer"></div>
					<div className="content">
						<header>
							<Link to="#"><img src="./images/meeopp-logo.png" alt="" /></Link>
							<Link to="#"><img src="./images/yt-logo.png" alt="" /></Link>
						</header>
						<div className="search">
							<Form>
								<FormGroup>
									<Input id="user-search "placeholder="Meeopp" type="text" name="search"/>
									<button onClick={this.handleOnClick}>Search</button>
								</FormGroup>
							</Form>
						</div>
						<div className="videos">
						
							<div className="single-vdo">
								<div className="vdo-desc">
									<div className="vdo-title vdo-misc">
										<i className="fas fa-ellipsis-v fa-fw"></i>
										<p>Lorem ipsum dolor sit amet</p>
									</div>
									<div className="vdo-author vdo-misc">
										<i className="fas fa-user fa-fw"></i>
										<p>Charley Graves</p>
									</div>
									<div className="vdo-views vdo-misc">
										<i className="far fa-eye fa-fw"></i>
										<p>333</p>
									</div>
									<div className="vdo-comments vdo-misc">
										<i className="far fa-comments fa-fw"></i>
										<p>128</p>
									</div>
								</div>
								<div className="vdo-wrapper">
									<iframe src="https://www.youtube.com/embed/-vH2eZAM30s" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</Router>
		);
	}
	handleOnClick = (e) => {
		e.preventDefault();
		console.log("handle on click");
		let q = e.target.previousElementSibling.value;
		if(q.length === 0){
			alert("Please enter search keyword");
			return false;
		}
		var API_key = "AIzaSyDpaRdTu7tVJpiYQVkvIvyrdjTwN2ryoeo";
		var maxResults = 100;
		var url =
		  "https://www.googleapis.com/youtube/v3/search?key=" +
		  API_key +
		  "&part=snippet,id&order=date&q="+q+"&maxResults=" +
		  maxResults;
		
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
		  if(this.readyState == 4 && this.status == 200){
			  var data = JSON.parse(xhr.responseText);
				console.log(data);
		  }
		}
		xhr.open("GET", url);
		xhr.send();
  
	}
	componentDidMount() {
		var that = this;
		var API_key = "AIzaSyDpaRdTu7tVJpiYQVkvIvyrdjTwN2ryoeo";
		var maxResults = 10;
		var url =
		  "https://www.googleapis.com/youtube/v3/search?key=" +
		  API_key +
		  "&part=snippet,id&order=date&q=meeopp&maxResults=" +
		  maxResults;

		fetch(url)
		  .then(function(response) {
			if (response.status >= 400) {
			  throw new Error("Bad response from server");
			}
			return response.json();
		  })
		  .then(function(data) {
			let tempArr = [];
			for(let i=0; i<data.items.length; i++){
			  tempArr.push(data.items[i].id.videoId);
			}
			var modifiedArr = tempArr.filter( (item) => {return item !== undefined});
			let infoArr = [];
			for(let i=0; i<modifiedArr.length; i++){				
				that.getSingleVdo(modifiedArr[i], infoArr);
			}
			that.setState({videos_id: infoArr}, () => {console.log(that.state.videos_id)});
		  })
		  .catch(error => {
			console.error(error);
		  });
		  
	}
	getSingleVdo = (id, arr) => {
		var xhr = new XMLHttpRequest();
		var data;
		xhr.onreadystatechange = function(){
		  if(xhr.readyState == 4 && xhr.status == 200){
			  data = JSON.parse(xhr.responseText);
			  arr.push(data);
		  }
		}
		xhr.open("GET", "https://www.googleapis.com/youtube/v3/videos?id="+id+"&key=AIzaSyDpaRdTu7tVJpiYQVkvIvyrdjTwN2ryoeo&part=snippet,statistics", true);
		xhr.send();
	}
}

export default App;
