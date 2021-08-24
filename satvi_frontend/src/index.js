import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// Initiate an ApolloClient for backend GraphQL communication
const client = new ApolloClient({
  uri: 'https://ptkd6q.deta.dev/graphql',         // http://127.0.0.1:8000/graphql
  cache: new InMemoryCache()
});


// I(seco) had failed to properly structure redux in a project at the time I was learning how to redux.
// Even though I understad it now, I haven't bothered to change it to this way.

// constants to be used if current state is not provided
const initialUser = {
  userAndtoken: null
}

const initialSearch = {
  searchKey: "",                      // self exp.
  interval: [0, 0],                   // index 0: min, 1: max
  filters: [ true, false, false]      // index 0: true => is_book, false => is not a book
}                                     //       1: brand_new, 2: free_delivery, 3: max_price, 4: min_price

// Store the token in store when signed in
function userAndtokenReducer ( state = initialUser, action) {
  switch (action.type) {
    case "SIGNIN":
      return { userAndtoken: action.data};
    case "SIGNOUT":
      return { userAndtoken: null};
    default:
      return state;
  }
}

// Store the search criterion. See initialSearch constant for details of each property.
function searchReducer ( state = initialSearch, action) {
  switch (action.type) {
    case "UPDATE_KEY":
      return {
        searchKey:  action.data,
        interval: state.interval,
        filters: state.filters
      };
      case "UPDATE_FILTERS":
        return {
          searchKey: state.searchKey,
          interval: state.interval,
          filters: action.data
        };
    case "UPDATE_INTERVAL":
      return {
        searchKey: state.searchKey,
        interval: action.data,
        filters: state.filters
      };
    default:
      return state;
  }
}

// instantiate the store
const allReducers = combineReducers({
  userAndtoken: userAndtokenReducer,
  searchCriteria: searchReducer
});

const store = createStore(allReducers);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals