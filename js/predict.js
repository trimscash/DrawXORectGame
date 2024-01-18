// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "./model/";

let model, labelContainer, maxPredictions;


// Load the image model and setup the webcam
export async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }

    setInterval(async () => {
        let prediction = await predict();
        // console.log(prediction)
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

    }, 100);
}


export async function predict() {
    // predict can take in an image, video or canvas html element
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#001";

    return await model.predict(canvas);
}
