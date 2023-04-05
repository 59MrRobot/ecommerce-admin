import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PublishIcon from '@mui/icons-material/Publish';
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./User.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateUser } from "../../redux/apiCalls";

export const User: React.FC = React.memo(
  () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const user: User = useSelector((state: any) => state.user.users.find((user: any) => user._id === id));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState("");
    const [uploadMessage, setUploadMessage] = useState("");
    const [updatedUser, setUpdatedUser] = useState({});
    const [file, setFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState("");

    console.log(updatedUser);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedUser((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    };

    const handleUpload = () => {
      if (file) {
        const fileName = new Date().getTime() + file!.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file!);

        uploadTask.on('state_changed',
          (snapshot: any) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            setUploadMessage(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
              setImageURL(downloadURL);
              setUploadMessage("upload successful.");
            });
          }
        );
      }
    }

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        const finalUser = {
          ...updatedUser,
          image: imageURL,
        };

        updateUser(dispatch, user._id, finalUser);

        navigate('/users');

      }, [dispatch, imageURL, navigate, updatedUser, user._id]);

    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>

        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={user.image}
                alt=""
                className="userShowImg"
              />

              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.fullName}</span>
              </div>
            </div>

            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>

              <div className="userShowInfo">
                <PermIdentityIcon className="userShowIcon" />

                <span className="userShowInfoTitle">{user.username}</span>
              </div>

              <div className="userShowInfo">
                <CalendarTodayIcon className="userShowIcon" />
                
                <span className="userShowInfoTitle">{user.createdAt.split('T')[0].split('-').reverse().join('.')}</span>
              </div>

              <span className="userShowTitle">Contact Details</span>

              <div className="userShowInfo">
                <PhoneAndroidIcon className="userShowIcon" />

                <span className="userShowInfoTitle">{user.number}</span>
              </div>

              <div className="userShowInfo">
                <MailOutlineIcon className="userShowIcon" />

                <span className="userShowInfoTitle">{user.email}</span>
              </div>

              <div className="userShowInfo">
                <LocationSearchingIcon className="userShowIcon" />

                <span className="userShowInfoTitle">{user.country}</span>
              </div>
            </div>
          </div>

          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>

            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>

                  <input
                    name="username"
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Full Name</label>

                  <input
                    name="fullName"
                    type="text"
                    placeholder={user.fullName}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Email</label>

                  <input
                    name="email"
                    type="text"
                    placeholder={user.email}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Phone</label>

                  <input
                    name="number"
                    type="text"
                    placeholder={user.number}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Country</label>

                  <input
                    name="country"
                    type="text"
                    placeholder={user.country}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  {fileName && fileName}

                  <img
                    className="userUpdateImg"
                    src={user.image}
                    alt=""
                  />

                  <div className="userUpdateUploadContainer">
                    <label htmlFor="file">
                      <PublishIcon className="userUpdateIcon" />
                    </label>

                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        setFile(event.target.files![0]);
                        setFileName(event.target.files![0].name);
                      }}
                    />

                    <button onClick={handleUpload}>Upload</button>
                  </div>

                  {uploadMessage && uploadMessage}
                </div>
                
                <button 
                  className="userUpdateButton"
                  onClick={handleClick}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
)