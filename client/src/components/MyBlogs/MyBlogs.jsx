import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import config from "../../config/config";
import { stringAvatar } from "../Store/cardAvatar";
import {
  Card,
  Typography,
  Avatar,
  Box,
  CardActions,
  CardHeader,
  Checkbox,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextareaAutosize,
  Tooltip,
  CardContent,
  ThumbUpAltIcon,
  CardMedia,
  ThumbUpOffAltIcon,
  EditIcon,
  LoadingButton,
  SendIcon,
  Button,
} from "../Store/material";
import { style } from "../Dashboard/Header";
import "../Dashboard/featurePost.css";
import Description from "./Description";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function MyBlogs(props) {
  const { post, flag } = props;
  const userId = localStorage.getItem("userId");
  const [userPost,setUserPost] = useState(post)
  const {
    _id,
    title,
    createdAt,
    imagelabel,
    image,
    author,
    likes,
    isLiked,
  } = userPost;
  const [checked, setChecked] = useState(isLiked.includes(parseInt(userId)));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title1,setTitle1] = useState("")
  const [description1, setDescription1] = useState("");
  const [likesCount, setLikesCount] = useState(likes);
  const [author1, setAuthor1] = useState("");
  const [date, setDate] = useState();
  const [descError, setDescError] = useState(false);
  const navigate = useNavigate();
  const { url } = config;

  useEffect(() => {
    const formattedDate = moment(createdAt).format("DD MMM YYYY");
    setDate(formattedDate);

    const userName = () => {
      return author.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
        return char.toUpperCase();
      });
    };
    setAuthor1(userName());
  }, [createdAt, author]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/myposts/${_id}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Session Expired");
        navigate("/v1/signin");
      }
      console.log(error);
    }
  };

  const fetchdata = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:4001/v1/editpost",
        {
          id: _id,
          title:title1,
          description: description1,
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
      }
      const data = response.data;
      console.log("🚀 ~ fetchdata ~ data:", data)
      setUserPost(data)
      setTitle1(data.title)
      setDescription1(data.description);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Session Expired");
        navigate("/v1/signin");
      }
      console.log(error);
    }
  };

  const handleEdit = () => {
    setLoading(true);
    setTimeout(fetchdata, 2000);
  };

  const handleOpen = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4001/v1/mypost",
        {
          id: _id,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      const { description: desc, title:titleEdit } = data;
      setTitle1(titleEdit)
      setDescription1(desc);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Session Expired");
        navigate("/v1/signin");
      }
      console.log(error);
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const words = event.target.value.split(" ");
    if (words.length < 200) {
      setDescription1(event.target.value);
      setDescError(false);
    } else {
      setDescError(true);
      toast.error("Description should be less than 200 words");
    }
  };

  const handleLikes = async (e) => {
    const liked = e.target.checked;
    const likedUserIds = (() => {
      if (!checked && liked && !isLiked.includes(parseInt(userId))) {
        return [userId, ...isLiked];
      } else if (checked && !liked) {
        return isLiked.filter((id) => id !== parseInt(userId));
      } else {
        return isLiked;
      }
    })();
    try {
      const response = await axios.patch(
        "http://localhost:4001/v1/like",
        {
          id: _id,
          likes: likedUserIds.length,
          isLiked: likedUserIds,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.statusText === "OK") {
        setChecked(!checked);
        setLikesCount(response.data.likes);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Session Expired");
        navigate("/v1/signin");
      }
      console.log(error);
    }
  };
  return (
    <>
      <Grid item xs={12} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Tooltip title={author1} placement="top" arrow>
                <Avatar {...stringAvatar(author)} />
              </Tooltip>
            }
            title={
              <Tooltip title={title} placement="top" arrow>
                {title.slice(0, 20)}...
              </Tooltip>
            }
            subheader={date}
          />
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt={imagelabel}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <Description post={post} flag={flag} />
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1" gutterBottom>
                <Checkbox
                  {...label}
                  icon={<ThumbUpOffAltIcon sx={{ fontSize: 25 }} />}
                  checkedIcon={<ThumbUpAltIcon sx={{ fontSize: 25 }} />}
                  checked={checked}
                  onChange={handleLikes}
                />
                {likesCount}
              </Typography>
              {flag && (
                <>
                  <Stack direction="row" spacing={-2}>
                    <IconButton
                      size="large"
                      aria-label="logout"
                      aria-haspopup="true"
                      onClick={handleOpen}
                      color="inherit"
                    >
                      <Tooltip title="Edit" arrow>
                        <EditIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      size="large"
                      aria-label="logout"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={handleDelete}
                    >
                      <Tooltip title="Delete" arrow>
                        <DeleteIcon />
                      </Tooltip>
                    </IconButton>
                  </Stack>
                </>
              )}
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="model"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Your Post here....
          </Typography>
          <Typography id="modal-modal-Title" sx={{ mt: 2 }}>
            <label>Title:</label>
            <br />
            <TextareaAutosize
              aria-label="Title"
              value={title1}
              variant="filled"
              style={{
                height: "30px",
                width: "500px",
                resize: "none",
              }}
              onChange={(e)=> setTitle1(e.target.value)}
            /></Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>Description:</label>
            <br />
            <TextareaAutosize
              aria-label="Description"
              value={description1}
              variant="filled"
              style={{
                height: "100px",
                width: "500px",
                resize: "none",
                border: descError ? "1px solid red" : "1px solid gray",
              }}
              onChange={handleChange}
            />
            {descError && (
              <p style={{ color: "red" }}>
                The description exceeds the 200-word limit.
              </p>
            )}
          </Typography>
          <Typography>
          <Button
              onClick={() => {
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
              onClick={handleEdit}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              disabled={descError}
            >
              <span>Send</span>
            </LoadingButton>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
