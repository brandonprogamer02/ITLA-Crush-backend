import DocumentModel from './models/model.js'
import jwt from 'jsonwebtoken'

class Auth {

     createToken({ username, password }) {
          // se crea un nuevo token con los datos del usuario ligados a el
          const user = {
               username,
               password
          }
          // creating the token
          const token = jwt.sign({ user }, 'BRANDOX-SECRETKEY')


          return { token }
     }

     async createTokenWithExistingUser({ username, password }) {

          const filter = { username, password };
          const documentFinded = await DocumentModel.findOne(filter);
          // si se encuentra este usuario en la base de datos
          if (documentFinded) {
               // se crea un nuevo token con los datos del usuario ligados a el
               const token = jwt.sign({ username, password }, 'BRANDOX-SECRETKEY')
               return { token, document: documentFinded }
          }
          return { token: null };
     }

     async verifyToken(token) {
          if (token) {
               try {
                    // verificamos si el token que hemos recibido es valido
                    const { username } = jwt.verify(token, 'BRANDOX-SECRETKEY')
                    const registro = await DocumentModel.findOne({ username })
                    // console.log(authData)
                    return { authData: registro };
               } catch (error) {
                    console.log(error)
                    return { authData: null };
               }
          } else return { authData: null }
     }
}

export default new Auth()