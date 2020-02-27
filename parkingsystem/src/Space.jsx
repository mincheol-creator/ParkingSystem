import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Space extends Component {
  state = {
    resultCarNumber: []
  };

  goOut = parkingnumber => {
    const send_param = {
      headers,
      number: parkingnumber
    };
    axios
      .post("http://localhost:8080/member/out", send_param)
      .then(returnData => {
        if (returnData.data.sendnumber) {
          console.log(returnData.data.sendnumber);
          alert(
            returnData.data.sendnumber +
              "님 " +
              returnData.data.sendtime +
              "분 이용하셨습니다. 요금은 " +
              returnData.data.sendfee +
              "원 입니다."
          );
          const fee = returnData.data.sendfee;
          ////////////////////////////////////////////////
          axios
            .post("http://localhost:8080/member/feeupdate", {
              fee
            })
            .then(returnData => {
              if (returnData.data.message) {
                console.log(returnData.data.message);
              } else {
                alert("오류");
              }
            });
          ////////////////////////////////////////////////
        } else {
          alert("오류");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  parkinglot = () => {
    axios
      .post("http://localhost:8080/member/findall", headers)
      .then(returnData => {
        if (returnData.data.message) {
          const carNumbers = returnData.data.message;
          const carNumberList = carNumbers.map((item, i) => {
            if (item.use === 1)
              return (
                <td key={i} width="200px">
                  주차장 번호 : {item.parkingnumber}
                  <br />차 번호 : {item.carnumber}
                  <br />차 크기 : {item.size}
                  <br />
                  입고 시간 : {item.updated_at}
                  <br />
                  <button onClick={this.goOut.bind(null, item.parkingnumber)}>
                    종료
                  </button>
                </td>
              );
            return <td>비어있음</td>;
          });

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
    return (
      <div>
        <p>주차 공간</p>
        <button onClick={this.parkinglot}>주차장 조회하기</button>
        <table border="1" height="300px">
          <thead></thead>
          <tbody>
            <tr>{this.state.resultCarNumber}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Space;
