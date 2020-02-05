import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserRegister from "./pages/UserRegister";
// import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
	state = {
		isAuthenticated: false,
		userData: {}
	};

	

	assignUser = userData => {
		this.setState({ userData: userData });
	};

	isAuthenticated = () => {
		this.setState({ isAuthenticated: true });
	};

	render() {
		console.log("State from App Component: ", this.state);
		return (
			<Router>
				<div>
					<NavBar />
					<Switch>
						{/* Landing Page Route */}
						<Route
							exact
							path="/"
							render={props => <Landing isAuthed={this.isAuthenticated} assignUser={this.assignUser} userData={this.state.userData} />}
						/>
						{/* Initial User Signup Route */}
						<Route exact path="/register" render={props => <Register />} />
						{/* User Profile/Dashboard Route */}
						<PrivateRoute exact path="/dashboard" isAuthed={this.state.isAuthenticated}>
							<Dashboard />
						</PrivateRoute>
						{/* Secondary User Registration Route */}
						<Route path="/userRegister" component={UserRegister} />
						{/* Catch all Route - 404 page */}
						<Route path="*" component={() => <p> 404 Page not found </p>} />
					</Switch>
				</div>
			</Router>
		);
	}
}

// If state.isAuthenticated is true
// Function will return a router component and render children component
// else it will return a router component with a Redirect component
function PrivateRoute({ children, isAuthed, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthed ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

export default App;
