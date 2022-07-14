import { Router } from "express";

import { activateCardValidation, newCardValidation, cardValidationByParamsId, companyApiValidation } from "./../middlewares/validationMiddleware.js";
import activateCard from "./../controllers/activateCardController.js";
import newCard from "./../controllers/newCardController.js";

const cardRouter = Router();

cardRouter.post('/card/new', companyApiValidation, newCardValidation, newCard);
cardRouter.post('/card/:id/activate', cardValidationByParamsId, activateCardValidation, activateCard);

export default cardRouter;