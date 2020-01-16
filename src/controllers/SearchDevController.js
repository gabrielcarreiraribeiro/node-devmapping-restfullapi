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

        const techsArray = transformStringInArray(techs)

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
                    $maxDistance: 10000
                }
            }
        })
        return response.json(devs)
    }
}

module.exports = SearchDevController