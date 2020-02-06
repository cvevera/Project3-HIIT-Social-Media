import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

class Landing extends Component {
	state = {
		email: "",
		password: "",
		redirect: null
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.email && this.state.password) {
			API.getUser({
				email: this.state.email,
				password: this.state.password
			})
				.then(res => {
					this.props.isAuthed();
					this.props.assignUser(res.data);
					if (res.data.firstName){
						this.setState({redirect: "/dashboard"});
					}
					else{
						this.setState({redirect: "/userRegister"});
					}
					
				})
				.catch(err => console.log(err));
		}
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		return (
			<div className="container rounded shadow p-4 mt-4 w-25">
				<h4>Login</h4>
				<form>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							className="form-control"
							onChange={this.handleInputChange}
							value={this.state.email}
							name="email"
							id="email"
							type="email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							className="form-control"
							onChange={this.handleInputChange}
							value={this.state.password}
							name="password"
							id="password"
							type="password"
						/>
					</div>

					<button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Landing;
