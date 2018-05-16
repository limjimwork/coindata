import React, { Component } from 'react';

class CurrencyBar extends Component{
    
    render(){
        return(
            <div className="center">     
                <select onChange={(e)=>{
                    this.props.onChangeCurrency(e.target.value);
                    console.log(e.target.value);
                }}>
                    {
                        this.props.currencyList.map((value,idx)=>{
                            return(
                                <option value={value} key={idx}>{value}</option>
                            );
                        })
                    }
                </select>
            </div> 
        );
    }
}

export default CurrencyBar;