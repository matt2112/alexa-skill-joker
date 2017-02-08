'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 42;

const languageStrings = {
    'en-GB': {
        translation: {
            JOKES: [
                'Don\'t trust atoms, they make up everything.',
                'I have an inferiority complex, but it\'s not a very good one.',
                'If you build a man a fire you keep him warm for a day, if you set a man on fire you keep him warm for the rest of his life.',
                'I told them I wanted to be a comedian, and they laughed; I became a comedian, no one\'s laughing now.',
                'One morning I shot an elephant in my pajamas. How he got into my pajamas I\'ll never know.',
                'I hate Russian Dolls, they\'re so full of themselves.',
                'And The Lord said unto John, "Come forth and receive eternal life," but John came in fifth and won a toaster.',
                'I saw this advert in a window that said: "42 inch plasma television for sale, £10, volume stuck on full". I thought, "I can\'t turn that down".',
                'I was at an ATM and this old lady asked me to help check her balance. So I pushed her over.',
                'Outside of a dog, a book is a man\'s best friend. Inside of a dog, it\'s too dark to read.'
            ],
            SKILL_NAME: 'One-liner jokes',
            GET_JOKE_MESSAGE: "Here's your joke: ",
            HELP_MESSAGE: 'You can say tell me a joke, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!'
        }
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetJoke');
    },
    'GetNewJokeIntent': function () {
        this.emit('GetJoke');
    },
    'GetJoke': function () {
        // Get a random joke from the jokes list.
        // Use this.t() to get corresponding language data.
        const jokeArr = this.t('JOKES');
        const jokeIndex = Math.floor(Math.random() * jokeArr.length);
        const randomJoke = jokeArr[jokeIndex];

        // Create speech output.
        const speechOutput = this.t('GET_JOKE_MESSAGE') + randomJoke;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomJoke);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};