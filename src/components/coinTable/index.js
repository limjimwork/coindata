import React, { Component } from "react";
import CoinoneTicker from "../coinoneTicker";
import BithumbTicker from "../bithumbTicker";

class CoinTable extends Component {
  render() {
    if (this.props.completeOrders === undefined) {
      return null;
    }

    return (
      !!this.props.bids.length &&
      !!this.props.asks.length && (
        <div className="center">
          <table>
            <caption className="blind">오더북 테이블</caption>
            <tbody>
              <tr className="borderNone">
                <td>　</td>
                <td>수량</td>
                <td>매도가격</td>
                <td>　</td>
                <td>　</td>
              </tr>
              <tr>
                <td>　</td>
                <td className="blue">
                  <p className="blue askBlack">{this.props.asks[9].qty}</p>
                </td>
                <td className="blue">
                  <p className="blue">{this.props.asks[9].price}</p>
                </td>
                <td rowSpan="10" colSpan="2">
                  {this.props.pathname === "/bithumb" ? (
                    <BithumbTicker ticker={this.props.ticker} />
                  ) : (
                    <CoinoneTicker ticker={this.props.ticker} />
                  )}
                </td>
              </tr>
              {this.props.asks
                .slice(0, 9)
                .reverse()
                .map((ask, idx) => {
                  return (
                    <tr key={idx}>
                      <td>　</td>
                      <td className="blue">
                        <p className="blue askBlack">{ask.qty}</p>
                      </td>
                      <td className="blue">
                        <p className="blue">{ask.price}</p>
                      </td>
                    </tr>
                  );
                })}
              {this.props.bids.map((bid, idx) => {
                return (
                  <tr key={idx}>
                    <td className="transaction">
                      <p>{this.props.completeOrders[idx].price}</p>
                    </td>
                    <td className="transaction">
                      <p>{this.props.completeOrders[idx].qty}</p>
                    </td>
                    <td className="red">
                      <p className="red">{bid.price}</p>
                    </td>
                    <td className="red">
                      <p className="red bidBlack">{bid.qty}</p>
                    </td>
                    <td>　</td>
                  </tr>
                );
              })}
              <tr className="borderNone">
                <td>체결가</td>
                <td>체결량</td>
                <td>매수가격</td>
                <td>수량</td>
                <td>　</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    );
  }
}

export default CoinTable;
