import React from "react";
import { Routes, Route } from "react-router-dom";
import MyBlogsList from "../components/MyBlogs/MyBlogList";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route exact path="dashboard" element={<MyBlogsList flag={false} />} />
      <Route path="myblogs" element={<MyBlogsList flag={true} />} />
    </Routes>
  );
};

export default RoutesComponent;
