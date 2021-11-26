import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setTheme, useAppDispatch, useAppSelector } from "./redux/noteUtilsSlice";
// PAGES
import NotFound from './components/pages/NotFound'
import Today from './components/pages/Today'
import Inbox from './components/pages/Inbox'
import Upcoming from './components/pages/Upcoming'
import ProjectPage from './components/pages/ProjectPage'
import Loading from "./components/utilities/loader/Loading";


const ForgetPassword = lazy(() => import('./components/auth/ForgetPassword'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Signin = lazy(() => import('./components/auth/Signin'));
const Index = lazy(() => import('./components/pages/Index'));


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
        <Suspense fallback={<Loading />}>
          <Router>
            <Routes>
              <Route path='/' element={<Index />} >
                <Route path='/' element={<Inbox />} />
                <Route path='today' element={<Today />} />
                <Route path='upcoming' element={<Upcoming />} />
                <Route path='/p/:pid' element={<ProjectPage />} />
              </Route>
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/auth/forgetpassword' element={<ForgetPassword />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
