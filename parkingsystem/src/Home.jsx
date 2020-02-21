import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Home extends Component {
  state = {
    login_nick: "",
    canStyle: "inline-block",
    cantStyle: "none"
  };

  memberInsert = () => {
    const send_param = {
      headers,
      number: this.numberE.value,
      size: this.sizeE.value
    };
    axios
      .post("http://localhost:8080/member/insert", send_param)
      .then(returnData => {
        if (returnData.data.message) {
          this.setState({
            number: returnData.data.message
          });
        } else {
          alert("오류");
        }
        console.log(returnData.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const canStyle = {
      display: this.state.canStyle
    };
    const cantStyle = {
      display: this.state.cantStyle
    };

    if (this.state.name) {
      return (
        <div>
          <h2>{this.state.name}님 회원 가입 되셨습니다.</h2>
        </div>
      );
    } else {
      return (
        <div>
          <div style={canStyle}>
            <p>주차장 이용하기</p>
            차 번호
            <input ref={ref => (this.numberE = ref)} />
            <br />차 크기
            <select ref={ref => (this.sizeE = ref)}>
              <option value="small">경차</option>
              <option value="medium">중형차</option>
              <option value="big">대형차</option>
            </select>
            <br />
            <button onClick={this.memberInsert}>이용하기</button>
          </div>
          <div style={cantStyle}>
            <h1>현재 남아있는 주차장이 없습니다.</h1>
          </div>
        </div>
      );
    }
  }
}

export default Home;
