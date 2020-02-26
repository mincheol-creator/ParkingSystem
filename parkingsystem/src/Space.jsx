import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Space extends Component {
  state = {
    notuseStyle: "inline-block",
    useStyle: "none",
    resultCarNumber: []
  };

  goOut = () => {
    alert();
    /*   const send_param = {
      headers,
      number: parkingnumber
    };
    axios
      .post("http://localhost:8080/member/out", send_param)
      .then(returnData => {
        if (returnData.data.message) {
          console.log(returnData.data.message);
        } else {
          alert("오류");
        }
        //console.log(returnData.data.message);
      })
      .catch(err => {
        console.log(err);
      }); */
  };

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  parkinglot = () => {
    axios
      .post("http://localhost:8080/member/findall", headers)
      .then(returnData => {
        if (returnData.data.message) {
          const carNumbers = returnData.data.message;
          const carNumberList = carNumbers.map((item, i) => (
            <td key={i}>
              주차장 번호 : {item.parkingnumber}
              <br />차 번호 : {item.carnumber}
              <br />차 크기 : {item.size}
              <br />
              입고 시간 : {item.updated_at}
              <br />
              <button onClick={this.goOut}>종료</button>
            </td>
          ));

          console.log(carNumberList);

          this.setState({
            resultCarNumber: carNumberList
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
    const notuseStyle = {
      display: this.state.notuseStyle
    };
    const useStyle = {
      display: this.state.useStyle
    };
    return (
      <div>
        <p>주차 공간</p>
        <button onClick={this.parkinglot}>주차장 조회하기</button>
        <table border="1" width="1500px" height="300px">
          <thead></thead>
          <tbody>
            {/*             <tr>
              <td>
                <div style={notuseStyle}>비어있음</div>
                <div style={useStyle}>사용중</div>
              </td>
            </tr> */}
            <tr>{this.state.resultCarNumber}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Space;
