import CustomAPIError from "./custom-api.js";
import {StatusCodes} from 'http-status-codes';
class NotAcceptable extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.NOT_ACCEPTABLE;
    }
}

export default NotAcceptable