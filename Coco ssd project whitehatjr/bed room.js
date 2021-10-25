img = "";
status = "";
objects = "";

function preload()
{
    img = loadImage('https://thumbs.dreamstime.com/b/simple-bedroom-interior-one-bed-creamy-tones-view-white-bedding-43515109.jpg');
}

function setup()
{
    canvas = createCanvas(600,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"; 
}

function draw()
{
    image(img, 0, 0, 600,500);
    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected Are : "+ objects.length;
            fill(r,g,b);
            pecent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error,results)
{
    if (error){
    console.log(error);
    }
    console.log(results);
}