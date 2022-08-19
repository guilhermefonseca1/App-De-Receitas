import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import DrinksDetails from './pages/DrinksDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" exact component={ Foods } />
        <Route path="/foods/:id-da-receita" component={ RecipeDetails } />
        <Route
          path="/foods/:id-da-receita/in-progress"
          component={ RecipeInProgress }
        />
        <Route path="/drinks/" exact component={ Drinks } />
        <Route path="/drinks/:id-da-receita" component={ DrinksDetails } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
