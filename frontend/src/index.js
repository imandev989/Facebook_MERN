import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";
// import ReactDOM from 'react-dom/client';
// import React from 'react';
// import { render } from '@testing-library/react';


const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
    <Router>
      <App />
    </Router>
    </React.StrictMode>,
  </Provider>
);
