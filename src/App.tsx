import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setTheme, useAppDispatch, useAppSelector } from "./redux/noteUtilsSlice";
import Index from './components/pages/Index'
// PAGES
const Signin = lazy(() => import('./components/auth/Signin'));
const PageNotFound = lazy(() => import('./components/pages/PageNotFound'));
const Inbox = lazy(() => import('./components/pages/Inbox'));
const Today = lazy(() => import('./components/pages/Today'));
const Upcoming = lazy(() => import('./components/pages/Upcoming'));
const ProjectPage = lazy(() => import('./components/pages/ProjectPage'));
function App() {

  const { theme } = useAppSelector(state => state.notesutils);
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
            <Routes>
              <Route path='/' element={<Index />} >
                <Route path='/' element={<Inbox />} />
                <Route path='today' element={<Today />} />
                <Route path='upcoming' element={<Upcoming />} />
                <Route path='/p/:pid' element={<ProjectPage />} />
              </Route>
              <Route path='/signin' element={<Signin />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Router>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
