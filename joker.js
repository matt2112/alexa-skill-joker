'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 42;

const data = {
    JOKES: [
        'Don\'t trust atoms, they make up everything.',
        'I have an inferiority complex, but it\'s not a very good one.',
        'If you build a man a fire you keep him warm for a day, if you set a man on fire you keep him warm for the rest of his life.',
        'I told them I wanted to be a comedian, and they laughed; I became a comedian, no one\'s laughing now.',
        'I hate Russian Dolls, they\'re so full of themselves.',
        'And The Lord said unto John, "Come forth and receive eternal life," but John came in fifth and won a toaster.',
        'I saw this advert in a window that said: "42 inch plasma television for sale, £10, volume stuck on full". I thought, "I can\'t turn that down".',
        'I was at an ATM and this old lady asked me to help check her balance. So I pushed her over.'
    ],
    GROUCHO: [
        'One morning I shot an elephant in my pajamas. How he got into my pajamas I\'ll never know.',
        'Time flies like an arrow, Fruit flies like a banana.',
        'Marriage is a wonderful institution, but who wants to live in an institution?',
        'Outside of a dog, a book is a man\'s best friend. Inside of a dog, it\'s too dark to read.',
        'I never forget a face, but in your case I\'ll be glad to make an exception.'            
    ],
    SKILL_NAME: 'One-liner jokes',
    JOKE_MESSAGE: "Here's a joke: ",
    GROUCHO_MESSAGE: "Here's a joke by Groucho Marx: ",
    HELP_MESSAGE: 'You can say tell me a joke, or, you can say exit... What can I help you with?',
    HELP_REPROMPT: 'What can I help you with?',
    STOP_MESSAGE: 'Goodbye!'
};

const handlers = {
    LaunchRequest: function () {
        this.emit('GetJoke');
    },
    Joke: function() {
        this.emit('GetJoke');
    },
    GetJoke: function () {
        // Get a random joke from the JOKES list.
        const jokeArr = data.JOKES;
        const jokeIndex = Math.floor(Math.random() * jokeArr.length);
        const randomJoke = jokeArr[jokeIndex];

        // Create speech output.
        const speechOutput = data.JOKE_MESSAGE + randomJoke;
        this.emit(':tellWithCard', speechOutput, data.SKILL_NAME, randomJoke);
    },
    Groucho: function () {
        // Get a random joke from the GROUCHO list.
        const jokeArr = data.GROUCHO;
        const jokeIndex = Math.floor(Math.random() * jokeArr.length);
        const randomJoke = jokeArr[jokeIndex];

        // Create speech output.
        const speechOutput = data.GROUCHO_MESSAGE + randomJoke;
        this.emit(':tellWithCard', speechOutput, data.SKILL_NAME, randomJoke);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = data.HELP_MESSAGE;
        const reprompt = data.HELP_MESSAGE;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', data.STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', data.STOP_MESSAGE);
    },
    SessionEndedRequest: function () {
        this.emit(':tell', data.STOP_MESSAGE);
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};