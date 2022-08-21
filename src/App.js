import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import DrinksDetails from './pages/DrinksDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

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
        <Route path="/drinks/:id-da-receita/in-progress" component={ DrinksInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
