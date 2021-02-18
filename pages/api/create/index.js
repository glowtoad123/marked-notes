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
        const cardSchema = new Schema({
            title: String,
            note: String,
            user: String
        })
        const Card = connection.model('Notes', cardSchema)
        const card = new Card({
            title: req.body.title,
            note: req.body.note,
            user: req.body.user
        })
        card.save()
        res.status(200).json({status: "everything's good"})
    } catch(error){

        res.status(500).json({Error: error.message})
    }
}