const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const voices = speechSynthesis.getVoices() || []
const speech = document.querySelector(".output")
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

const recognition = new SpeechRecognition()
recognition.lang = 'en-US'

recognition.addEventListener('result', async function (e) {

    sentence = e.results[0][0].transcript
    let lowerSentence = sentence.toLowerCase()
    
    speech.innerText = lowerSentence.replace(botName[0].toLowerCase(), botName[1])
    // let reg = new RegExp(botName[0], "ig");
    // speech.innerText = sentence.replace(reg, botName[1])

    if (jarvis == true) {
        jarvis = false
        jarvisRecognition(lowerSentence)
    } 

    else if (lowerSentence.includes(botName[0].toLowerCase())) {
        let fullSentence = lowerSentence.split(' ')

        if (fullSentence[1]) {
            let command = (fullSentence.slice(fullSentence.indexOf(botName[0].toLowerCase()) + 1)).join(' ').toLowerCase()

            if (command) {
                jarvisRecognition(command)
                return
            }
        }
            
        text = quickResponses[Math.floor(Math.random() * quickResponses.length)]

        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
        jarvis = true
    }
})

function checkSpeechSynthesis(i) {
    if (!sleeping) {
        let delay = i > 0 ? 50 : 500

        setTimeout(() => {
            if (!speechSynthesis.speaking) {
                recognition.start()
            } else {
                i++
                checkSpeechSynthesis(i)
            }
        }, delay)
    }
}

function updateVoices() {
    jarvisSpeech('', 0.8, 0.2, 1, 'en')

    voices.forEach((v, i) => {
        if (v.lang != 'en-US') {
            voices.splice(i, 1)
        }
    })
}

recognition.addEventListener('end', () => {
    checkSpeechSynthesis(0)
})