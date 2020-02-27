import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Fee extends Component {
  state = {
    resultCheckTheFee: ""
  };
  checkfee = () => {
    axios
      .post("http://localhost:8080/member/checkcheck", headers)
      .then(returnData => {
        if (returnData.data.message) {
          const checkTheFee = returnData.data.message;
          this.setState({
            resultCheckTheFee: checkTheFee
          });
        } else {
          alert("오류");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <p>전체 수입</p>
        <button onClick={this.checkfee}>요금 조회하기</button>
        <br />
        {this.state.resultCheckTheFee}원
      </div>
    );
  }
}

export default Fee;
