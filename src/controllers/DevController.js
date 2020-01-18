const Dev = require('../models/Dev')
const axios = require('axios')

const { transformStringInArray } = require('../utils/TransformString')

/**
 * Sintaxe utilizada para nomenclatura de funções de 'CRUD':
 * 
 * index: Lista todos os dados
 * show: Lista apenas o dado solicitado
 * store: Salva o dado
 * update: Atualiza o dado
 * destroy: Deleta o Dado
 */

/** 
 * Utilizando uma função 'Async' pois dentro dela será necessário aguardar
 * algumas respostas que podem demorar um devido tempo, e com o 'await'
 * garantimos que o restante da função só será realizado após o retorno da requisição
 */
const DevController = {

    async index(request, response) {
        let devs = null
        try {
            devs = await Dev.find()
        } catch (e) {
            console.log("Erro ao listar todos os devs. Erro: ".concat(e))
        }
        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            let githubApiResponse = null
            try {
                githubApiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            } catch (e) {
                console.log("Erro ao pegar os dados do dev naF API do github. Erro: ".concat(e))
            }

            // Utilizando Destructuring para remover apenas o que será utilizado do retorno da requisição
            const { name = login, avatar_url, bio } = githubApiResponse.data

            const techsArray = transformStringInArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            try {
                // Salvando o dado na base
                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                })
            } catch (e) {
                console.log("Erro ao salvar o dev. Erro: ".concat(e))
            }
        } else {
            dev = "User already exists"
        }

        return response.json(dev)
    },

    async update(request, response) {
        const { github_username, location, techs } = request.body

        techsArray = transformStringInArray(techs)

        const query = { github_username }
        const newValues = { $set: { location, techs: techsArray } }

        let dev = null
        try {
            // Passando a query no primeiro parâmetro e os novos valores no segundo parâmetro
            dev = await Dev.updateOne(query, newValues)

        } catch (e) {
            console.log("Erro ao atualizar os dados do dev. Erro: 0".concat(e))
        }
        return response.json(dev)
    },

    async delete(request, response) {

        const { github_username } = request.params

        try {
            await Dev.deleteOne({ github_username })
        } catch (e) {
            console.log("Erro ao deletar o usuário. Erro: ".console.log(e))
        }

        return response.json(`User deleted: ${github_username}`)
    }
}

module.exports = DevController