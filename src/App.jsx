import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { HfInference } from "@huggingface/inference";

import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const classifyImage = async () => {
    setLoading(true);

    if (setImage) {
      await tf.setBackend("webgl");
      await tf.ready();
      console.log("WebGL backend initialized!");
    }

    const model = await mobilenet.load();
    const imgElement = document.getElementById("uploadedImage");
    const results = await model.classify(imgElement);
    setPredictions(results);
    setLoading(false);
  };


  const hf = new HfInference({ apiKey: import.meta.env.VITE_HF });

  const generateDescription = async (predictions) => {
    const input = `Image contains: ${predictions.join(
      ", "
    )}. Write a simple description.`;

    const response = await hf.textGeneration({
      model: "gpt2",
      inputs: input,
      parameters: { max_new_tokens: 50 },
    });

    return response.generated_text;
  };

  console.log("Gen by GPT", generateDescription);

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Image Classifier
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" component="label" color="primary">
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {image && (
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <img
            id="uploadedImage"
            src={image}
            alt="Uploaded"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              marginBottom: "10px",
            }}
          />
          <Button variant="contained" color="secondary" onClick={classifyImage}>
            Classify Image
          </Button>
        </Box>
      )}
      {predictions.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Predictions:
            </Typography>
            <ul>
              {predictions.map((prediction, index) => (
                <li key={index}>
                  {prediction.className} -{" "}
                  {Math.round(prediction.probability * 100)}%
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default App;
