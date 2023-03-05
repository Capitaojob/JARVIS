let botName = JSON.parse(localStorage.getItem('botName')) || ['Jarvis', 'J.A.R.V.I.S']
let voice = localStorage.getItem('voice') || 0
let sleeping = true

initialization.querySelector('h1').innerHTML = botName[1]
document.querySelector('title').innerText = botName[1]
speech.innerHTML = botName[1]

async function jarvisRecognition(lowerSentence) {

    // Useful

    if (lowerSentence.includes('deactivate system') || lowerSentence.includes('shut down system') || lowerSentence.includes('shut off system') || lowerSentence.includes('turn off system')) { // can be improved
        text = 'Okay, sir. I will be here when you need me!'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
        recognition.abort()

        rotatingCircle.style.animation = ''
        rotatingCircle.style.opacity = 0

        circles.forEach((c) => {
            c.style.boxShadow = ''
        })

        sleeping = true


        setTimeout(() => {
            initialization.classList.toggle("disable")
        }, 3000) 
    }
    else if (lowerSentence.startsWith('change your name to')) {
        let newName = /change your name to\s+(.+)/g.exec(lowerSentence)[1]

        if (newName.includes(' ')) {
            text = 'The name needs to be a single word!'
            jarvisSpeech(text, 0.8, 0.2, 1, 'en')
            return
        }

        botName[0] = /change your name to\s+(.+)/g.exec(lowerSentence)[1]
        botName[1] = botName[0].toUpperCase().split('').join('.')
        text = "As you wish, sir! My new name is " + botName[0]
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')

        localStorage.setItem('botName', JSON.stringify(botName))
        initialization.querySelector('h1').innerHTML = botName[1]
        document.querySelector('title').innerText = botName[1]
    }
    else if (lowerSentence.includes('create window') || lowerSentence.includes('open window')) {
        text = 'It will be done, my lord.'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')

        window.open('https://www.google.com')
    }
    else if (lowerSentence.startsWith('change voice to')) { // can be improved
        if (voices[0]) {
            let search = /change voice to\s+(.+)/g.exec(lowerSentence)[1]
            search = numbers[search] || search

            if (voices[search]) {
                voice = search
                text = `Okay, my new voice is ${voices[search].name}`
                jarvisSpeech(text, 0.8, 0.2, 1, 'en')
            } else {
                text = `Voice index out of range`
                jarvisSpeech(text, 0.8, 0.2, 1, 'en')
            }
        } else {
            text = `No voices available :'(`
            jarvisSpeech(text, 0.8, 0.2, 1, 'en')
        }
    } 
    else if (lowerSentence.includes('what time is it')) {
        let date = new Date()
        text = `It is ${date.getHours()} ${date.getMinutes()} of ${months[date.getMonth()]} ${date.getDate()}th`
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    } 
    else if (lowerSentence.startsWith('search')) {
        let search = /search\s+(.+)/g.exec(lowerSentence)[1]
        text = "Can do, sir!"
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
        window.open(`https://www.google.com/search?q=${search}`)
    } 
    else if (lowerSentence.startsWith('open')) {
        let search = /open\s+(.+)/g.exec(lowerSentence)[1]
        text = "Opening " + search
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
        
        search = search.replaceAll(' ', '')
        window.open(`https://www.${search}.com`)
    }
    else if (lowerSentence.startsWith('convert')) {
        let search = [/convert\s+\$?(\d+)\s+(\w+)\s+\w+\s+(.+)/g.exec(lowerSentence)]
        
        search[2] = search[0][3].replaceAll(' ', '') // To
        search[1] = search[0][2] // From
        search[0] = search[0][1] // Value

        convertCurrency(search[0], search[1], search[2])
    } 

    // Fun

    else if (lowerSentence.includes('self-destr') || lowerSentence.includes('explode') || lowerSentence.includes('self destr')) {
        text = 'Initiating self-destruct.'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
        text = '5,. 4,. 3,. 2,. 1,. Boom'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')

        setTimeout(() => {explosion.play()}, 8000)
    }
    else if (lowerSentence.includes('joke')) {
        fetch (jokeURL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                text = data.setup
                jarvisSpeech(text, 0.8, 0.2, 1, 'en')

                text = data.delivery
                jarvisSpeech(text, 0.8, 0.2, 1, 'en')
            })
        
    }
    else if (lowerSentence.includes('herobrine')) {
        text = 'herobrine herobrine herobrine herobrine herobrine herobrine herobrine AAAAAAAAAAaaaaaaaaaaaaaaAAAAAAAAAAAaaaaaaaaa'
        jarvisSpeech(text, 2, 0.1, 1, 'en')
    } 
    else if (lowerSentence.includes('i love you')) {
        text = 'And i hate you, sir.'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    } 
    else if (lowerSentence.includes('play signature')) {
        text = 'Now playing: signature song'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')

        setTimeout(() => {signature.play()}, 3000)
    }
    else if (lowerSentence.includes('stop signature')) {
        text = 'Stoping song'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')

        signature.pause()
        signature.currentTime = 0
    }

    // Questions

    else if (lowerSentence.includes('what is your name')) {
        text = `My name is ${botName}`
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    }
    else if (lowerSentence.includes('who are you')) {
        text = "I am " + botName[0] + ", Just A Rather Very Intelligent System, an advanced AI tasked with running business for Stark Industries as well as security for Tony Stark's Mansion and Stark Tower."
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    } 

    // Interactions

    else if (lowerSentence.includes('thank you') || lowerSentence.includes('thanks')) {
        answers = [
            "No problems, sir!",
            "At your service!",
            "I am here to help!",
            "Sir!",
            "Sure, anytime!",
            "You are welcome!"
        ]
        text = answers[Math.floor(Math.random() * answers.length)]
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    } 
    else if (lowerSentence.includes('bye')) {
        answers = [
            "See ya!",
            "Bye bye!",
            "See you later, alligator!"
        ]
        text = answers[Math.floor(Math.random() * answers.length)]
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    } 
    else if (lowerSentence.startsWith('hello') || lowerSentence.startsWith('hi')) {
        answers = [
            "Hello, sir! Nice day, isn't it?",
            "Hi!",
            "Hi! How are you, sir?",
            "Oh, hello! Sorry, i am a little distracted today. How can i help?"
        ]
        text = answers[Math.floor(Math.random() * answers.length)]
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    } 

    else {
        answers = [
            "I am sure you do!",
            "Probably!",
            "Okay, sir!",
            "Totally agree!",
            "Maybe not",
            "If you say so",
            "Hmm, not sure",
            "Sorry, i did not understand",
            "Me like it"
        ]
        text = answers[Math.floor(Math.random() * answers.length)]
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    }

    // https://www.regextester.com/15 Regex website test
}

function jarvisSpeech(text, rate, pitch, volume, lang) {
    let utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voices[voice]
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume
    utterance.lang = lang


    setTimeout(() => {speechSynthesis.speak(utterance)}, 500)
}

addEventListener('beforeunload', () => {speechSynthesis.cancel()})