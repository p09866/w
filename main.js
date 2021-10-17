Webcam.set({
    width:350,
    height:300,
    iameg_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'">'
    });
}
console.log('ml5.version=',ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/kp9jn4FCz/model.json",modelLoaded)
function modelLoaded(){
    console.log("Model loaded")
}
prediction_1=""
prediction_2=""
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first prediction is"+prediction_1;
    speak_data2="The 2nd prediction is"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utterthis)
}

function chck(){
    var img=document.getElementById("captured_img");
    classifier.classify(img,gotresults);
}

function gotresults(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emo_name1").innerHTML=results[0].label;
        document.getElementById("result_emo_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak()
        if(results[0].label=="victory"){
            document.getElementById("upd_emo1").innerHTML="&#9996";
        }else if(results[0].label=="ok"){
            document.getElementById("upd_emo1").innerHTML="&#x1F44D";
        }else if(result[0].label=="not ok"){
            document.getElementById("upd_emo1").innerHTML="&#x1F44"
        }

        if(results[1].label=="victory"){
            document.getElementById("upd_emo2").innerHTML="&#9996";
        }else if(results[1].label=="ok"){
            document.getElementById("upd_emo2").innerHTML="&#x1F44D";
        }else if(result[1].label=="not ok"){
            document.getElementById("upd_emo2").innerHTML="&#x1F44E"
        }
    }
}
