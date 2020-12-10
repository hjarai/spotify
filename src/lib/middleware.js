/*
  middleware.js
  This file contains middleware functions for the API routes.
*/


/**
 *
 * @param {object} error - the error object thrown by the code
 * @param {object} req - the request object associated with the route
 * @param {object} res - the response object associated with the route
 */

import Cors from 'cors';

export function onError (error, req, res){
    console.error(error); 
    res.status(500).end(error.toString());
}

export const cors = Cors ({
    methods: ['GET', 'PUT', 'POST', 'DELETE'], 
    origin: '*', 
    allowedHeaders: ['Content-Type']
}) 