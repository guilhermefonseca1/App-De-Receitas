import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <<<<<<< HEAD */}
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        {/* ======= */}
        <Route path="/foods" exact component={ Foods } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        {/* >>>>>>> 195a2603cb651c9bae8687cd42d75a004cba4dd7 */}
        <Route
          path="/foods/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route path="/drinks" exact component={ Drinks } />
        <Route path="/drinks/:id" exact component={ RecipeDetails } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
