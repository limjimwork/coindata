import React, { Component } from "react";

class CoinoneTicker extends Component {
  render() {
    const { last, yesterday_last, high, low, volume } = this.props.ticker;
    const compare = Number(last) - Number(yesterday_last);
    const compare_ratio =
      Math.round((compare / Number(yesterday_last)) * 10000) / 100;
    const compareClassName = compare >= 0 ? "red" : "blue";

    return (
      <div>
        <table className="tickerWrap">
          <tbody className="tickerTable">
            <tr>
              <td>현재가</td>
              <td>{last}</td>
            </tr>
            <tr>
              <td>전일가</td>
              <td>{yesterday_last}</td>
            </tr>
            <tr>
              <td>전일대비</td>
              <td>
                <p className={compareClassName}>
                  <span className="hide">{compare} / </span>
                  <span className="ratio">{compare_ratio}%</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>고가</td>
              <td>{high}</td>
            </tr>
            <tr>
              <td>저가</td>
              <td>{low}</td>
            </tr>
            <tr>
              <td>거래량</td>
              <td>{Math.round(volume)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CoinoneTicker;
