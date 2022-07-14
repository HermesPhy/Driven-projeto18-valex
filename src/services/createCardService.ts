import Cryptr from "cryptr";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

import { findByTypeAndEmployeeId, TransactionTypes } from "./../repositories/cardRepository.js";
import * as cardRepository from "./../repositories/cardRepository.js";
import { findById, Employee } from "./../repositories/employeeRepository.js";
import numbersGenerator from "./../utils/numberGenerator.js";

export async function createCard(employeeId: number, type: TransactionTypes) {
    const employee = await findById(employeeId);
    if (!employee) throw {type: "not_find_error", message: 'Colaborador não encontrado.', statusCode: 404};

    const card = await findByTypeAndEmployeeId(type, employeeId);
    if (card) throw {type: "double_card_error", message: 'Colaborador já possui o cartão.', statusCode: 403};

}