import { Response } from "express";

export function catch500(res: Response, error: unknown) {
    console.log(error);
    return res.status(500).send({msg: 'Internal Server Error'});
}