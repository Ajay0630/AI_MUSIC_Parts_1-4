var harrypotterremix;
var peterpansong;
var leftwristx = 0;
var rightwristx = 0;
var leftwristy = 0;
var rightwristy = 0;
var scoreleftwrist = 0;
var song1Status = "";

function preload() {
    harrypotterremix = loadSound("/AI MUSIC/music.mp3");
    peterpansong = loadSound("/AI MUSIC/music2.mp3");
}

function setup() {
    cam = createCapture(VIDEO);
    cam.size(1000, 800);
    cam.hide();
    canvas = createCanvas(1000, 800);
    canvas.position(775, 400);
    posenet = ml5.poseNet(cam, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("mOdEl iS lOaDeD!");
}

function draw() {
    image(cam, 0, 0, 1000, 800);
    filter(GRAY);
    fill("red");
    stroke("red");
    song1Status = harrypotterremix.isPlaying();
    if (scoreleftwrist > 0.2) {
        circle(leftwristx, leftwristy);
        peterpansong.stop();
        if (song1Status == "false") {
            harrypotterremix.play();
            document.getElementById("song").innerHTML = "Song - Harry Potter Theme (Remix)";
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
    }
}