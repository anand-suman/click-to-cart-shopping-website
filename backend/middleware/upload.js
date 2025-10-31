const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure upload directory exists at runtime
const uploadsRoot = path.join(__dirname, '..', 'uploads')
const productsDir = path.join(uploadsRoot, 'products')
if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, productsDir)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '')
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, `${base}-${unique}${ext}`)
    }
})

const upload = multer({ storage })

module.exports = upload


