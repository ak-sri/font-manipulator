noseX= 0; 
noseY=0; 
difference=0; 
rightWristX=0; 
leftWristX=0; 

function setup(){
    video= createCapture(VIDEO); 
    video.size(550,500); 

    canvas= createCanvas(550,550); 
    canvas.position(560,150); 

    poses= ml5.poseNet(video, modelLoaded); 
    poses.on('pose', gotPoses); 
}

function draw(){
    background('#fafad2'); 
    textSize(difference); 
    fill('#000000');
    text('Welcome!', noseX, noseY); 
    document.getElementById('font-size').innerHTML="The font size of the text is "+ difference; 
}

function modelLoaded(){
    console.log("PoseNet model is initialized"); 
}

function gotPoses(results){
    if (results.length>0){
        console.log(results);
        noseX= results[0].pose.nose.x; 
        noseY= results[0].pose.nose.y;
        console.log("Nose x: "+ noseX); 
        console.log("Nose Y: "+ noseY);  

        leftWristX= results[0].pose.leftWrist.x; 
        rightWristX= results[0].pose.rightWrist.x;
        console.log("Left Wrist X: "+ leftWristX); 
        console.log("Right Wrist YX "+ rightWristX); 
        
        difference= floor(leftWristX-rightWristX); 
        console.log(difference); 
    }
    else{
        console.log("No pose points found. Please try again later.")
    }
}