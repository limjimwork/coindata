import React, { Component } from 'react';

class BithumbTicker extends Component{
    render(){

        console.log(this.props.ticker)
        const {units_traded, max_price, min_price, closing_price} = this.props.ticker;
        const volume = Number(units_traded) * Number(max_price)

        return(
            <div>
                <table>
                    <tbody className="tickerTable">
                        <tr>
                            <td>거래량(24H)</td>
                            <td>{Math.round(units_traded)}</td>
                        </tr>
                        <tr>
                            <td>거래대금(24H)</td>
                            <td>{Math.round(volume/Math.pow(10, 8))}억</td>
                        </tr>
                        <tr>
                            <td>당일고가</td>
                            <td>{max_price}</td>
                        </tr>
                        <tr>
                            <td>당일저가</td>
                            <td>{min_price}</td>
                        </tr>
                        <tr>
                            <td>전일종가</td>
                            <td>{closing_price}</td>
                        </tr>
                        <tr>
                            <td>체결강도</td>
                            <td>{closing_price}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BithumbTicker;