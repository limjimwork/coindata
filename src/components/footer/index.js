import React, { Component } from 'react';
import './footer.css';

class Footer extends Component{
    render(){
        return(
            <div className="foot">
                <div className="center">
                    <p>이 사이트는 포트폴리오 제작용으로 만든 사이트입니다.<br/>모든 콘텐츠의 저작권은 Coinone과 Bithumb 및 해당사에 있음을 밝힙니다.</p>
                </div>
            </div>
        );
    }
}

export default Footer;