const http = require('http')
const crypto = require('crypto')
const exec = require('child_process').exec
const config = require('./config.json')

http.createServer((request, response) => {
	let body = []

	request.on('error', err => {
		console.error(err)
	}).on('data', chunk => {
		body.push(chunk)
	}).on('end', () => {
		body = Buffer.concat(body).toString()

        const sig = "sha1=" + crypto.createHmac('sha1', config.SECRET).update(body).digest('hex')
		if (request.headers['x-hub-signature'] == sig) {
            exec(`cd ${config.REPO} && git pull && npm install && npm restart`, (err, stdout, stderr) => {
				if (err) {
					console.error(err)
					response.writeHead(500, {'Content-Type': 'application/json'})
        			response.end(JSON.stringify({ success: false, message: err.message }))
				} else {
					response.writeHead(200, {'Content-Type': 'application/json'})
        			response.end(JSON.stringify({ success: true }))
				}
			})
    	} else {
            response.writeHead(401, {'Content-Type': 'application/json'})
        	response.end(JSON.stringify({ success: false, message: 'Invalid signature' }))
        }
	})
}).listen(config.PORT)

console.log(`Server listening at http://*:${config.PORT}`)
