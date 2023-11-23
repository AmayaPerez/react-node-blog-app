import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import PrivateRoute from './components/Routing/PrivateRoute';
import Home from "./components/General/Home"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import ForgotPassword from "./components/Auth/ForgotPassword"
import ResetPassword from "./components/Auth/ResetPassword"
import AddPost from './components/Post/AddPost';
import DetailPost from './components/Post/DetailPost';
import Header from './components/General/Header';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import ChangePassword from './components/Profile/ChangePassword';
import NotFound from './components/General/NotFound';
import EditPost from './components/Post/EditPost';
import ReadListPage from './components/Profile/ReadListPage';

const App = () => {

      return (
            <Router>

                  <div className="App">

                        <Routes>
                              <Route path="/" element={<LayoutsWithHeader />}>

                                    <Route path='*' element={<NotFound />} />

                                    <Route exact path='/' element={<PrivateRoute />}>
                                          <Route exact path='/' element={<Home />} />
                                    </Route>

                                    <Route exact path="/post/:slug" element={<DetailPost />} />

                                    <Route exact path='/addpost' element={<PrivateRoute />}>
                                          <Route exact path='/addpost' element={<AddPost />} />
                                    </Route>

                                    <Route exact path='/profile' element={<PrivateRoute />}>
                                          <Route exact path='/profile' element={<Profile />} />
                                    </Route>

                                    <Route exact path='/edit_profile' element={<PrivateRoute />}>
                                          <Route exact path='/edit_profile' element={<EditProfile />} />
                                    </Route>

                                    <Route exact path='/change_Password' element={<PrivateRoute />}>
                                          <Route exact path='/change_Password' element={<ChangePassword />} />
                                    </Route>

                                    <Route exact path='/post/:slug/like' element={<PrivateRoute />}>
                                          <Route exact path='/post/:slug/like' element={<DetailPost />} />
                                    </Route>

                                    <Route exact path='/post/:slug/edit' element={<PrivateRoute />}>
                                          <Route exact path='/post/:slug/edit' element={<EditPost />} />
                                    </Route>

                                    <Route exact path='/post/:slug/delete' element={<PrivateRoute />}>
                                          <Route exact path='/post/:slug/delete' element={<DetailPost />} />
                                    </Route>
                                    <Route exact path='/post/:slug/addComment' element={<PrivateRoute />}>
                                          <Route exact path='/post/:slug/addComment' element={<DetailPost />} />
                                    </Route>

                                    <Route exact path='/readList' element={<PrivateRoute />}>
                                          <Route exact path='/readList' element={<ReadListPage />} />
                                    </Route>

                              </Route>

                              <Route exact path="/login" element={<Login />} />
                              <Route exact path="/register" element={<Register />} />

                              <Route exact path="/forgotpassword" element={<ForgotPassword />} />

                              <Route exact path="/resetpassword" element={<ResetPassword />} />


                        </Routes>

                  </div>

            </Router>

      );

}

const LayoutsWithHeader = () => {
      return (
            <>
                  <Header />
                  <Outlet />
            </>
      );
}

export default App;
