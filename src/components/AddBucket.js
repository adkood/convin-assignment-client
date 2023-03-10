import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AddBucket = () => {
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    desc: "",
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

  const addBucketFunc = async (e) => {
    e.preventDefault();

    const { name, desc } = inpval;

    const res = await fetch("/addBucket", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        desc,
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
                Description
              </label>
              <textarea
                style={{ color: "#e60073", borderColor: "#e60073" }}
                name="desc"
                value={inpval.desc}
                onChange={setData}
                className="form-control"
                cols="30"
                rows="5"
              ></textarea>
            </div>
            <button
              style={{backgroundColor: "#e60073", borderStyle: "none" }}
              type="submit"
              onClick={addBucketFunc}
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

export default AddBucket;
