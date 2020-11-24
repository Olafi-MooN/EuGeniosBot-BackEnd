// Importando dependências
const express = require('express');
// const route = express.Router();
const AssistantV2 =  require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

// Criando uma instância do watson assistente
const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY,
  });

const assistant = new AssistantV2({
    version: '2020-11-06',
    authenticator,
    serviceUrl: process.env.WATSON_ASSISTANT_URL,
});

// Criado uma rota para gerar uma sessão
exports.session = async (req, res) => {
    try {
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ID
        });
        
        let sessionsID = session['result'];
        
        return res.json(sessionsID);

    } catch (error) {
        res.json('ocorreu um erro ao realizar a session \n'+ error)
    }
}

// Criado uma rota para gerar uma sessão
exports.message = async (req, res) => {

    const {type, text, id} = req.params;
    try {
        const message = await assistant.message({
            assistantId: process.env.WATSON_ASSISTANT_ID,
            sessionId: id,
            input: {
                message_type: type,
                text,
            },
        });

        return res.json(message['result']);
    } catch (error) {
        res.json('ocorreu um erro no processamento da message \n'+ error)
    }
}
