import React, { Component } from 'react';
import axios from 'axios';
import CurrencyBar from '../currencyBar';
import CoinTable from '../coinTable';

const currencyList = [
    'BTC', 'ETH', 'DASH', 'LTC', 'ETC', 'XRP', 'BCH', 'XMR', 'ZEC', 'QTUM', 'BTG', 'EOS', 'ICX', 'VEN', 'TRX', 'ELF', 'MITH', 'MCO', 'OMG', 'KNC', 'GNT', 'HSR', 'ALL'
]

class BithumbData extends Component{

    constructor(props){
        super(props);
        this.state = {
            order_currency: 'BTC',
            ask: [],
            bid: [],
            units_traded: '',
            max_price: '',
            min_price: '',
            closing_price: '',
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
        this.setState({
            order_currency: curr
        })
    }

    callOrderBook = () => {
        axios.get(`https://api.bithumb.com/public/orderbook/${this.state.order_currency}`, {
            params: {
                count : 10
            }
        })

        .then((resp)=>{
            console.log(resp.data);
            this.setState({
                /* resp.data.data.asks = [{price: '123', quantity: '1'},] => [{price: '123', qty: '1'}] */
                ask: resp.data.data.asks.map((ask, idx)=>{
                    return {
                        price: ask.price,
                        qty: Number(ask.quantity).toFixed(4)
                    }
                }),
                bid: resp.data.data.bids.map((bid, idx)=>{
                    return {
                        price: bid.price,
                        qty: Number(bid.quantity).toFixed(4)
                    }
                }),
                isOrderbookLoading: false
            })
        })

        .catch((error)=>{
            console.log(error);
            this.setState({
                isOrderbookLoading: false
            })
        })
    }

    callTicker = () => {
        axios.get(`https://api.bithumb.com/public/ticker/${this.state.order_currency}`)

        .then((resp)=>{
            console.log(resp.data);
            this.setState({
                units_traded: resp.data.data.units_traded,
                max_price: resp.data.data.max_price,
                min_price: resp.data.data.min_price,
                closing_price: resp.data.data.closing_price,
                isTickerLoading: false
            })
        })

        .catch((error)=>{
            console.log(error);
            this.setState({
                isTickerLoading: false
            })
        })
    }

    callTransaction = () => {
        axios.get(`https://api.bithumb.com/public/transaction_history/${this.state.order_currency}`, {
            params: {
                count : 10
            }
        })

        .then((resp)=>{
            console.log(resp.data)
            this.setState({
                    completeOrders: resp.data.data.map((completeOrders, idx)=>{
                        return {
                            price: completeOrders.price,
                            qty: completeOrders.units_traded
                        }
                    }),
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
        if (this.state.order_currency !== prevState.order_currency){
            this.callOrderBook();
            clearInterval(this.orderbookInterval);
            this.orderbookInterval = setInterval(this.callOrderBook, 5000);
            this.callTicker();
            clearInterval(this.tickerInterval);
            this.tickerInterval = setInterval(this.callTicker, 5000);
            this.callTransaction();
            clearInterval(this.transactionInterval);
            this.transactionInterval = setInterval(this.callTransaction, 5000);
        }
    }

    render(){
        const ticker = {
            units_traded: this.state.units_traded,
            max_price: this.state.max_price,
            min_price: this.state.min_price,
            closing_price: this.state.closing_price
        }
        console.log(this.props.location.pathname)

        return(
            !this.state.isOrderbookLoading && !this.state.isTickerLoading && !this.state.isTransactionLoading ?
            (
                <div className="center">
                    <div>
                        <CurrencyBar currencyList={currencyList} onChangeCurrency={this.onChangeCurrency}/>
                        <CoinTable asks={this.state.ask} bids={this.state.bid} ticker={ticker} pathname={this.props.location.pathname} completeOrders={this.state.completeOrders}/>
                    </div>
                </div>
            ) :
            <div/>
        );
    }
}

export default BithumbData;