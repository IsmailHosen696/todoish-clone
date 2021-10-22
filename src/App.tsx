import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/utilities/Navbar";
import NewNotePopUp from "./components/utilities/NewNotePopUp";
import Sidebar from "./components/utilities/Sidebar";
import { setTheme, useAppDispatch, useAppSelector } from "./redux/noteUtilsSlice";

// PAGES
const Allnotes = lazy(() => import('./components/pages/Allnotes'));
const Important = lazy(() => import('./components/pages/Important'));
const Today = lazy(() => import('./components/pages/Today'));
const Trash = lazy(() => import('./components/pages/Trash'));
const Upcoming = lazy(() => import('./components/pages/Upcoming'));
const PagenotFound = lazy(() => import('./components/pages/PagenotFound'));

function App() {

  const { theme, isAddNoteOpen } = useAppSelector(state => state.notesutils);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const localtheme = String(localStorage.getItem('theme'));
    if (!localtheme) {
      dispatch(setTheme('whiteTheme'))
      localStorage.setItem('theme', 'whiteTheme');
    } else {
      if (localtheme === 'darkTheme') {
        dispatch(setTheme('darkTheme'))
      } else {
        dispatch(setTheme('whiteTheme'))
      }
    }
  }, [dispatch]);
  return (
    <div className={`${theme === 'darkTheme' && 'dark'}`}>
      <div className="bg-viewboxWhite w-full min-h-screen dark:bg-viewboxDark">
        <Suspense fallback={'loading'}>
          <Router>
            <Navbar />
            <Sidebar />

            {isAddNoteOpen && <NewNotePopUp />}
            <Switch>
              <Route exact path='/' component={Allnotes} />
              <Route path='/today' component={Today} />
              <Route path='/upcoming' component={Upcoming} />
              <Route path='/important' component={Important} />
              <Route path='/trash' component={Trash} />
              <Route component={PagenotFound} />
            </Switch>
          </Router>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
