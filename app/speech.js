const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const speech = document.querySelector("h1")
const quickResponses = [
    'At your service, sir',
    'Yes?',
    'How can i help?',
    'Sir?',
    'Hello, sir! What can i do for you?',
    'I am here! Just took a nap! What do you need?'
]
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

var recognition = new SpeechRecognition()

recognition.lang =  localStorage.getItem('lang') || 'en'

recognition.addEventListener('result', async function (e) {

    sentence = e.results[0][0].transcript
    speech.innerText = sentence
    let lowerSentence = sentence.toLowerCase()

    if (jarvis == true) {
        jarvis = false

        jarvisRecognition(lowerSentence)
    } 

    // else if (sentence.includes('Jarvis')) {
    else if (lowerSentence.includes(botName.toLowerCase())) {
        let fullSentence = sentence.split(' ')

        if (fullSentence[1]) {
            // let command = (fullSentence.slice(fullSentence.indexOf("Jarvis") + 1)).join(' ').toLowerCase()
            let command = (fullSentence.slice(fullSentence.indexOf(botName) + 1)).join(' ').toLowerCase()
            if (command) {
                jarvisRecognition(command)
                return
            }
        }
            
        text = quickResponses[Math.floor(Math.random() * quickResponses.length)]

        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
        jarvis = true

        speech.innerText = sentence.replace(/[Jj]arvis/g, "J.A.R.V.I.S")
    }
})

function checkSpeechSynthesis(i) {
    if (!sleeping) {
        let delay = i > 0 ? 50 : 500

        setTimeout(() => {
            if (!window.speechSynthesis.speaking) {
                recognition.start()
            } else {
                i++
                checkSpeechSynthesis(i)
            }
        }, delay)
    }
}

recognition.addEventListener('end', () => {
    checkSpeechSynthesis(0)
})