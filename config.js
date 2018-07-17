module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/api-games-test',
    SECRET_TOKEN: Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex')
}