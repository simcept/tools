const cryptoRandomString = require('crypto-random-string')
const functions = require('firebase-functions')

const charsets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '`-=~!@#$%^&*()_+',
}

function generatePassword({ length, types }) {
  let characters = ''
  for (const type of types) {
    characters += charsets[type]
  }

  return cryptoRandomString({ length, characters })
}

module.exports = functions.https.onRequest((req, res) => {
  const charsetTypes = Object.keys(charsets)

  let { length, types } = req.query
  length = length ? parseInt(length) : 20
  types = types
    ? types
        .split(',')
        .map((c) => c.trim())
        .filter((c) => c)
    : charsetTypes

  if (!length || length < 1 || length > 50) {
    res.status(400).json({
      error: 'Query parameter [length] must be an integer between 1 and 50.',
    })
    return
  }

  if (!types.length || types.some((t) => !charsetTypes.includes(t))) {
    res.status(400).json({
      error: `Query parameter [types] must contain at least one of [${charsetTypes}].`,
    })
    return
  }

  const result = generatePassword({ length, types })
  res.json({ result })
})
