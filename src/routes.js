const { Router } = require('express')

// Controllers
const DevController = require('./controllers/DevController')
const SearchDevController = require('./controllers/SearchDevController')

const routes = Router()

/**
 * Métodos HTTP:
 * 
 * Metódo GET: Listar dados
 * 
 *  Parâmetros:
 *  - Query Params: Exemplos: Enviar ('url/rotas/name=Gabriel
 * url/rotas/name=Gabriel'), Receber ('request.query') - Utilização: Filtrar, paginar, ordenar...
 *  - Route Params: Exemplos com parâmetro id: Enviar ('url/rotas/:id'), Receber ('request.params') - Conseguir identificar parâmetros para alteração, etc...
 *  - Body params: Exemplo: Enviar ('Preparar um objeto antes de enviar a requisição'), Receber ('request.body') - Pegar objetos passados por JSON, XML, etc...
 * 
 * Método POST: Criar dados
 * Método PUT: Alterar dados
 * Método DELETE: Deletar dados
 */

// Configurando as rotas do projeto

// Devs routes
routes.get("/devs", DevController.index)
routes.post("/devs", DevController.store)
routes.put("/devs", DevController.update)
routes.delete("/devs/:github_username", DevController.delete)

// SearchDevs routes
routes.get("/searchDevs", SearchDevController.index)
routes.get("/searchDevs/:github_username", SearchDevController.indexOne)

module.exports = routes