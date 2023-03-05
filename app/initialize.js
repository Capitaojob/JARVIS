const circles = document.querySelectorAll('.circle')
const rotatingCircle = document.querySelector('.rotating')

// audios
const explosion = new Audio('./assets/explosion.mp3')
const signature = new Audio('./assets/signature.mp3')
const ironman = Math.random() > 0.5 ? new Audio('./assets/ironmansmall.mp3') : new Audio('./assets/signaturesmall.mp3')

const jokeURL = "https://v2.jokeapi.dev/joke/Any?"
const initialization = document.querySelector(".initialize")
const numbers = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
}
let answers = []
let jarvis = false 
let sentence = ''
let text = ''

signature.volume = 0.7
ironman.volume = 0.5


document.body.addEventListener("keydown", (e) => {
    if (e.code == 'Enter' || e.code == 'Space') {
        startSystem(15000, 500, 1300)
    }
})

document.body.addEventListener("click", () => {
    startSystem(2000, 500, 1300)
})

document.body.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    startSystem(0, 0, 0)
})

function startSystem(t1, t2, t3) {
    // play boot sound
    if (!initialization.classList.contains('disable')) {
        initialization.classList.toggle("disable")

        updateVoices()

        if (t1 == 15000) {
            ironman.play()
            jarvisSpeech('Welcome back, sir! Initializing all systems at full power! While i start the protocols, sit down, relax and enjoy the music!', 0.8, 0.2, 1, 'en')
        }

        setTimeout(() => {
            if (t1 != 0) {
                answers = [
                    'All systems online. Waiting for your inputs, sir!',
                    'All done! Let us begin, shall we?',
                    'Systems online! It is a beautiful day, sir!',
                    "Start up complete, let's begin!"
                ]
                text = answers[Math.floor(Math.random() * answers.length)]
            } else {
                answers = [
                    'We are in a hurry, huh?',
                    'Fast boot!',
                    'Initiating fast boot! Done!',
                    "Let's do it, sir!"
                ]
                text = answers[Math.floor(Math.random() * answers.length)]
            }

            jarvisSpeech(text, 0.8, 0.2, 1, 'en')
            
            circles.forEach((c) => {
                c.style.boxShadow = '0px 0px 5px 5px rgba(74, 219, 255, 0.3),0px 0px 10px 10px rgba(74, 219, 255, 0.2),0px 0px 20px 20px rgba(74, 219, 255, 0.1),inset 0px 0px 5px 5px rgba(74, 219, 255, 0.3),inset 0px 0px 10px 10px rgba(74, 219, 255, 0.2),inset 0px 0px 20px 20px rgba(74, 219, 255, 0.1)'
                if (c.classList.contains("rotating")) {
                    setTimeout(() => {c.style.opacity = 1}, t2)
                    setTimeout(() => {c.style.animation = 'rotate 10s infinite linear'}, t3)
                }
            })

            sleeping = false
            checkSpeechSynthesis(0)
        }, t1)
    }
}