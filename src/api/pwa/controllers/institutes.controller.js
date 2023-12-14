import mongoose from "mongoose";
import institesServices from '../services/institutes.services';
import { Router } from "express";

export const getInstitutosALL = async(req, res, act) => {
    try {
        const instituesAll = await institesServices.getInstitutosALL();
        if(instituesAll){
            return res.status(instituesAll.status).json(instituesAll);
        }
    } catch (error) {
        next(error);
    }
}