import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Grid } from "../Store/material";
import MyBlogs from "./MyBlogs";
import LoadingComponent from "../Store/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyBlogsList = (props) => {
  const { flag } = props;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleInfiniteScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);
  const fetchUserData = async () => {
    console.log("Fetching User Data...");
    try {
      const response = await axios.post(
        `http://localhost:4001/v1/myposts/?_limit=6&_page=${page}`,
        {
          userId: localStorage.getItem("userId"),
          isdeleted: false,
          userToken: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPosts((prev) => [...prev, ...response.data]);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Session expired");
        navigate("/v1/signin");
      }
      console.log(error);
      setLoading(false);
    }
  };
  const fetchDashboardData = async () => {
    console.log("Fetching Dashboard Data...");
    try {
      const response = await axios.get(
        `http://localhost:4001/v1/dashboard/?_limit=6&_page=${page}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPosts((prev) => [...prev, ...response.data]);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Session expired");
        navigate("/v1/signin");
      }
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    console.log("🚀 ~ useEffect ~ flag:", flag);
    if (flag) {
      fetchUserData();
    } else {
      fetchDashboardData();
    }
  }, [flag]);

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <MyBlogs key={post._id} flag={flag} post={post} />
      ))}
      {loading && <LoadingComponent />}
    </Grid>
  );
};

export default MyBlogsList;
