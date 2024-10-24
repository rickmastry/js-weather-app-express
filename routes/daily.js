import url from 'url'
import express from 'express';
import needle from 'needle';
const routerOne = express.Router();

const API_WEATHER_BASE_URL = process.env.API_WEATHER_BASE_URL
const API_WEATHER_BASE_ONECALL_URL = process.env.API_WEATHER_BASE_ONECALL_URL
const API_WEATHER_KEY_NAME = process.env.API_WEATHER_KEY_NAME
const API_WEATHER_KEY_VALUE = process.env.API_WEATHER_KEY_VALUE

routerOne.get("/", async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_WEATHER_KEY_NAME]: API_WEATHER_KEY_VALUE,
            ...url.parse(req.url, true).query,
        })
        const apiResCurrent = await needle('get', `${API_WEATHER_BASE_ONECALL_URL}?${params}`)
        const data = apiResCurrent.body

        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API_WEATHER_BASE_ONECALL_URL}?${params}`)
        }
        res.status(200).json(data)
        
        
    } catch (error) {
       res.status(500).json({error}) 
    }
   
});

export default routerOne;