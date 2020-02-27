import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Space extends Component {
  state = {
    resultCarNumber: []
  };

  goOut = (parkingnumber, updated_at) => {
    const send_param = {
      headers,
      number: parkingnumber,
      starttime: updated_at
    };
    axios
      .post("http://localhost:8080/member/out", send_param)
      .then(returnData => {
        if (returnData.data.message) {
          console.log(returnData.data.message);
          alert("이용을 종료하셧습니다.");
        } else {
          alert("오류");
        }
        //console.log(returnData.data.message);
      })
      .catch(err => {
        console.log(err);
      });
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
                  <button
                    onClick={this.goOut.bind(
                      null,
                      item.parkingnumber,
                      item.updated_at
                    )}
                  >
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
