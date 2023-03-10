import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

export default function History() {
  const [historyData, setHistoryData] = React.useState([]);
  console.log(historyData);

  const getHistory = async (e) => {
    const res = await fetch("/getHistory", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 404 || !data) {
      console.log("can not fetch history");
    } else {
      setHistoryData(data);
      console.log("history fetched");
    }
  };

  React.useEffect(() => {
    getHistory();
  }, []);

  return (
    <Box
      width={"100%"}
      height={"90vh"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <Box
        height={"90%"}
        border={"4px solid #e60073"}
        borderRadius="5px"
        width={"60%"}
        sx={{
          overflow: "scroll",
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#e60073", fontWeight: "bolder" }}>
                  Name
                </TableCell>
                <TableCell style={{ color: "#e60073", fontWeight: "bolder" }}>
                  Video Link
                </TableCell>
                <TableCell style={{ color: "#e60073", fontWeight: "bolder" }}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.reverse().map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ color: "#e60073" }}>{row.name}</TableCell>
                  <TableCell style={{ color: "#e60073" }}>{row.link}</TableCell>
                  <TableCell style={{ color: "#e60073" }}>
                    {row.startTime}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
