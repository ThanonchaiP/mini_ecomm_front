import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./guard/auth";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/mui-theme";
// import MainLayout from "./components/layouts/MainLayout";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

//redux setup
import { Provider } from "react-redux";
// import { createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./redux/reducers/index";
// const store = createStore(rootReducer, composeWithDevTools());

//redux Persis
import configureStore from "./redux/configureStore";
const { store } = configureStore();

const HomePage = lazy(() => import("./pages/home/Home"));
const ProductDetailPage = lazy(() => import("./pages/product/product-detail/ProductDetail"));
const LoginPage = lazy(() => import("./pages/login/Login"));
const CartPage = lazy(() => import("./pages/cart/Cart"));
const ProfilePage = lazy(() => import("./pages/profile/Profile"));
const MenPage = lazy(() => import("./pages/product/men/Men"));

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
                  <Route
                    path="/product"
                    render={({ match: { url } }) => (
                      <>
                        <Route path={`${url}/:id`} exact component={ProductDetailPage} />
                        <Route path={`${url}/sex/men`} component={MenPage} />
                      </>
                    )}
                  ></Route>
                  <Route path="/cart" component={CartPage} />
                  <Route path="/profile" component={ProfilePage} />
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
