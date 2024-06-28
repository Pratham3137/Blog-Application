import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import SignInSide from "../components/SignIn";
import SignUp from "../components/SignUp";
import PrivateRoute from "./PrivateRoute";
import MyBlogsList from "../components/MyBlogs/MyBlogList";
import Error from "../components/Error";
import Header from "../components/Dashboard/Header";

const MainRoutes = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };  return (
    <Router>
      <Routes>
        <Route path="/v1/signup" element={<SignUp />} />
        <Route path="/v1/signin" element={<SignInSide />} />
        <Route
          path="/v1"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated()}>
              <Header />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<MyBlogsList flag={false} />} />
          <Route path="myblogs" element={<MyBlogsList flag={true} />} />
        </Route>
        <Route path="/v1/*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
