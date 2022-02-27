const video = document.querySelector('video');
const texthere = document.querySelector('[data-text]')

async function setup(){
    const stream = await navigator.mediaDevices.getUserMedia({video : true});
    video.srcObject = stream
    // console.log(stream)
}

video.addEventListener("playing", async ()=>{
    const worker = Tesseract.createWorker();
    // console.log(worker);
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        const canvas = document.createElement('canvas');
        canvas.width = video.width
        canvas.height = video.height;
        // console.log(canvas);

        document.addEventListener("keypress", async e=>{
            // console.log(e.code)
            if (e.code !== "Space") return
            canvas.getContext("2d").drawImage(video,0,0,canvas.width,canvas.height)
            
            // pass a pic or video stream to read
            const { data: { text } } = await worker.recognize(canvas);
            console.log(text);
            texthere.textContent = text;
            // await worker.terminate();

            // libarary for speech
            speechSynthesis.speak(
                new SpeechSynthesisUtterance(text.replace(/\s/g,' '))
            )
        })
        
});
// console.log(e)
    // if (e.code !== "space") return


setup()