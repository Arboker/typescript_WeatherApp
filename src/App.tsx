import React from 'react';
import { Route, Switch } from "react-router-dom";

import Forecast from './pages/Forecast';
import Main from './pages/Main'
import Weather from './pages/Weather'
import NotFound from './pages/NotFound'

import './css/main.css'

const App: React.FC = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path={process.env.PUBLIC_URL+"/"}><Main /></Route>
        <Route path={process.env.PUBLIC_URL+"/forecast/:city"} children={<Forecast />} />
        <Route path={process.env.PUBLIC_URL+"/:city/:day"} children={<Weather />} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App;