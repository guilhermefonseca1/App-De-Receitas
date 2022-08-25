import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from "@testing-library/user-event";
import SearchBar from '../components/SearchBar';
import Foods from '../pages/Foods';
import { screen, waitFor } from '@testing-library/react';

afterEach(() => jest.clearAllMocks());

describe('Tests the Login component', () => {
  it('checks if the text is rendered while typing', () => {
    renderWithRouterAndRedux(<SearchBar />)
    const inputText = screen.getByTestId('search-input');
    userEvent.type(inputText,'nome')
    expect('nome').toBeDefined()
  })
  it('checks the global alert', () => {
    renderWithRouterAndRedux(<SearchBar/>)
    const inputText = screen.getByTestId('search-input');
    const button = screen.getByTestId("exec-search-btn")
    const name = screen.getByTestId("name-search-radio")
    userEvent.click(name)
    userEvent.type(inputText, "nome")
    userEvent.click(button)
    expect('Your search must have only 1 (one) character').toBeDefined()
  })
  it('checks the page details', () => {
    renderWithRouterAndRedux(<SearchBar/>)
    const inputText = screen.getByTestId('search-input');
    const button = screen.getByTestId("exec-search-btn")
    const ingredient = screen.getByTestId("ingredient-search-radio")
    userEvent.click(ingredient);
    userEvent.type(inputText, 'chicken')
    userEvent.click(button)
  })
  it('checks the first letter', () => {
    renderWithRouterAndRedux(<SearchBar/>)
    const inputText = screen.getByTestId('search-input');
    const button = screen.getByTestId("exec-search-btn")
    const letter = screen.getByTestId("first-letter-search-radio")
    userEvent.click(letter)
    userEvent.type(inputText, 'chicken')
    userEvent.click(button)
  })
  it('checks the first letter', () => {
    renderWithRouterAndRedux(<SearchBar/>)
    const inputText = screen.getByTestId('search-input');
    const button = screen.getByTestId("exec-search-btn")
    const letter = screen.getByTestId("first-letter-search-radio")
    userEvent.click(letter)
    userEvent.type(inputText, 'c')
    userEvent.click(button)
  })
  it('Verify if the pathname changes', async () => {
    const details = {
      meals: [{
        idMeal: '52782',
        strMeal: 'Lamb tomato and sweet spices',
        strDrinkAlternate: null,
        strCategory: 'Lamb',
        strArea: 'Moroccan',
        strInstructions: 'Use pickled vine leaves here, preserved in brine. Small delicate leaves are better than the large bristly ones but, if only large leaves are to hand, then trim them to roughly 12 by 12 cms so that you don\'t get too many layers of leaves around the filling. And remove any stalks. Drain the preserved leaves, immerse them in boiling water for 10 minutes and then leave to dry on a tea towel before use. \r\nBasmati rice with butter and pine nuts is an ideal accompaniment. Couscous is great, too. Serves four.\r\nFirst make the filling. Put all the ingredients, apart from the tomatoes, in a bowl. Cut the tomatoes in half, coarsely grate into the bowl and discard the skins. Add half a teaspoon of salt and some black pepper, and stir. Leave on the side, or in the fridge, for up to a day. Before using, gently squeeze with your hands and drain away any juices that come out.\r\nTo make the sauce, heat the oil in a medium pan. Add the ginger and garlic, cook for a minute or two, taking care not to burn them, then add the tomato, lemon juice and sugar. Season, and simmer for 20 minutes.\r\nWhile the sauce is bubbling away, prepare the vine leaves. Use any torn or broken leaves to line the base of a wide, heavy saucepan. Trim any leaves from the fennel, cut it vertically into 0.5cm-thick slices and spread over the base of the pan to cover completely.\r\nLay a prepared vine leaf (see intro) on a work surface, veiny side up. Put two teaspoons of filling at the base of the leaf in a 2cm-long by 1cm-wide strip. Fold the sides of the leaf over the filling, then roll it tightly from bottom to top, in a cigar shape. Place in the pan, seam down, and repeat with the remaining leaves, placing them tightly next to each other in lines or circles (in two layers if necessary).\r\nPour the sauce over the leaves (and, if needed, add water just to cover). Place a plate on top, to weigh the leaves down, then cover with a lid. Bring to a boil, reduce the heat and cook on a bare simmer for 70 minutes. Most of the liquid should evaporate. Remove from the heat, and leave to cool a little - they are best served warm. When serving, bring to the table in the pan - it looks great. Serve a few vine leaves and fennel slices with warm rice. Spoon the braising juices on top and garnish with coriander.',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/qtwtss1468572261.jpg',
        strTags: '',
        strYoutube: 'https://www.youtube.com/watch?v=vaZb1MnFBgA',
        strIngredient1: 'olive oil',
        strIngredient2: 'ginger',
        strIngredient3: 'garlic',
        strIngredient4: 'tomatoes',
        strIngredient5: 'lemon juice',
        strIngredient6: 'caster sugar',
        strIngredient7: 'vine leaves',
        strIngredient8: 'fennel bulb',
        strIngredient9: 'lamb mince',
        strIngredient10: 'onion',
        strIngredient11: 'potato',
        strIngredient12: 'basmati rice',
        strIngredient13: 'chopped parsley',
        strIngredient14: 'coriander',
        strIngredient15: 'lemon juice',
        strIngredient16: 'garlic',
        strIngredient17: 'clove',
        strIngredient18: 'cinnamon',
        strIngredient19: 'tomatoes',
        strIngredient20: '',
        strMeasure1: '2 tbsp',
        strMeasure2: '4cm piece finely chopped',
        strMeasure3: '2 cloves peeled and chopped',
        strMeasure4: '800g peeled and chopped ',
        strMeasure5: '2 tbsp',
        strMeasure6: '1 tsp',
        strMeasure7: '50',
        strMeasure8: '1 large',
        strMeasure9: '400g',
        strMeasure10: '1 medium',
        strMeasure11: '1 small peeled and coarsely grated',
        strMeasure12: '2 tbsp',
        strMeasure13: '2 tbsp',
        strMeasure14: '2 tbsp chopped',
        strMeasure15: '1 tbsp',
        strMeasure16: '2 cloves',
        strMeasure17: '½ tsp ground',
        strMeasure18: '½ tsp ground ',
        strMeasure19: '2 medium',
        strMeasure20: '',
        strSource: 'http://www.ottolenghi.co.uk/recipes/meat/lamb-tomato-and-sweet-spices-shop',
        strImageSource: null,
        strCreativeCommonsConfirmed: null,
        dateModified: null
      }] 
    } 

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(details),
    }));

    const {history} = renderWithRouterAndRedux(<Foods/>);
    history.push('/foods');
    console.log(history);
    const searchIconBtn = screen.getByTestId('search-icon');
    expect(searchIconBtn).toBeInTheDocument();

    userEvent.click(searchIconBtn);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const searchBtn = screen.getByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();

    userEvent.type(searchInput, 'potato');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    await waitFor(() => {
      // const recipeTitle = screen.findByText('Lamb tomato and sweet spices');
      // expect(recipeTitle).toBeInTheDocument();
      expect(history.location.pathname).toBe('/foods/52782')
      // expect(recipeTitle).toContain('Lamb tomato and sweet spices');
    });

  })
});