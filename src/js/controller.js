import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultView from './views/searchResultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // Update result view to mark selected search result
    searchResultView.update(model.getSearchResultPage());

    // Update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // LOADING RECIPE
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    searchResultView.renderSpinner();

    // Load search result
    await model.loadSearchResult(query);

    // Render search result
    controlPagination();
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};

const controlPagination = function (gotoPage = 1) {
  // Render NEW search result
  searchResultView.render(model.getSearchResultPage(gotoPage));

  // Render NEW initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (serve) {
  // update the recipe serving (in state)
  const newRecipe = model.updateServings(serve);
  // update the recipe view
  // recipeView.render(newRecipe);
  recipeView.update(newRecipe);
};

const controlBookmark = function () {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerRenderUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerRender(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};

// init();
window.addEventListener('DOMContentLoaded', init);
