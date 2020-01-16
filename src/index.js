// Importando o express para o arquivo
const express = require('express')

// Importando o arquivo de configuração das rotas do projeto
const routes = require('./routes')

// Atribuindo o plugin express a uma constante
const app = express()

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

// Dizer para o plugin express que queremos utilizar o módulo de rotas criado
app.use(routes)

// Configurando a porta que o projeto utilizará
app.listen(3001)

