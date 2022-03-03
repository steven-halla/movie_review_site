import React, {FC} from 'react';

import styled from "styled-components";

const StyleFooterDiv = styled.div`

  *, *:before, *:after {
    box-sizing: border-box;
  }
    
  .Footer-Container {
    height: 111px;
    width: auto;
    
    .Social-Media-Container {
      display: flex;
      margin: 0 auto;
      flex-flow: row;
      justify-content: space-evenly;
      height: 100px;
      width: 222px;

      img {
        display: flex;

        height: 35px;
        width: auto;
      }
    }
    
  }
  
  
  .Contact-Info-Container {
    display: flex;
    width: auto;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
   
    
    .title {
      font-weight: bold;
      font-size: 18px;
    }
    
    .contact-info {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      width: 100%;
      
      .contact-method {
        margin-right: 15px;
      }
      .contact-value {
        padding-right: 15px;
      }
    }
  }
  
`;

export const Footer: FC = (props) => {
  return(
    <StyleFooterDiv>


      <div className="Footer-Container">
        <div className="Social-Media-Container">
          <p><a href="https://www.facebook.com/" target="_blank"><img
            src="https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png" height="60"
            width="60" alt=""/></a></p>
          <p><a href="https://twitter.com/" target="_blank"><img
            src="https://d1e2bohyu2u2w9.cloudfront.net/education/sites/default/files/product/twitter-product-image.png"
            height="60" width="60" alt=""/></a></p>
          <p><a href="https://www.linkedin.com/" target="_blank"><img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4s3k1pIajgk3Rf-07CLW-WqbfKXE2VDXFA&usqp=CAU&ec=45761791"
            height="60" width="60" alt=""/></a></p>
          <p><a href="https://www.pinterest.com/" target="_blank"><img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEgxnwMTT4WrNoXdjQlJZE4Vxj1Gnd8v1OGg&usqp=CAU&ec=45761791"
            height="60" width="60" alt=""/></a></p>
        </div>

      </div>

      <div className="Contact-Info-Container">
        <div className="title">Contact Us</div>

        <div className="contact-info">
          <div className="contact-method">Phone:</div>
          <div className="contact-value">(123)456-7890</div>

        </div>
        <div className="contact-info">
          <div className="contact-method">Email:</div>
          <div className="contact-value">contactus@tomrotten.com</div>
        </div>
      </div>
    </StyleFooterDiv>
  )
}
