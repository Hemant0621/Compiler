const express = require('express');
const Routes = express.Router();
const zod = require('zod');
const { Console } = require('../model/index')
const { authMiddleware } = require('../middleware.js');
const axios = require('axios');

const compilerBody = zod.object({
    language: zod.string(),
    code: zod.string(),
    input: zod.string().nullable().optional()
})

Routes.post('/compile', authMiddleware, async (req, res) => {

    try {
        const body = req.body;

        const { success } = compilerBody.safeParse(body);

        if (!success) {
            return res.send({
                message: "incorrect inputs"
            })
        }

        await Console.updateOne({
            userId: req.userId
        }, {
            code: body.code,
            input: body.input || "",
            language: body.language
        })


        import axios from 'axios';

        const options = {
            method: 'POST',
            url: 'https://online-code-compiler.p.rapidapi.com/v1/',
            headers: {
                'x-rapidapi-key': '4206591dbcmsh8bedd03a54157bbp1a5361jsn54b478555306',
                'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                language: body.language,
                version: 'latest',
                code: body.language,
                input: body.input
            }
        };



        try {
            const response = await axios.request(options);

            return res.send({
                message: response.data
            })
        } catch (error) {
            return res.send({
                message: e
            })
        }
    } catch (e) {
        return res.send({
            message: e
        })
    }

})


Routes.get('/compile', authMiddleware, async (req, res) => {

    try {
        const response = await Console.findOne({
            userId: req.userId
        })
        res.send({
            message: response
        })
    } catch (err) {

        return res.send({
            message: err
        })
    }
})


module.exports = Routes