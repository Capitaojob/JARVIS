const circles = document.querySelectorAll('.circle')
const rotatingCircle = document.querySelector('.rotating')
const explosion = new Audio('./assets/explosion.mp3')
const signature = new Audio('./assets/signature.mp3')
const jokeURL = "https://v2.jokeapi.dev/joke/Any?"
const initialization = document.querySelector(".initialize")
let answers = []
let jarvis = false 
let sentence = ''
let text = ''

signature.volume = 0.7

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
                text = 'We are in a hurry, huh?'
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