const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(express.static('public'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Application is running on port ${port}...`))
