# Image Labeling with TensorFlow.js and Hugging Face

This project is a React application that allows users to upload an image, classify it using a pre-trained MobileNet model from TensorFlow.js, and generate a description using Hugging Face's GPT-2 model.

## Features

- Upload an image for classification.
- Classify the image using TensorFlow.js MobileNet model.
- Generate a description of the image using Hugging Face's GPT-2 model.

## Technologies Used

- React
- TensorFlow.js
- Hugging Face Inference API
- Material-UI

## Getting Started
- Create a Hugging Face account.
- Get your Hugging Face API key from [Hugging Face](https://huggingface.co/).
- Create an .env file in the root directory and add your Hugging Face API key:
    ```env
    VITE_HF=your_hugging_face_api_key
    ```
### Prerequisites

- Node.js and npm installed on your machine.
- A Hugging Face API key.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/image-label.git
    cd image-label
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

### Usage

1. Click on the "Upload Image" button to upload an image.
2. Once the image is uploaded, click on the "Classify Image" button to classify the image.
3. View the classification results and generated description.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [TensorFlow.js](https://www.tensorflow.org/js)
- [Hugging Face](https://huggingface.co/)
- [Material-UI](https://mui.com/)
