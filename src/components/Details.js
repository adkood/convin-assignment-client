import React, { useEffect, useState } from "react";

import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Details = (props) => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const { id } = props;

  const getuser = async (e) => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setUserData(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getuser();
  }, []);


  const deleteUser = async(id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const deleteData = await res2.json();
    if (res2.status === 404 || !deleteData) {
      console.log("error!");
    } else {
      console.log("user deleted!");
      navigate("/");
    }
  };

  return (
    <div className="container mt-3" width='100%' height='100%'>
      <h1 style={{ fontWeight: 400 }}>Welcome {userData.name}</h1>

      <Card >
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${userData._id}`}>
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>
            <button onClick={() => deleteUser(userData._id)} className="btn btn-danger">
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.jpg" style={{ width: 60 }} alt="profile" />
              <h3 className="mt-3">
                Name: <span>{userData.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{userData.age}</span>
              </h3>
              <p>
                <EmailIcon />
                Email: <span>{userData.email}</span>
              </p>
              <p>
                <WorkIcon />
                Occupation: <span>{userData.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <CallIcon />
                Mobile: <span>{userData.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Location: <span>{userData.add}</span>
              </p>
              <p className="mt-3">
                Description: <span> {userData.desc} </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
