import express from 'express'
import { get, merge } from 'lodash'

import { getUserBySessionToken } from '../db/users'

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        
        const { id } = req.params
        const currentUserId = get(req, 'identity._id') as string

        console.log('pxh isOwner id: ', id)
        console.log('pxh isOwner currentUserId: ', currentUserId.toString())

        if (!currentUserId) {
            return res.sendStatus(403)
        }

        if (currentUserId.toString() === id) {
            return res.sendStatus(403)
        }

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

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