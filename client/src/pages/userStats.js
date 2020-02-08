import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
// import Input from "../components/Input";
import StatUpdateBlock from "../components/statUpdateBlock";

class UserStats extends Component {
	state = {
		height: "",
		heightCurrent: this.props.userData.height.height,
		heightEdit: this.props.userData.height.height ? false : true,
		backSquat: "",
		backSquatCurrent: this.props.userData.backSquat.backSquat,
		backSquatEdit: this.props.userData.backSquat.backSquat ? false : true,
		cleanJerk: "",
		cleanJerkCurrent: this.props.userData.cleanJerk.cleanJerk,
		cleanJerkEdit: this.props.userData.cleanJerk.cleanJerk ? false : true,
		snatch: "",
		snatchCurrent: this.props.userData.snatch.snatch,
		snatchEdit: this.props.userData.snatch.snatch ? false : true,
		deadlift: "",
		deadliftCurrent: this.props.userData.deadlift.deadlift,
		deadliftEdit: this.props.userData.deadlift.deadlift ? false : true,
		overHeadPress: "",
		overHeadPressCurrent: this.props.userData.overHeadPress.overHeadPress,
		overHeadPressEdit: this.props.userData.overHeadPress.overHeadPress ? false : true,
		maxPullUps: "",
		maxPullUpsCurrent: this.props.userData.maxPullUps.maxPullUps,
		maxPullUpsEdit: this.props.userData.maxPullUps.maxPullUps ? false : true,
		fran: "",
		franCurrent: this.props.userData.fran.fran,
		franEdit: this.props.userData.fran.fran ? false : true,
		grace: "",
		graceCurrent: this.props.userData.grace.grace,
		graceEdit: this.props.userData.grace.grace ? false : true,
		hellen: "",
		hellenCurrent: this.props.userData.hellen.hellen,
		hellenEdit: this.props.userData.hellen.hellen ? false : true,
		fiveK: "",
		fiveKCurrent: this.props.userData.fiveK.fiveK,
		fiveKEdit: this.props.userData.fiveK.fiveK ? false : true,
		fourHundredMeter: "",
		fourHundredMeterCurrent: this.props.userData.fourHundredMeter.fourHundredMeter,
		fourHundredMeterEdit: this.props.userData.fourHundredMeter.fourHundredMeter ? false : true,
		redirect: null
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	editMode = field => {
		let fieldEdit = field+"Edit";
		this.setState({
			[fieldEdit]: true
		})
	}

	handleFormSubmit = event => {
		event.preventDefault();
		let dataArray = [
		{height: this.state.height},
		{backSquat: this.state.backSquat},
		{cleanJerk: this.state.cleanJerk},
		{snatch: this.state.snatch},
		{deadlift: this.state.deadlift},
		{overHeadPress: this.state.overHeadPress},
		{maxPullUps: this.state.maxPullUps},
		{fran: this.state.fran},
		{grace: this.state.grace},
		{hellen: this.state.hellen},
		{fiveK: this.state.fiveK},
		{fourHundredMeter: this.state.fourHundredMeter},
		];
		let filteredDataArray  = dataArray.filter(value => Object.values(value) != "");
		console.log(filteredDataArray);
			if (filteredDataArray) {
				API.updateStats({
		            filteredDataArray
				})
					.then(res => {
		      console.log(res.data);
		      this.props.assignUser(res.data);
						this.setState({ redirect: "/dashboard" });
					})
					.catch(err => console.log(err));
			} else {
		  console.log("First name and Last name are required");
		}
	};

	render() {
		console.log(this.props.userData.backSquat.backSquat)
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}

		return (
			<div className="container rounded shadow p-4 mt-4 w-25">
				<h4>User Registration</h4>
				<form>

				<StatUpdateBlock
					name = "height"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.height}
					edit = {this.editMode}
					currentState = {this.state.heightCurrent}
					editState = {this.state.heightEdit}
				>
					Height
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "backSquat"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.backSquat}
					edit = {this.editMode}
					currentState = {this.state.backSquatCurrent}
					editState = {this.state.backSquatEdit}
				>
					Back Squat
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "cleanJerk"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.cleanJerk}
					edit = {this.editMode}
					currentState = {this.state.cleanJerkCurrent}
					editState = {this.state.cleanJerkEdit}
				>
					Clean Jerk
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "snatch"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.snatch}
					edit = {this.editMode}
					currentState = {this.state.snatchCurrent}
					editState = {this.state.snatchEdit}
				>
					Snatch
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "deadlift"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.deadlift}
					edit = {this.editMode}
					currentState = {this.state.deadliftCurrent}
					editState = {this.state.deadliftEdit}
				>
					Dead Lift
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "overHeadPress"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.overHeadPress}
					edit = {this.editMode}
					currentState = {this.state.overHeadPressCurrent}
					editState = {this.state.overHeadPressEdit}
				>
					Over Head Press
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "maxPullUps"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.maxPullUps}
					edit = {this.editMode}
					currentState = {this.state.maxPullUpsCurrent}
					editState = {this.state.maxPullUpsEdit}
				>
					Max Pull Ups
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "fran"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.fran}
					edit = {this.editMode}
					currentState = {this.state.franCurrent}
					editState = {this.state.franEdit}
				>
					Fran
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "grace"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.grace}
					edit = {this.editMode}
					currentState = {this.state.graceCurrent}
					editState = {this.state.graceEdit}
				>
					Grace
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "hellen"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.hellen}
					edit = {this.editMode}
					currentState = {this.state.hellenCurrent}
					editState = {this.state.hellenEdit}
				>
					Hellen
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "fiveK"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.fiveK}
					edit = {this.editMode}
					currentState = {this.state.fiveKCurrent}
					editState = {this.state.fiveKEdit}
				>
					Five K
				</StatUpdateBlock>

				<StatUpdateBlock
					name = "fourHundredMeter"
					type = "number"
					change = {this.handleInputChange}
					state = {this.state.fourHundredMeter}
					edit = {this.editMode}
					currentState = {this.state.fourHundredMeterCurrent}
					editState = {this.state.fourHundredMeterEdit}
				>
					Four Hundred Meter
				</StatUpdateBlock>

					<button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>
						Submit
					</button>
				</form>
			</div>
		);
	}
}
export default UserStats;
