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
        const devs = await Dev.find()

        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const githubApiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            // Utilizando Destructuring para removar apenas o que será utilizado do retorno da requisição
            const { name = login, avatar_url, bio } = githubApiResponse.data

            const techsArray = transformStringInArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            // Salvando o dado na base
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
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

        // Passando a query no primeiro parâmetro e os novos valores no segundo parâmetro
        const dev = await Dev.updateOne(query, newValues)

        return response.json(dev)
    },

    async delete(request, response) {

        params = request.params

        await Dev.deleteOne({ github_username: params.github_username })

        return response.json(`User deleted: ${params.github_username}`)
    }
}

module.exports = DevController