import { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";
import MainLayout from "./components/Layouts/MainLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import lazyWithRetry from "./utils/lazyWithRetry";
import { logout, selectUser, checkUserAsync } from "./features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import LoginPage from "./pages/LoginPage/LoginPage";
import TestPage from "./pages/TestPage/TestPage";
import CreateCreaturePage from "./pages/CreateCharacterPage/CreateCharacterPage";
import CraftingPage from "./pages/CraftingPage/CraftingPage";
import FarmPage from "./pages/FarmPage/FarmPage";

// const LoginPage = lazyWithRetry(() => import('./pages/LoginPage/LoginPage'))

const Main = () => {
  // const { active, account, library, connector, activate, deactivate } =
  //   useWeb3React()
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [signModalOpen, setSignModalOpen] = useState(false);

  useEffect(() => {
    if (
      user.status === "idle" &&
      user.value === null &&
      localStorage.getItem("user") &&
      localStorage.getItem("token")
    ) {
      dispatch(
        checkUserAsync({
          user: localStorage.getItem("user") || "",
          token: localStorage.getItem("token") || "",
        })
      );
    }
  }, []);

  function isBrave() {
    /* @ts-ignore */
    if (window.navigator.brave !== undefined) {
      /* @ts-ignore */
      if (window.navigator.brave.isBrave.name === "isBrave") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  //#endregion activate
  return (
    <div className="font-inter">
      {/* <SignModal open={signModalOpen} setOpen={setSignModalOpen} /> */}
      <Toaster />
      <Switch>
        <Route exact path="/">
          <MainLayout>
            <ErrorBoundary>
              <LoginPage isRegister={true} />
            </ErrorBoundary>
          </MainLayout>
        </Route>
        <Route exact path="/test">
          <MainLayout>
            <ErrorBoundary>
              <TestPage />
            </ErrorBoundary>
          </MainLayout>
        </Route>
        <Route exact path="/crafting">
          <MainLayout>
            <ErrorBoundary>
              <CraftingPage />
            </ErrorBoundary>
          </MainLayout>
        </Route>
        <Route exact path="/farm">
          <MainLayout>
            <ErrorBoundary>
              <FarmPage />
            </ErrorBoundary>
          </MainLayout>
        </Route>
        <Route exact path="/create">
          <MainLayout>
            <ErrorBoundary>
              <CreateCreaturePage />
            </ErrorBoundary>
          </MainLayout>
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

function App() {
  return (
    <Suspense
      fallback={
        <div style={{ height: "90vh" }} className="w-full">
          <Spinner color={"black"} style={{ height: "25%", margin: "auto" }} />
        </div>
      }
    >
      <Router>
        <Main />
      </Router>
    </Suspense>
  );
}
export default App;
