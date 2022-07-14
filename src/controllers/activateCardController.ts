import { Request, Response } from "express";

export default async function activateCard(req: Request, res: Response) {
    const { cvc, password, card } = res.locals;
    await activateCardService(card, cvc, password);

    return res.status(201).send("Cartão ativado com sucesso.");
}