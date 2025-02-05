import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { ReactMediaRecorder } from "react-media-recorder";
import MonacoEditor from "@uiw/react-monacoeditor";

import Navbar from "./navbar";
import { API_ENDPOINT } from "./api";

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={700} height={600} autoPlay controls />;
};

function QuestionDetails() {
  const { pk } = useParams();
  const [question, setQuestion] = useState({});

  useEffect(() => {
    const url = `${API_ENDPOINT}/questions/get-questions/?q_id=${pk}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data.question_data[0].fields);
      })
      .catch((error) => console.error(error));
  }, [pk]);

  const [language, setLanguage] = useState("python");
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <Navbar />

      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          {question.title}
        </Typography>

        <Stack direction="row" spacing={1}>
          {question.type === "Behavioural" ? (
            <Chip
              label={question.type}
              variant="outlined"
              style={{ color: "#454AE5", borderColor: "#454AE5" }}
            />
          ) : (
            <Chip
              label="Coding"
              variant="outlined"
              style={{ color: "#C01C63", borderColor: "#C01C63" }}
            />
          )}
          {question.difficulty === "Easy" ? (
            <Chip
              label={question.difficulty}
              style={{ color: "#FFFFFF", backgroundColor: "#50ecb3" }}
            />
          ) : question.difficulty === "Medium" ? (
            <Chip
              label={question.difficulty}
              style={{ color: "#FFFFFF", backgroundColor: "#94d3c5" }}
            />
          ) : question.difficulty === "Hard" ? (
            <Chip
              label={question.difficulty}
              style={{ color: "#FFFFFF", backgroundColor: "#41a9b6" }}
            />
          ) : question.difficulty === "Expert" ? (
            <Chip
              label={question.difficulty}
              style={{ color: "#FFFFFF", backgroundColor: "#276e72" }}
            />
          ) : question.difficulty === "Beginner" ? (
            <Chip
              label={question.difficulty}
              style={{ color: "#FFFFFF", backgroundColor: "#276e72" }}
            />
          ) : (
            <></>
          )}
          <Divider orientation="vertical" flexItem />
          {question.companies &&
            question.companies.length !== 0 &&
            question.companies
              .split(",")
              .map((company) => (
                <Chip id={company} label={company} style={{ marginLeft: 10 }} />
              ))}
          <Divider orientation="vertical" flexItem />
          {question.positions &&
            question.positions.length !== 0 &&
            question.positions
              .split(",")
              .map((position) => (
                <Chip
                  id={position}
                  label={position}
                  style={{ marginLeft: 10 }}
                />
              ))}
        </Stack>

        <Box sx={{ marginTop: 2 }} style={{ marginTop: 30 }}>
          <Stack direction="row" spacing={3}>
            <div
              style={{
                backgroundColor: "#ebebeb",
                width: "45vw",
                height: "65vh",
                padding: 20,
                borderRadius: "15px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Description:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {question.description}
              </Typography>
            </div>

            {question.type === "Coding" && (
              <div>
                <ReactMediaRecorder
                  screen
                  blobPropertyBag={{
                    type: "video/webm",
                  }}
                  // askPermissionOnMount={true}
                  render={({
                    previewStream,
                    status,
                    startRecording,
                    stopRecording,
                    mediaBlobUrl,
                  }) => {
                    console.log(previewStream);
                    return (
                      <div>
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            onClick={startRecording}
                            style={{
                              textTransform: "none",
                              color: "#C01C63",
                              borderColor: "#C01C63",
                            }}
                          >
                            Start Recording Screen
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={stopRecording}
                            style={{
                              textTransform: "none",
                            }}
                          >
                            Stop Recording
                          </Button>
                          <Chip
                            label={"Video status: " + status}
                            variant="outlined"
                            style={{
                              marginTop: 2,
                            }}
                          />
                        </Stack>
                        {/* <audio src={mediaBlobUrl} controls autoPlay loop /> */}
                        <video
                          src={mediaBlobUrl}
                          controls
                          style={{ width: "48vw", marginTop: "20px" }}
                        />
                      </div>
                    );
                  }}
                />
              </div>
            )}
            {question.type === "Behavioural" && (
              <div>
                <ReactMediaRecorder
                  video
                  blobPropertyBag={{
                    type: "video/webm",
                  }}
                  // askPermissionOnMount={true}
                  render={({
                    previewStream,
                    status,
                    startRecording,
                    stopRecording,
                    mediaBlobUrl,
                  }) => {
                    console.log(previewStream);
                    return (
                      <div>
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            onClick={startRecording}
                            style={{
                              textTransform: "none",
                              color: "#C01C63",
                              borderColor: "#C01C63",
                            }}
                          >
                            Start Recording
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={stopRecording}
                            style={{
                              textTransform: "none",
                            }}
                          >
                            Stop Recording
                          </Button>
                          <Chip
                            label={"Video status: " + status}
                            variant="outlined"
                            style={{
                              marginTop: 2,
                            }}
                          />
                        </Stack>
                        {/* <audio src={mediaBlobUrl} controls autoPlay loop /> */}

                        {status === "stopped" && (
                          <video
                            src={mediaBlobUrl}
                            controls
                            style={{ width: "40vw", marginTop: "20px" }}
                          />
                        )}

                        {status !== "stopped" && (
                          <VideoPreview stream={previewStream} />
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            )}
          </Stack>
        </Box>
      </Box>
      {question.type === "Coding" && (
        <div
          style={{
            height: "800px",
            width: "96vw",
            marginTop: "20px",
            marginBottom: "20px",
            padding: "20px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Write your code here:
          </Typography>
          <FormControl style={{ width: "10vw" }}>
            <InputLabel id="demo-simple-select-label">language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="language"
              onChange={handleLanguageChange}
            >
              <MenuItem value={"python"}>python</MenuItem>
              <MenuItem value={"c"}>c</MenuItem>
              <MenuItem value={"java"}>java</MenuItem>
              <MenuItem value={"javascript"}>javascript</MenuItem>
            </Select>
          </FormControl>
          <MonacoEditor
            language={language}
            options={{
              theme: "vs-dark",
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      )}
    </>
  );
}

export default QuestionDetails;