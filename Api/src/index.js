import express from 'express'
import multer from 'multer'
import { PORT } from './config.js'

const app = express()

// Configuración de Multer, cb es una funcion Callback
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // Indicamos con file.originalname para tome el nombre original del archivo
  }
})

// Configurar la carga de los archivos
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) { // tipo archivo que recibe
      cb(null, true)
    } else {
      cb(new Error('Solo se permiten imagenes'))
    }
  }
})

// Funcion par manejar el error
const handleError = (err, req, res, next) => {
  console.log(err)
  res.status(400).json({ error: 'Solo se admiten imagenes' })
}

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

// Ruta para manejar la carga de archivos cuando no es una imagen
// single(nombreCampoForm)
app.post('/upload', upload.single('imagen'), handleError, async (req, res) => {
  res.json({ message: 'Archivo subido exitosamente' })
})

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
