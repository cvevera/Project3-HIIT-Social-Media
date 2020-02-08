import React from "react";
import Wrapper from "../components/Wrapper";
import Row from "../components/Row";
// import MembersCard from "../components/MembersCard";
import UserInfo from "../components/UserInfo";
import WodCard from "../components/wodCard";
import UserStatsCard from "../components/StatsCard";

function Dashboard(props) {
		return (
      <Wrapper>
        <Row>
          <UserInfo userData= {props.userData}/>
          <WodCard />
        </Row>
        <Row>
        {/* <UserStatsCard userData= {props.userData}/> */}
        </Row>
      </Wrapper>
		);
}

export default Dashboard;
