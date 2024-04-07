import express from 'express'
import { get, merge } from 'lodash'

import { getUserBySessionToken } from '../db/users'

export const isAuthentication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        
        const sessionToken = req.cookies['KITAJIMA-AUTH']

        if (!sessionToken) {
            return res.sendStatus(403)
        }

        const exitsingUser = await getUserBySessionToken(sessionToken)

        if (!exitsingUser) {
            return res.sendStatus(403)
        }

        merge(req, { identity: exitsingUser })

        return next()

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }

}