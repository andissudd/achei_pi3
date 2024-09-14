import axios from "axios";
import type { User, Item, ApplicationError } from "../types";

export function isApplicationError(error: any): error is ApplicationError {
    if(axios.isAxiosError(error)) {
        const customError = error.response?.data
        return customError && customError.name != undefined && customError.message != undefined
    }
    return false;
}