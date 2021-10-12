import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/mui-theme";
import MainLayout from "./components/layouts/MainLayout";
import NavBar from "./components/NavBar";

import HomePage from "./pages/Home";
import LoginPage from "./pages/login/Login";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginPage} />

        <Route>
          <NavBar />
          <MainLayout>
            <Switch>
              <Route path="/" exact component={HomePage} />
            </Switch>
          </MainLayout>
        </Route>
      </Switch>
    </Router>
    </ThemeProvider>
  );
}

export default App;
