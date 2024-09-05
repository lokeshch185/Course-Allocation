const jwt = require("jsonwebtoken")
const Grievance = require("../model/Grievance")
const Course = require("../model/Course")
const User = require("../model/User")

// create - by student
const addGrievance = async (req, res) => {
    const { token } = req.cookies;
    let loggedStudent_id

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userInfo) => {
        if (err) {
            res.status(400).json({ status: "From /addGrievance [post] , JWT Verification error" });
            throw err;
        }
        else {
            // only if jwt verifed .. move further
            loggedStudent_id = userInfo.id
        }
    });

    const { query } = req.body
    const grievanceDoc = await Grievance.create({
        postedBy: loggedStudent_id,
        query
    })
        .then((response) => {
            res.json({ status: "From /addGrievance [post] , grivance successfully submitted !", grievanceDoc: response })
        })
        .catch((error) => {
            res.status(400).json({ status: "From /addGrievance [post] , error in submitting grievance", "error": error.message })
        })
}

// get all grievance - by admin
const allGrievance = async (req, res) => {
    const grievanceDocs = await Grievance.find({})
        .populate('postedBy',
            ["username", "email", "prev_Taken_Courses"])
        .sort({ "createdAt": -1 })
    res.json({ path: "From /allGrievance [get] , successfully listing all grievances", grievanceDocs })
}

// get a particular grievance + resolve it + delete grivance - done by admin
const resolveGrievance = async (req, res) => {
 
    // alloting course .. direct allotment by typing name of available course [enrolled_studnts < intake capacity]
    const { id } = req.params
    const { name } = req.body
    const grievanceDoc = await Grievance.findById(id )
    if (grievanceDoc) {
        console.log(grievanceDoc)
        const courseDoc = await Course.findOne({ name })
        console.log(courseDoc)
        if (courseDoc) {

            // adding of student in enrolled array
            courseDoc.enrolled.push(grievanceDoc.postedBy._id)
            courseDoc.save();

            // add the course name in students prev_Taken_Courses 
            const UserDoc = await User.findOneAndUpdate(
                { _id: grievanceDoc.postedBy._id },
                { $push: { prev_Taken_Courses: name } }
            ).exec()
            console.log(UserDoc)

            // there will be an increase in number of enrolled students
            courseDoc.current_Enrolled_Count = courseDoc.enrolled.length

            // deleting of such student from applied of all courses
            await Course.updateMany(
                { applied: grievanceDoc.postedBy._id },
                { $pull: { applied: grievanceDoc.postedBy._id } }
            )
        }
        // on succesful resolve of grievanve 
        // 1) add a reply
        const { reply } = req.body
        await Grievance.updateOne({ _id: id }, reply);

        // 2) delete the grivance 
        // const deletedGrievanceDoc = await Grievance.findOneAndDelete({ id })

        res.json({
            path: "From /resolveGrivance [post] , Grievance Resolved Successfully!"
            // path: "From /resolveGrivance [post] , Grievance Resolved Successfully!", deletedGrievanceDoc
        })
    }
}

// get one course
const selectedGrievance = async (req , res) => {
    const {id} = req.params
    const grievanceDoc = await Grievance.findOne({_id : id}).populate('postedBy' , ["_id" , "username" , "email" , "prev_Taken_Courses"])
    res.json({ path: "From /selectedGrievance [get] , successfully listing complete data of seleted grievance", grievanceDoc })
}



module.exports = {
    addGrievance,
    allGrievance,
    resolveGrievance , 
    selectedGrievance
}