
//Init the speechSynthesis API
const synth= window.speechSynthesis;

var textForm = document.querySelector('form');
var textInput = document.querySelector('#text-input');
var voiceSelect = document.querySelector('#voice-select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('#pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('#rate-value');
var body= document.querySelector('body');

let voices=[];

function getVoices(){

  voices=synth.getVoices();

  voices.forEach(voice => {

    const option = document.createElement('option');
    option.textContent= voice.name + '(' + voice.lang +')'

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
}



getVoices();

if(synth.onvoiceschanged!== undefined){
  synth.onvoiceschanged=getVoices;
}

//Speak

function speak(){

  //body.style.background = 'black url('img/wave.gif')';
  //body.style.backgroundReapeat= 'repeat-x';
  //body.style.backgroundSize = '100% 100%';

  if(synth.speaking){
    console.log('already speaking');
    return;
  }

  if(textInput.value !== ''){
    //get speaktext
    const speakText= new SpeechSynthesisUtterance(textInput.value);
    speakText.onend = e => {
      console.log('done speaking');
    }

    speakText.onerror = e => {
      console.log('something is wrong');
    }

    //select voice

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //Loop through voiceSelect

    voices.forEach( voice => {
      if(voice.name === selectedVoice){
        speakText.voice=voice;
      }
    });

    //set rate and pitchValue

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);

    
  }

}

//EventListener

//text

textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//change of rate and pitchValue

rate.addEventListener('change', e => rateValue.textContent= rate.value);

pitch.addEventListener('change', e => pitchValue.textContent= pitch.value);

voiceSelect.addEventListener('change', e => speak());
