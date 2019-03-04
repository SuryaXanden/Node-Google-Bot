const rp = require('request-promise');
const cheerio = require('cheerio');


const nodebot = (qi) =>
{
	let url = 'https://www.google.com/search?q=~intext:';
	return rp(url + qi).then(async (html) =>
	{
        const $ = cheerio.load(html);
        
        let entity_name = $('td:nth-child(3) > ol > div.g > div > div:nth-child(2) > div > div:nth-child(1)').text();
        let entity_desc = $('td:nth-child(3) > ol > div.g > div > div:nth-child(2) > div > div:nth-child(2)').text();

        let data = {
                    "name" : entity_name,
                    "desc" : entity_desc || "Other"
                    };
        return await data;
	});
}

const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res, next) => 
{
    nodebot(req.query.item).then(i => res.status(201).json(i))

})

app.listen(port, () => console.log(`Google Scraper listening on port ${port}!`))