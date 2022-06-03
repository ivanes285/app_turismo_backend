const Event = require('../Models/Event')


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
  
    //Filtrar
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query
      //  console.log("queryObj",queryObj)
      //  console.log({before: queryObj})
  
       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
  
       queryStr = queryStr.reEvent(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
    
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
  
       this.query.find(JSON.parse(queryStr))
      //  console.log({after: queryObj})
       return this;
    }
  
  
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
  
        return this;
    }
  
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
  }
  
  

const eventController = {

getEvents: async (req,res) => {

    try {
        const features = new APIfeatures(Event.find(), req.query)
        .filtering().sorting().paginating()

        const events = await features.query

        res.json({
            status: 'success',
            result: events.length,
            events: events
        })
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

},

createEvent: async (req, res) => {

    try {
        const {title,description,category,images,dateEvent,hour} = req.body;

        const newEvent = new Event({ 
            title: title.toLowerCase(), 
            description, 
            category,
            images, 
            dateEvent,
            hour
        })
        await newEvent.save()
        res.json({message: 'Evento Creado !!'})
  
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
},

updateEvent: async (req, res) => {
    try {
        const id = req.params.id;
        const {title,description,category,images,dateEvent,hour } = req.body;
        await Event.findByIdAndUpdate(id, { $set:{ title,description,category,images,dateEvent,hour}},{ new: true })
        res.json({ message: "Evento Actualizado"})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  
deleteEvent: async (req, res) => {
    try {
        const id = req.params.id;
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Evento Eliminado"})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },



}

module.exports = eventController