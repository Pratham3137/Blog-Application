import React, { useEffect, useState } from "react";
import { storage } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
// import { stringAvatar } from "../Store/cardAvatar";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./featurePost.css";
import { toast } from "react-toastify";
import {
  Toolbar,
  Button,
  Typography,
  Box,
  Modal,
  LoadingButton,
  SendIcon,
  CloudUploadIcon,
  LogoutIcon,
  Avatar,
  IconButton,
  Stack,
  TextareaAutosize,
  Tooltip,
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "../Store/material";
import { stringAvatar } from "../Store/cardAvatar";
import { Input } from "@mui/material";
import RoutesComponent from "../../routes/RoutesComponent";
import MyBlogsList from "../MyBlogs/MyBlogList";
import MyBlogs from "../MyBlogs/MyBlogs";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const defaultTheme = createTheme();

const Header = (props) => {
  const { title } = props;
  const initialData = {
    title: "",
    description: "",
    imageLink: "",
  };
  const [data, setData] = useState(initialData);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [descError, setDescError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const userName = localStorage.getItem("userName");
  const [flag, setFlag] = useState(false);
  const auth = true;
  const navigate = useNavigate();
  const url = window.location.href;

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4001/v1/writepost",
        {
          userId: localStorage.getItem("userId"),
          title: data.title,
          description: data.description,
          image: data.imageLink,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.statusText === "OK") {
        setLoading(false);
        setOpen(false);
        setData(initialData);
      }
      const data1 = response?.data;
      console.log(data1);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session Expired");
        navigate("/v1/signin");
      }
      console.log(error);
    }
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(postData(), 2000);
  };

  const handleUpload = async () => {
    if (image === (null || undefined)) {
      toast.error("Upload Image First.....");
    }
    const imageRef = ref(
      storage,
      `Blog-Application/${localStorage.getItem("userId")}/${image?.name}`
    );
    await uploadBytes(imageRef, image);
    const imageLinkRef = ref(
      storage,
      `Blog-Application/${localStorage.getItem("userId")}/${image?.name}`
    );
    const imgLink = await getDownloadURL(imageLinkRef);
    if (imgLink) {
      toast.success("Image uploaded successfully");
      setDisabled(false);
    }
    setData((prev) => ({
      ...prev,
      imageLink: imgLink,
    }));
  };

  // useEffect(() => {
  //   if (flag === true) {
  //     navigate("/v1/myblogs");
  //   } else {
  //     navigate("/v1/dashboard");
  //   }
  // }, [flag,navigate])
  

  const handleNavigate = () => {
    if (url === "http://localhost:3000/v1/myblogs") {
      setFlag(false);
      navigate("/v1/dashboard");
      // window.location.reload();
    } else {
      setFlag(true);
      console.log(MyBlogs);
      navigate("/v1/myblogs");
      // window.location.reload();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/v1/signin");
  };

  const handleChange1 = (event) => {
    const words = event.target.value.split(" ");
    if (words.length < 200) {
      setData((prev) => ({
        ...prev,
        description: event.target.value,
      }));
      setDescError(false);
    } else {
      setDescError(true);
      toast.error("Description should be less than 200 words");
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Button variant="outlined" size="small" onClick={handleNavigate}>
              {url === "http://localhost:3000/v1/dashboard"
                ? `My Blogs`
                : `Dashboard`}
            </Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              sx={{ flex: 1 }}
            >
              {title}
            </Typography>
            <Button variant="outlined" size="small" onClick={handleOpen}>
              Add Blog
            </Button>
            {auth && (
              <>
                <IconButton>
                  <Stack direction="row" spacing={2}>
                    <Tooltip title={userName} arrow>
                      <Avatar {...stringAvatar(userName)} />
                    </Tooltip>
                  </Stack>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="logout"
                  aria-haspopup="true"
                  onClick={handleLogout}
                  color="inherit"
                >
                  <Stack direction="row" spacing={2}>
                    <Tooltip title="Logout" arrow>
                      <LogoutIcon />
                    </Tooltip>
                  </Stack>
                </IconButton>
              </>
            )}
          </Toolbar>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="model"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Write new post
              </Typography>
              <Typography id="modal-modal-title" sx={{ mt: 2 }}>
                <label>Title:</label>
                <br />
                <textarea
                  name="title"
                  placeholder="Write title here....."
                  value={data.title}
                  style={{
                    height: "30px",
                    width: "500px",
                    resize: "none",
                  }}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />{" "}
                <br />
                <br />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label>Description:</label>
                <br />
                <TextareaAutosize
                  aria-label="Description"
                  value={data.description}
                  variant="filled"
                  style={{
                    height: "100px",
                    width: "500px",
                    resize: "none",
                    border: descError ? "1px solid red" : "1px solid gray",
                  }}
                  onChange={handleChange1}
                />
                {descError && (
                  <p style={{ color: "red" }}>
                    The description exceeds the 200-word limit.
                  </p>
                )}
                <br />
                <br />
              </Typography>
              <Typography>
                <Input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                &nbsp;
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUpload}
                >
                  Upload file
                </Button>
                <br />
                <br />
              </Typography>
              <Typography className="footer">
                <Button
                  onClick={() => {
                    setData(initialData);
                    setOpen(false);
                  }}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  disabled={descError}
                >
                  <span>Cancel</span>
                </Button>
                <LoadingButton
                  onClick={handleClick}
                  endIcon={<SendIcon />}
                  loading={loading}
                  disabled={disabled}
                  loadingPosition="end"
                  variant="contained"
                >
                  <span>Send</span>
                </LoadingButton>
              </Typography>
            </Box>
          </Modal>
          <MyBlogsList flag={flag} />
          {/* <RoutesComponent /> */}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Header;
