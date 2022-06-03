const Place = require('../Models/Place')


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
  
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
    
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
  
  

const placeController = {

getPlaces: async (req,res) => {

    try {
        const features = new APIfeatures(Place.find(), req.query)
        .filtering().sorting().paginating()

        const places = await features.query

        res.json({
            status: 'success',
            result: places.length,
            places: places
        })
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

},

createPlace: async (req, res) => {

    try {
        const {title,description,parroquia,category,images,location,contact} = req.body;

        const newPlace = new Place({ 
            title: title.toLowerCase(), 
            description, 
            parroquia, 
            category,
            images, 
            location,
            contact
        })
        await newPlace.save()
        res.json({message: 'Lugar Creado !!'})
  
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
},

updatePlace: async (req, res) => {
    try {
        const id = req.params.id;
        const { title,description,parroquia,category,images,location,contact } = req.body;
        await Place.findByIdAndUpdate(id, { $set:{ title,description,parroquia,category,images,location,contact}},{ new: true })
        res.json({ message: "Lugar Actualizado"})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  
deletePlace: async (req, res) => {
    try {
        const id = req.params.id;
        await Place.findByIdAndDelete(id);
        res.status(200).json({ message: "Lugar Eliminado"})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },



}

module.exports = placeController