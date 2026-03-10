let isReading = false;
let currentSpeech = null;
let audioPlayer = null;


/* =========================
   HÄMTA TEXT
   ========================= */

function getReadableText(){

    let content =
        document.querySelector('.readable-content') ||
        document.querySelector('.readable-content-wrapper');

    if(!content) return "";

    return content.innerText;

}


/* =========================
   STOPPA ALLT
   ========================= */

function stopReading(){

    window.speechSynthesis.cancel();

    if(audioPlayer){
        audioPlayer.pause();
        audioPlayer = null;
    }

    isReading = false;
}


/* =========================
   SVENSKA
   ========================= */

function toggleRead(){

    if(isReading){
        stopReading();
        return;
    }

    let text = getReadableText();

    let speech = new SpeechSynthesisUtterance(text);

    speech.lang = "sv-SE";
    speech.rate = 1;

    speech.onend = function(){
        isReading = false;
    };

    speechSynthesis.speak(speech);

    isReading = true;

}


/* =========================
   SOMALISKA
   ========================= */

async function readSomali(){

    if(isReading){
        stopReading();
        return;
    }

    let text = getReadableText();

    let translated = await translateText(text,"so");

    let speech = new SpeechSynthesisUtterance(translated);

    speech.lang = "so-SO";
    speech.rate = 1;

    speech.onend = function(){
        isReading = false;
    };

    speechSynthesis.speak(speech);

    isReading = true;

}


/* =========================
   ARABISKA (Google TTS)
   ========================= */

async function readArabic(){

    if(isReading){
        stopReading();
        return;
    }

    let text = getReadableText();

    let translated = await translateText(text,"ar");

    let speech = new SpeechSynthesisUtterance(translated);

    speech.lang = "ar-SA";
    speech.rate = 1;

    speech.onend = function(){
        isReading = false;
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);

    isReading = true;

}


/* =========================
   GOOGLE ÖVERSÄTTNING
   ========================= */

async function translateText(text,target){

    try{

        const url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=sv&tl=" +
        target +
        "&dt=t&q=" +
        encodeURIComponent(text);

        const response = await fetch(url);

        const data = await response.json();

        return data[0].map(x=>x[0]).join("");

    }catch(e){

        console.warn("Översättning misslyckades",e);

        return text;

    }

}


/* =========================
   STÖD FÖR GAMLA KNAPPAR
   ========================= */

document.addEventListener("DOMContentLoaded",function(){

    const oldButton = document.getElementById("readBtn");

    if(oldButton){
        oldButton.addEventListener("click",toggleRead);
    }

});



