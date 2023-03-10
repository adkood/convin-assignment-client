import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { bucketModalActions } from "../store";
import { Box } from "@mui/material";

const AddCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ele_Name = useSelector((state) => state.bucketModal.elementName);

  const [inpval, setInpval] = useState({
    name: "",
    link: "",
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setInpval((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    dispatch(bucketModalActions.stateToggle());
  },[]);

  const addCardFunc = async (e) => {
    e.preventDefault();

    const { name, link } = inpval;

    const res = await fetch("/addCard", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        bucket: `${ele_Name}`,
        link,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error!!!");
    } else {
      navigate("/");
    }
  };

  return (
    <Box width={"100%"} height="50%" position="absolute" top="20%">
      <div className="container">
        <form>
          <div className="row">
            <div class="mb-3">
              <label style={{ color: "#e60073" }} for="name" class="form-label">
                Name
              </label>
              <input
                style={{ color: "#e60073", borderColor: "#e60073" }}
                type="name"
                value={inpval.name}
                onChange={setData}
                name="name"
                class="form-control"
                id="name"
              />
            </div>
            <div class="mb-3">
              <label style={{ color: "#e60073" }} for="work" class="form-label">
                Video Link
              </label>
              <textarea
                style={{ color: "#e60073", borderColor: "#e60073" }}
                name="link"
                value={inpval.link}
                onChange={setData}
                className="form-control"
                cols="30"
                rows="3"
              ></textarea>
            </div>
            <button
              style={{ backgroundColor: "#e60073", borderStyle: "none" }}
              type="submit"
              onClick={addCardFunc}
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default AddCard;
