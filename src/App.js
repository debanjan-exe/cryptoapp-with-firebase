import './App.css';
import Header from './components/Header';
import { Switch, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import CoinPage from "./pages/CoinPage"
import { makeStyles } from "@material-ui/core"
import Alert from "./components/Alert"

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161A",
    color: "white",
    minHeight: "100vh",
  },
}))

function App() {

  const classes = useStyles();

  return (
    <>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/coin/:id" component={CoinPage} />
        </Switch>
      </div>
      <Alert />
    </>
  );
}

export default App;
