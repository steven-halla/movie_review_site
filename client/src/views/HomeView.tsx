import React, {useContext, useEffect} from 'react';
import {getUser} from "../services/user.service";
import {getCurrentUserAuth} from "../services/getCurrentUserAuth";
import {isLoggedIn} from "../services/auth.service";
import {UserContext} from "../services/user.context";
import {history} from "../browserHistory";

export const HomeView = () => {
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn()) {
      history.replace("/signin");
      return;
    }
    const currentUser = getCurrentUserAuth();
    getUser(currentUser.id)
      .then(response => {
        setUser(response.data);
      });
  }, []);

  return (
    <div>
      <div>
        <div>
          <h1>Welcome to Tom Rotten-A movie review project</h1>
        </div>
        <nav className="navbar navbar-light bg-info">
          <h1>Like what you see? Connect with us on Social media!</h1>
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
        </nav>
      </div>
      <div>
        <nav className="navbar navbar-light bg-secondary">
          <div className="col-lg-12">
            <h2>Contact us:</h2>
            <p>Phone: 111-111-1111</p>
            <p>Email: noEmail@email.com </p>
          </div>
        </nav>
      </div>
    </div>
  );
}
