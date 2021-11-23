import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setTheme, useAppDispatch, useAppSelector } from "./redux/noteUtilsSlice";
// PAGES
import PageNotFound from './components/pages/PageNotFound'
import Inbox from './components/pages/Inbox'
import Today from './components/pages/Today'
import Upcoming from './components/pages/Upcoming'
import ProjectPage from './components/pages/ProjectPage'

const Index = lazy(() => import('./components/pages/Index'))
const Signin = lazy(() => import('./components/auth/Signin'))

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
