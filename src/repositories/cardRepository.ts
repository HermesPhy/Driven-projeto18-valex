import { db } from "../database";
import { mapObjectToUpdateQuery } from "../utils/dbUtils";

export type TransactionTypes =
  | "groceries"
  | "restaurant"
  | "transport"
  | "education"
  | "health";

export interface Card {
    id: number;
    employeeId: number;
    number: string;
    cardholderName: string;
    securityCode: string;
    expirationDate: string;
    password?: string;
    isVirtual: boolean;
    originalCardId?: number;
    isBlocked: boolean;
    type: TransactionTypes;
  }

export type CardInsertData = Omit<Card, "id">;
export type CardUpdateData = Partial<Card>;

export async function insert(cardData: CardInsertData) {
    const {
      employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      type,
    } = cardData;
  
    db.query(
      `
      INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
        "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,
      [
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password,
        isVirtual,
        originalCardId,
        isBlocked,
        type,
      ]
    );
  }

export async function update(id: number, cardData: CardUpdateData) {
    const { objectColumns: cardColumns, objectValues: cardValues } =
      mapObjectToUpdateQuery({
        object: cardData,
        offset: 2,
      });
  
    db.query(
      `
      UPDATE cards
        SET ${cardColumns}
      WHERE id=$1
    `,
      [id, ...cardValues]
    );
}