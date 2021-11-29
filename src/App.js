import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./guard/auth";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/mui-theme";
// import MainLayout from "./components/layouts/MainLayout";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// import HomePage from "./pages/Home";
// import ProductDetail from "./pages/ProductDetail";
// import LoginPage from "./pages/Login";
// import Cart from "./pages/Cart";

//redux setup
import { Provider } from "react-redux";
// import { createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./redux/reducers/index";
// const store = createStore(rootReducer, composeWithDevTools());

//redux Persis
import configureStore from "./redux/configureStore";
const { store } = configureStore();

const HomePage = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const LoginPage = lazy(() => import("./pages/Login"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>
              <Route path="/login" exact component={LoginPage} />

              <PrivateRoute>
                <NavBar />
                <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/product/:id" component={ProductDetail} />
                  <Route path="/cart" component={Cart} />
                </Switch>
                <Footer />
              </PrivateRoute>
            </Switch>
          </Router>
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
