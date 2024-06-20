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


        const options = {
            method: 'POST',
            url: 'https://code-compiler10.p.rapidapi.com/',
            headers: {
                'x-rapidapi-key': 'e7563d52d0mshe3273d7bc376a98p14f4fcjsnef49df54a3de',
                'x-rapidapi-host': 'code-compiler10.p.rapidapi.com',
                'Content-Type': 'application/json',
                'x-compile': 'rapidapi'
            },
            data: {
                langEnum: [
                    'php',
                    'python',
                    'c',
                    'c_cpp',
                    'csharp',
                    'kotlin',
                    'golang',
                    'r',
                    'java',
                    'typescript',
                    'nodejs',
                    'ruby',
                    'perl',
                    'swift',
                    'fortran',
                    'bash'
                ],
                lang: body.language,
                code: body.code,
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