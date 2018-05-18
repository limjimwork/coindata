import React, { Component } from 'react';
import axios from 'axios';
import CurrencyBar from '../currencyBar';
import CoinTable from '../coinTable';

const currencyList = [
    'btc', 'bch', 'eth', 'etc', 'xrp', 'qtum', 'iota', 'ltc', 'btg', 'omg', 'eos'
]

class CoinoneData extends Component{

    constructor(props){
        super(props);
        this.state = {
            currency: 'btc',
            bids: [],
            asks: [],
            last: '',
            yesterday_last: '',
            high: '',
            low: '',
            volume: '',
            completeOrders: [],
            isOrderbookLoading: true,
            isTickerLoading: true,
            isTransactionLoading: true
        }
        this.orderbookInterval = null;
        this.tickerInterval = null;
        this.transactionInterval = null;
    }

    onChangeCurrency = (curr) => {
        this.setState({currency: curr})
    }

    callOrderBook = () => {
        axios.get('https://api.coinone.co.kr/orderbook', {
            params: {
                currency: this.state.currency
            }
        })

        .then((resp)=>{
            this.setState({
                bids: resp.data.bid.slice(0, 10),
                asks: resp.data.ask.slice(0, 10),
                isOrderbookLoading: false
            })
        }) /* 정상 response가 떨어졌을 때 */

        .catch((error)=>{
            console.log('error occured!!');
            console.log(error);
            this.setState({
                isOrderbookLoading: false
            })
        }) /* api 호출에 실패했을 때 */
    }

    callTicker = () => {
        axios.get('https://api.coinone.co.kr/ticker_utc/',{
            params: {
                currency: this.state.currency
            }
        })

        .then((resp)=>{
            console.log(resp.data)
            this.setState({
                last: resp.data.last,
                yesterday_last: resp.data.yesterday_last,
                high: resp.data.high,
                low: resp.data.low,
                volume: resp.data.volume,
                isTickerLoading: false
            })
        })

        .catch((error)=>{
            console.log(error);
            this.setState({
                isTickerLoadng: false
            })
        })
    }

    callTransaction = () => {
        axios.get('https://api.coinone.co.kr/trades/',{
            params: {
                currency: this.state.currency
            }
        })

        .then((resp)=>{
            console.log(resp.data)
            this.setState({
                completeOrders: resp.data.completeOrders.reverse().slice(0, 10),
                isTransactionLoading: false
            })
        })

        .catch((error)=>{
            console.log(error);
            this.setState({
                isTransactionLoadng: false
            })
        })
    }

    componentDidMount(){
        this.callOrderBook();
        this.orderbookInterval = setInterval(this.callOrderBook, 5000);
        this.callTicker();
        this.tickerInterval = setInterval(this.callTicker, 5000);
        this.callTransaction();
        this.transactionInterval = setInterval(this.callTransaction, 5000);
    }

    componentWillUnmount(){
        clearInterval(this.orderbookInterval);
        clearInterval(this.tickerInterval);
        clearInterval(this.transactionInterval);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.state.currency !== prevState.currency){
            this.callOrderBook();
            clearInterval(this.orderbookInterval);
            this.orderbookInterval = setInterval(this.callOrderBook, 5000);
            this.callTicker();
            clearInterval(this.tickerInterval);
            this.tickerInterval  = setInterval(this.callTicker, 5000);
            this.callTransaction();
            clearInterval(this.transactionInterval);
            this.transactionInterval = setInterval(this.callTransaction, 5000);
        }
    }

    render(){
        const ticker = {
            last: this.state.last,
            yesterday_last: this.state.yesterday_last,
            high: this.state.high,
            low: this.state.low,
            volume: this.state.volume,
        }

        return(
            !this.state.isOrderbookLoading && !this.state.isTickerLoading && !this.state.isTransactionLoading ?
            (
                <div>
                    <CurrencyBar currencyList={currencyList} onChangeCurrency={this.onChangeCurrency}/>
                    <CoinTable bids={this.state.bids} asks={this.state.asks} ticker={ticker} pathname={this.props.location.pathname} completeOrders={this.state.completeOrders}/>
                </div>
            ):
            <div/>
        );
    }
}

export default CoinoneData;