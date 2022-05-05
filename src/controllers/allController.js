const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

let isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
  
  let isValidObjectId = function (objectId) { return mongoose.Types.ObjectId.isValid(objectId) }


const createCollege = async function (req, res) {
    let data = req.body
    if (!isValid(data.name)) {
        return res.status(400).send({ status: false, msg: "name is required" });
    }
    if (!isValid(data.fullName)) {
        return res.status(400).send({ status: false, msg: "fullName is required" });
    }
    let savedData = await collegeModel.create(data)
    res.status(201).send({status: true, data : savedData})
}

const createIntern = async function (req, res) {
    let data = req.body
    if (!isValid(data.name)) {
        return res.status(400).send({ status: false, msg: "name is required" });
    }
    if (!isValidObjectId(collegeId)) {
        return res.status(400).send({ status: false, msg: "collegeId is incorrect" });
      }
    let savedData = await internModel.create(data)
    res.status(201).send({status: true, data : savedData})
}

const getCollegeDetails = async function (req, res) {
    let data = req.query.collegeName
    let checkCollege = await collegeModel.findOne({name : data}) 

    let checkIntern = await internModel.find({collegeId : checkCollege._id}).select({name: 1, email : 1, mobile : 1, _id: 1})
    
    checkCollege = await collegeModel.findOne({name : data}).select({name: 1, fullName : 1, logoLink : 1, interests : 1, _id: 0})

    checkCollege._doc["interests"] = checkIntern // will make a key inside the object and assign value by equal operator 

    res.status(200).send({status : true, data : checkCollege})

}


module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.getCollegeDetails = getCollegeDetails