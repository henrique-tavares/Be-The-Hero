const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const HomeController = require('./controllers/HomeController');

const routes = express.Router();

/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação no back-end
 * POST: Criar uma informação no back-end
 * PUT: ALterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().email(),
		whatsapp: Joi.string().min(10).max(11),
		city: Joi.string().required(),
		uf: Joi.string().required().length(2)
	}),
}), OngController.create);

routes.post('/sessions', celebrate({
	[Segments.BODY]: Joi.object().keys({
		id: Joi.string().required(),
	})
}), SessionController.create);

routes.get('/home', celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
}), HomeController.index);

routes.get('/incidents', celebrate({
	[Segments.QUERY]: Joi.object().keys({
		page: Joi.number(),
	})
}), IncidentController.index);

routes.post('/incidents', celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),

	[Segments.BODY]: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string().required(),
		value: Joi.number().required()
	})
}), IncidentController.create);

routes.put('/incidents/:id', celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),

	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required()
	}),

	[Segments.BODY]: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string().required(),
		value: Joi.number().required()
	})
}), IncidentController.update);

routes.delete('/incidents/:id', celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required()
	})
}), IncidentController.delete);

module.exports = routes;