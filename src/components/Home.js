import React, { useEffect, useState } from "react";

// import { useDispatch } from "react-redux";
// import { modalActions } from "../store";
import { Box } from "@mui/material";
import Bucket from "./Bucket";

const Home = () => {
  // const dispatch = useDispatch();

  const [bucketData, setBucketData] = useState([]);
  // console.log(userData);

  const getBuckets = async (e) => {
    const res = await fetch("/getBuckets", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 404 || !data) {
      console.log("can not fetch buckets");
    } else {
      setBucketData(data);
      console.log("data fetched");
    }
  };

  useEffect(() => {
    getBuckets();
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "95%",
          backgroundImage: "url(background.png)",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
          // borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "scroll",
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {bucketData.map((ele, id) => {
          return <Bucket props={ele}></Bucket>
        })}
      </Box>
    </Box>
  );
};

export default Home;
