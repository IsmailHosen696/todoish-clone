import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/utilities/Navbar";
import NewNotePopUp from "./components/utilities/noteutils/NewNotePopUp";
import NewTag from "./components/utilities/noteutils/NewTag";
import NewProject from "./components/utilities/projectutils/NewProject";
import Sidebar from "./components/utilities/Sidebar";
import { setTheme, useAppDispatch, useAppSelector } from "./redux/noteUtilsSlice";

// PAGES
const Inbox = lazy(() => import('./components/pages/Inbox'));
const Upcoming = lazy(() => import('./components/pages/Upcoming'));
const Today = lazy(() => import('./components/pages/Today'));
const ProjectPage = lazy(() => import('./components/pages/ProjectPage'));
const PageNotFound = lazy(() => import('./components/pages/PageNotFound'));

function App() {

  const { theme, isAddNoteOpen, isNewTagOpen, isSidebarOpen, isNewProjectOpen } = useAppSelector(state => state.notesutils);
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
      <div className="bg-viewboxWhite w-full dark:bg-viewboxDark overflow-hidden min-h-screen">
        <Suspense fallback={'loading'}>
          <Router>
            <>
              <Navbar />
              <Sidebar />
              {isAddNoteOpen && <NewNotePopUp />}
              {isNewProjectOpen && <NewProject />}
              {isNewTagOpen && <NewTag />}
            </>
            <div className={`mt-12 ${isSidebarOpen ? 'ml-52' : "ml-10"} z-0 transition-all duration-200`}>
              <Switch>
                <Route exact path='/' component={Inbox} />
                <Route exact path='/today' component={Today} />
                <Route exact path='/upcoming' component={Upcoming} />
                <Route exact path='/p/:id' component={ProjectPage} />
                <Route path='*' component={PageNotFound} />
              </Switch>
            </div>
          </Router>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
