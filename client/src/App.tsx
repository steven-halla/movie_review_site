import React from 'react';
import './App.scss';
import {UserContextProvider} from "./services/user.context";
import {MovieContextProvider} from "./services/movie.context";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {LoginStateHandler} from "./views/LoginStateHandler";
import {Header} from "./views/Header";
import {SigninView} from "./views/SigninView";
import {SignupView} from "./views/SignupView";
import {SignoutView} from "./views/SignoutView";
import {ContactView} from "./views/ContactView";
import {ProfileView} from "./views/ProfileView";
import {MovieList} from "./views/MovieList";
import {MovieView} from "./views/MovieView";
import {CreateReview} from "./views/CreateReview";
import {CriticList} from "./views/CriticList";
import {CriticView} from "./views/CriticView";
import {Box} from "@material-ui/core";
import {Footer} from "./views/Footer";
import {ImageSlider} from "./views/ImageSlider";
import {SliderData} from "./views/SliderData";


export const App = () => {
  return (
    <UserContextProvider>
      <MovieContextProvider>
        <BrowserRouter>
          <div className="App">
            <LoginStateHandler/>
            <Header/>
            <Box p="15px">
              <Switch>
                <Route exact path="/">
                  <MovieList/>
                </Route>
                <Route exact path="/signin">
                  <SigninView/>
                </Route>
                <Route exact path="/signup">
                  <SignupView/>
                </Route>
                <Route exact path="/signout">
                  <SignoutView/>
                </Route>
                <Route exact path="/contact">
                  <ImageSlider slides={SliderData} />
                  <ContactView/>
                  <Footer/>
                </Route>
                <Route exact path="/profile">
                  <ProfileView/>
                </Route>
                <Route exact path="/movies">
                  <MovieList/>
                </Route>
                <Route exact path="/movies/:id">
                  <MovieView/>
                </Route>
                <Route exact path="/movies/:id/review">
                  <CreateReview/>
                </Route>
                <Route exact path="/critics">
                  <CriticList/>
                </Route>
                <Route exact path="/critics/:id">
                  <CriticView/>
                </Route>
              </Switch>
            </Box>
          </div>
        </BrowserRouter>
      </MovieContextProvider>
    </UserContextProvider>
  );
}
