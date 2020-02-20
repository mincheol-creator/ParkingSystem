import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Home extends Component {
  state = {
    name: ""
  };
  memberInsert = () => {
    const send_param = {
      headers,
      name: this.nameE.value,
      email: this.emailE_Contact.value,
      pw: this.pwE_Contact.value,
      comments: this.commentsE.value
    };
    axios
      .post("http://localhost:8080/member/insert", send_param)
      .then(returnData => {
        if (returnData.data.message) {
          this.setState({
            name: returnData.data.message
          });
        } else {
          alert("회원가입오류");
        }
        console.log(returnData.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if (this.state.name) {
      return (
        <div>
          <h2>{this.state.name}님 회원 가입 되셨습니다.</h2>
        </div>
      );
    } else {
      return (
        <div>
          <div /* style={loginStyle} */>
            <p>로그인</p>
            E-MAIL
            <input ref={ref => (this.emailE = ref)} />
            <br />
            Password
            <input type="password" ref={ref => (this.pwE = ref)} />
            <br />
            <button onClick={this.login}>Login</button>
            <button>Join</button>
            <p>회원가입</p>
            이름
            <input ref={ref => (this.nameE = ref)} />
            <br />
            이메일
            <input ref={ref => (this.emailE_Contact = ref)} />
            <br />
            비밀번호
            <input ref={ref => (this.pwE_Contact = ref)} />
            <br />
            comments
            <input ref={ref => (this.commentsE = ref)} />
            <br />
            <button onClick={this.memberInsert}>회원가입</button>
          </div>
          <div /* style={logoutStyle} */>
            {" "}
            {/* {login_nick} */}님 환영합니다
            <button onClick={this.logout}>Logout</button>
          </div>
        </div>
      );
    }
  }
}

export default Home;
