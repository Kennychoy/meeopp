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
									<Input id="user-search "placeholder="Meeopp" type="text" name="search" />
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
							
							{this.state.videos.map((item, i) => {
								return (
									<div className="single-vdo" key={i} data-id={item.id}>
										<div className="vdo-desc">
											<div className="vdo-title vdo-misc">
												<i className="fas fa-ellipsis-v fa-fw"></i>
												<p>{item.snippet.title}</p>
											</div>
											<div className="vdo-author vdo-misc">
												<i className="fas fa-user fa-fw"></i>
												<p>{item.snippet.channelTitle}</p>
											</div>
											<div className="vdo-views vdo-misc">
												<i className="far fa-eye fa-fw"></i>
												<p>{item.statistics.viewCount}</p>
											</div>
											<div className="vdo-comments vdo-misc">
												<i className="far fa-comments fa-fw"></i>
												<p>{item.statistics.likeCount}</p>
											</div>
										</div>
										<div className="vdo-wrapper">
											<img src={item.snippet.thumbnails.high.url} alt="" />
										</div>
									</div>
								);
							})}
							
						</div>
					</div>
				</div>
			</Router>
		);
	}
	handleOnClick = (e) => {
		e.preventDefault();
		console.log("handle on click");
		let q = encodeURIComponent(e.target.previousElementSibling.value);
		if(q.length === 0){
			alert("Please enter search keywords");
			return false;
		}
		let API_key = "AIzaSyDpaRdTu7tVJpiYQVkvIvyrdjTwN2ryoeo";
		let maxResults = 50;
		let url = `https://www.googleapis.com/youtube/v3/search?key=${API_key}&part=snippet,id&order=viewCount&q=${q}&maxResults=${maxResults}`;
		let idArr = [];
		let infoArr = [];
		fetch(url)
		.then(response => response.json())
		.then(data => {
			for(let i=0; i<data.items.length; i++){
				idArr.push(data.items[i].id.videoId);
			}
			return idArr;			
		})
		.then(arr => {
			let ids = arr.toString();
			fetch("https://www.googleapis.com/youtube/v3/videos?id="+ids+"&key=AIzaSyDpaRdTu7tVJpiYQVkvIvyrdjTwN2ryoeo&part=snippet,statistics")
			.then(res => res.json())
			.then(data => {
				this.setState({videos: data.items}, console.log(this.state.videos))
			});
		});
	}
	componentDidMount(){
		let idArr = [];
		fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDpaRdTu7tVJpiYQVkvIvyrdjTwN2ryoeo&part=snippet,id&order=viewCount&q=meeopp&maxResults=50")
		.then(res => res.json())
		.then(data => {
			for(let i=0; i<data.items.length; i++){
				idArr.push(data.items[i].id.videoId);
			}
			return idArr;
		})
		.then(arr => {
			let ids = arr.toString();
			fetch("https://www.googleapis.com/youtube/v3/videos?id="+ids+"&key=AIzaSyDpaRdTu7tVJpiYQVkvIvyrdjTwN2ryoeo&part=snippet,statistics")
			.then(res => res.json())
			.then(data => {
				this.setState({videos: data.items}, console.log(this.state.videos))
			});
		})
	}
}

export default App;
