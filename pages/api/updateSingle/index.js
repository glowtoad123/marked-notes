import mongoose from 'mongoose'



export default async function(req, res){
    
    
    try {
        mongoose.set('useFindAndModify', false)
        const connection = await mongoose.createConnection(process.env.MONGODB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch(function(err){
            console.log("error:", err)
        })

        const Schema = mongoose.Schema
        const cardSchema = Schema({
            title: String,
            note: String,
            user: String
        })
        const Card = connection.model('Notes', cardSchema)
        Card.findByIdAndUpdate(req.body.id, {title: req.body.title, note: req.body.note, user: req.body.user}, {new: true}, (err, card) => {
            !err && res.status(200).json({card: card})
            err && res.status(500).json({Error: err})
        })
    } catch(error){
        res.status(500).json({Error: error.message})
    }
}

export const config = {
    api: {
      externalResolver: true,
    },
  }