import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bucketModalActions } from "../store";

const Bucket = ({ props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteBuckets = async (id) => {
    const res2 = await fetch(`/deleteBucket/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const deleteData = await res2.json();
    if (res2.status === 404 || !deleteData) {
      console.log("error!");
    } else {
      console.log("bucket deleted!");
      navigate("/yourHistory");
    }
  };

  const saveName = (ele) => {
    dispatch(bucketModalActions.newName(ele));
    dispatch(bucketModalActions.stateToggle());
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant="outline"
      border={"8px solid white"}
      borderRadius="10px"
      width="65%"
      height="160px"
      display={"flex"}
      justifyContent="space-evenly"
      alignItems={"center"}
      margin="15px"
      overflow="visible"
      _hover={{
        boxShadow: "1px 3px 15px #e60073",
      }}
    >
      <Stack
        width={"93%"}
        height="100%"
        display={"flex"}
        justifyContent="space-evenly"
        alignItems={"center"}
        onClick={() => saveName(props.name)}
      >
        <CardBody
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          flexDirection="column"
        >
          <Heading
            fontSize={"40px"}
            textShadow="2px 2px 2px #e60073"
            fontFamily={"heading"}
            color="white"
          >
            {props.name}
          </Heading>

          <Text py="5" fontSize={"22px"} fontFamily={"heading"} color="#e60073">
            {props.desc}
          </Text>
        </CardBody>
      </Stack>
      <CardFooter onClick={() => deleteBuckets(props._id)}>
        <DeleteOutlineIcon color="error" fontSize="large"></DeleteOutlineIcon>
      </CardFooter>
    </Card>
  );
};

export default Bucket;
