let botName = 'Jarvis'
let sleeping = true

function jarvisRecognition(lowerSentence) {
    if (lowerSentence.includes('destroy') || lowerSentence.includes('explode')) {
        text = 'Initiating self-destruct.'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
        text = '5,. 4,. 3,. 2,. 1,. Boom'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')

        setTimeout(() => {explosion.play()}, 8000)
    }

    else if (lowerSentence.includes('deactivate system')) {
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

    else if (lowerSentence.includes('thank you') || lowerSentence.includes('thanks')) {
        answers = [
            "No problems, sir!",
            "At your service!",
            "I am here to help!",
            "Sir!",
            "Sure, anytime!"
        ]
        text = answers[Math.floor(Math.random() * answers.length)]
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    } 

    else if (lowerSentence.includes('bye')) {
        answers = [
            "See ya!",
            "Bye bye!",
            "See you later, aligator!"
        ]
        text = answers[Math.floor(Math.random() * answers.length)]
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    } 

    else if (lowerSentence.includes('what is your name')) {
        text = `My name is ${botName}`
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    }

    else if (lowerSentence.startsWith('change your name to')) {
        botName = /change your name to\s+(.+)/g.exec(lowerSentence)[1]
        text = "As you wish, sir! My new name is " + botName
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    }
    
    else if (lowerSentence.includes('i love you')) {
        text = 'And i hate you, sir.'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    } 

    else if (lowerSentence.includes('herobrine')) {
        text = 'herobrine herobrine herobrine herobrine herobrine herobrine herobrine AAAAAAAAAAaaaaaaaaaaaaaaAAAAAAAAAAAaaaaaaaaa'
        jarvisSpeech(text, 2, 0.1, 1, 'en')
    } 
    
    else if (lowerSentence.includes('create window') || lowerSentence.includes('open window')) {
        text = 'It will be done, my lord.'
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')

        window.open('https://www.google.com')
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

    else if (lowerSentence.includes('who are you')) {
        text = "I am JARVIS, Just A Rather Very Intelligent System, an advanced AI tasked with running business for Stark Industries as well as security for Tony Stark's Mansion and Stark Tower."
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
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

    else if (lowerSentence.includes('joke')) {
        fetch (jokeURL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                text = 'I will tell you a' + data.category + 'joke'
                jarvisSpeech(text, 0.8, 0.2, 1, 'en')

                text = data.setup
                jarvisSpeech(text, 0.8, 0.2, 1, 'en')

                text = data.delivery
                jarvisSpeech(text, 0.8, 0.2, 1, 'en')
            })
        
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
            "Me like it"
        ]
        text = answers[Math.floor(Math.random() * answers.length)]
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    }

    // https://www.regextester.com/15 Regex website test
}

function jarvisSpeech(text, rate, pitch, volume, lang) {
    let utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume
    utterance.lang = lang

    setTimeout(() => {speechSynthesis.speak(utterance)}, 500)
}