<!DOCTYPE html>
<html>
<head>
<script src='js.js'></script>

<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
<title>HTML VIDEO</title>
</head>
<body>

<div class='container'>
<div class='image_container'>
                    <img id="nose" src="http://localhost:8888/cNYvideo/cartoon-pig-nose.png">
            </div>
            <div class='video_container'>
                <video id="video" width="640" height="480" autoplay='true' muted='muted'></video>
            </div>

            <div class="canvas_container">
                <canvas id='demo' width="640" height="480"></canvas>
                <br>
                <input class='slider' type=range min=1 max=10 value=0 id="factor"/>
                <canvas id="canvas" width="640" height="480"></canvas>
            </div>
            <div class="button">
                <button id="snap">Take Photo!</button>
                <a id="download" href="#">Download</a>
                <button id="pigelate">PIGelate</button>
            </div>
            
</div>

    <style>
    
    .container {
        position: relative;
        width: 100%;
    }
    .video_container video{
        margin: 0 auto;
        display: block;
    }
    .image_container img{
        margin: 0 auto;
        display: block;
    }
    .canvas_container canvas{
        margin: 0 auto;
        display: block;
    }

    #nose {
        position:absolute; 
        right: 0;
        left: 0;
        top: 45.5%;
        margin: 0 auto;
        width:150px;
    }
    button, a {
        padding: 8px 30px;
        font-size: 1.125rem;
        font-weight: 200;
        background-color: #ea3333;
        color: #fff;
        border: 0 none;
        font-family: 'Source Sans Pro', sans-serif;
    }
    #download, #pigelate {
        display: none;
        text-decoration:none;
    }
    .button {
        margin-top:20px;
        text-align: center;
        display: block;
    }
    #canvas, #demo {
        display:none;
    }
    #factor {
    display:none;
    -webkit-appearance: none;
    height: 25px;
     outline: none;
    opacity: 0.7;
}
    </style>
</body>
</html>