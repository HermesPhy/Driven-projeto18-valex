import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";

import { Card, findById } from "../repositories/cardRepository";


export async function cardValidationByDate(card: Card) {
    const currentDate = dayjs().format("MM/YY");
    const [mouth, year] = currentDate.split('/');
    const [cardMouth, cardYear] = card.expirationDate.split('/');
    const parseCurrentDate = new Date(parseInt(year), parseInt(mouth), 0);
    const parseCardDate = new Date(parseInt(cardYear), parseInt(cardMouth), 0);
    if (parseCurrentDate > parseCardDate) throw { type: "invalid_date", message: 'Cartão expirado', statusCode: 401 };
}