let isReading = false;
let currentSpeech = null;

let arabicAudio = null;
let arabicPlaying = false;


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
   STARTA UPPLÄSNING
   ========================= */

function startReading(text,lang){

    window.speechSynthesis.cancel();

    currentSpeech = new SpeechSynthesisUtterance(text);
    currentSpeech.lang = lang;
    currentSpeech.rate = 1;

    currentSpeech.onend = function(){

        isReading=false;
        updateButtons();

    };

    speechSynthesis.speak(currentSpeech);

    isReading=true;

    updateButtons();

}


/* =========================
   STOPPA
   ========================= */

function stopReading(){

    speechSynthesis.cancel();

    if(arabicAudio){
        arabicAudio.pause();
        arabicAudio=null;
    }

    arabicPlaying=false;
    isReading=false;

    updateButtons();

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

    startReading(text,"sv-SE");

}


/* =========================
   ARABISKA
   ========================= */

function readArabic(){

    stopReading(); // stoppa allt annat först

    let text = getReadableText();
    if(!text) return;

    const speech = new SpeechSynthesisUtterance(text);

    // försök hitta arabisk röst
    const voices = speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("ar"));

    if(arabicVoice){
        speech.voice = arabicVoice;
        speech.lang = arabicVoice.lang;
    } else {
        speech.lang = "ar";
    }

    speech.rate = 1;

    speech.onend = function(){
        isReading = false;
        updateButtons();
    };

    speechSynthesis.speak(speech);
    isReading = true;
    updateButtons();
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

    startReading(translated,"so-SO");

}


/* =========================
   UPPDATERA KNAPPAR
   ========================= */

function updateButtons(){

    const buttons = document.querySelectorAll(".stop-button");

    buttons.forEach(button=>{

        if(isReading){
            button.innerText="⏹ Stoppa";
        }else{
            button.innerText="🔊 Svenska";
        }

    });

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
