import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Home extends Component {
  memberInsert = () => {
    const send_param = {
      //서버에 전송할 데이터
      headers,
      number: this.numberE.value,
      size: this.sizeE.value
    };
    axios
      .post("http://localhost:8080/member/find", headers) //post형식으로 전송
      .then(returnData => {
        if (returnData.data.message) {
          console.log(returnData.data.message);
          const changenumber = returnData.data.message; //update쪽으로 전송할 데이터 형식 변경
          axios
            .post("http://localhost:8080/member/update", {
              send_param,
              changenumber
            })
            .then(returnData => {
              if (returnData.data.message) {
                alert(changenumber + "번 주차장 사용합니다.");
              } else {
                alert("오류");
              }
            });
        } else {
          alert("이용 불가능");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
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
        <Button variant="secondary" onClick={this.memberInsert}>
          이용하기
        </Button>
      </div>
    );
  }
}

export default Home;
