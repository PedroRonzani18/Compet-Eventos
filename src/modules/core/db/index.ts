import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

export async function connectToDatabase() {

  if (process.env["created"] === undefined) {
    dotenv.config()
    process.env["created"] = "done"

    console.log("aksjdbasihdbajhsbdsb")

    const { MONGODB_USER } = process.env

    //console.log(MONGODB_USER)

    const MONGODB_PASSWORD =
      encodeURIComponent(process.env.MONGODB_PASSWORD ? process.env.MONGODB_PASSWORD : '')
      || process.env.MONGODB_PASSWORD

    const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.a5trgdx.mongodb.net/`

    if (!MONGODB_USER || MONGODB_URI == '' || !MONGODB_PASSWORD || MONGODB_PASSWORD == '') {
      mongoose.connect('mongodb://localhost:27017/test').then(() => {
        console.log('Banco de dados conectado à porta 27017')
      })
    } else {
      
      mongoose
        .connect(MONGODB_URI)
        //.then(() => { console.log('Banco de dados conectado à nuvem') })
        .catch((err) => console.error(err))
    }
  }

}
export default mongoose