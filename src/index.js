/**
 * Importando o express para o arquivo
 * Express é uma biblioteca que nos ajudará a recebermos requisições e
 * trabalharmos com elas para fazermos determinada ação e retornarmos
 * uma resposta para quem requisitou
 */
const express = require('express')

// Importando o arquivo de configuração das rotas do projeto
const routes = require('./routes')

// Importando o plugin cors, para realizar a segurança de acessibilidade
const cors = require('cors')

const http = require('http')

const { setupWebSocket } = require('./WebSocket')

// Atribuindo o plugin express a uma constante
const app = express()

const server = http.Server(app)


setupWebSocket(server)

// Importando o plugin para realizar o acesso à base de dados mongodb
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://omnistackgabrielribeiro:Gr159753@cluster0-mhhk7.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

/**
 * Dizer para o plugin express que queremos utilizar o tipo de estrutura de dados JSON
 * Obs.: Sempre colocar o uso de json antes das demais funcionalidades,
 * para já mostrar para o projeto o tipo de estrutura de dados que será utilizada
 */
app.use(express.json())

/**
 * Dizer para o plugin express que queremos utilizar outro plugin (cors)
 * para realizar a segurança de acesso ao projeto
 * 
 * Podemos passar por parâmetro algumas informações, como a URL que poderá acessar nosso projeto,
 * habilitar credenciais, utilizar headers de requisição, entre outras
 */
app.use(cors())

// Dizer para o plugin express que queremos utilizar o módulo de rotas criado
app.use(routes)

// Configurando a porta que o projeto utilizará
server.listen(process.env.PORT || 3001)

