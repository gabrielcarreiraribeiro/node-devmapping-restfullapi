const Dev = require('../models/Dev')
const { transformStringInArray } = require('../utils/TransformString')

const SearchDevController = {

    /**
     * @param $in
     * MongoDB Query Operators: Visite "https://docs.mongodb.com/manual/reference/operator/query/"
     * para mais informações sobre os operadores em querys
     * 
     * @param $near
     * @param $geometry
     * @param $maxDistance
     * Parâmetros próprios deste tipo de estrutura, utilizado para comparação de distância entre pontos.
     */
    async index(request, response) {

        const { latitude, longitude, techs } = request.query
        console.log(techs)

        const techsArray = transformStringInArray(techs)
        console.log(techsArray)

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 30000
                }
            }
        })
        console.log(devs)
        return response.json(devs)
    },

    async indexOne(request, response) {
        const { github_username } = request.params

        let dev = null
        try {
            dev = await Dev.findOne({ github_username })
        } catch (e) {
            console.log("Erro ao buscar o Dev específico. Erro: ".concat(e))
        }

        return response.json(dev)
    }
}

module.exports = SearchDevController