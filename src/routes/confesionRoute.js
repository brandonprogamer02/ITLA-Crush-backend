import express from 'express'
import getConfesionController from '../controllers/getConfesionController.js'
import insertConfesionController from '../controllers/insertConfesionController.js'

function confesionRoute(){
   const router = express.Router('')

   router.get('/api/confesion', getConfesionController)
   router.post('/api/confesion', insertConfesionController)
   // router.delete('/confesion', deleteConfesionController)
   // router.delete('/confesion', deleteConfesionController)


   return router
}

export default confesionRoute