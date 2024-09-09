const jwt = require("jsonwebtoken")
const Course = require("../model/Course")
const User = require("../model/User")
const fs = require('fs');

// added by admin
const addCourse = async (req , res) => {
    const { name, prof_Incharge, intake_Capacity } = req.body

    console.log("from controler >> Course.js ")
    console.log(req.file)
    // even tho we sent Imagefile via req.body , it wont be acessible via req.body
    // to access it ; saved it locally in ./uploads >> grab filepath from here .. save the filepath from here
    console.log(req.body)

    // to grab ext + append to image file in uploads 
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);


    const courseDoc = await Course.create({
        name,
        prof_Incharge,
        intake_Capacity ,
        Imagefile : newPath
    })
        .then((response) => {
            res.json({ status: "From /addCourse [post] , successfully added course in DB", courseDoc: response })  
        })
        .catch((error) => {
            res.status(400).json({ status: "From /addCourse [post] , course not added in DB", "error": error.message })
        })
}

const setAllPref = async (req , res) => {
    const { token } = req.cookies;
    let loggedStudent_id 
    
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userInfo) => {
        if (err){ 
            res.status(400).json({status: "From /setAllPref [post] , JWT Verification error"});
            throw err;
        }
        else {
            // only if jwt verifed .. move further
            loggedStudent_id = userInfo.id
        }
    });
    const { student_Pref_1, student_Pref_2 } = req.body 
    const student_Prefs = [];

    student_Prefs.push(student_Pref_1);
    student_Prefs.push(student_Pref_2);

    // the logged in student_Id will be appned in all course , but response will be going for one only 
    // as per endpoint .. only one response can go 
    // only happens in case of either of student_Pref_1 / student_Pref_2 is wrogly spelled
    let docFound = false;

    student_Prefs.forEach(async (pref) => {

        // adding the studnet_Id in applied of courseDoc
        const courseDoc = await Course.findOneAndUpdate(
            { name: pref },
            { $push: { applied: loggedStudent_id } }
        ).exec()

        // send when for all courses , loggedStudent_id appended in applied
        if ((courseDoc && !docFound)) {
            res.json({ status: "From /setPref [post] , successfully added student in course.applied" })
            docFound = true
        }
    });
    // if (!docFound ) {
    //     res.status(404).json({ status: "From /setPref [post] , selected course is not available" })
    // }
}

// done by admin
const allotCourse = async (req , res) => {
    const { name } = req.body
    const courseDoc = await Course.findOne({ name })
    if (courseDoc) {
        const intake_Capacity = courseDoc.intake_Capacity
        const current_Applied_Count = courseDoc.applied.length
        const current_Enrolled_Count = courseDoc.current_Enrolled_Count
   
        if (current_Enrolled_Count < intake_Capacity) {

            // number of students whose data is to be put in enroled
            const student_limit = current_Applied_Count >= (intake_Capacity - current_Enrolled_Count) ?
                (intake_Capacity - current_Enrolled_Count) :
                current_Applied_Count

            // student ids who have been alloted the course based on above number
            const student_alloted_course = courseDoc.applied.slice(0, student_limit)

            // adding of such student in enrolled array
            student_alloted_course.map((each_StudentId) => {
                courseDoc.enrolled.push(each_StudentId)
            })
            courseDoc.save();

            // add the course name in students prev_Taken_Courses
            student_alloted_course.forEach(async (each_StudentId) => {

                const UserDoc = await User.findOneAndUpdate(
                    { _id : each_StudentId} ,
                    { $push: { prev_Taken_Courses: name } }
                ).exec()
            });

            // there will be an increase in number of enrolled students
            courseDoc.current_Enrolled_Count = courseDoc.enrolled.length

            // deleting of such student from all courses -> as they have been alloted course , no need of keeping them in applied of any course
            await Course.updateMany(
                { applied: { $in: student_alloted_course } },
                { $pull: { applied: { $in: student_alloted_course } } }
            )

            res.json({
                path: "From /allotCourse [post] , Students succsfully enrolled in Course !",
            })
        }
        else {
            // delete applied of this courseDoc completly !! 
            await Course.updateMany(
                { name },
                { $set: { applied: [] } }
            )

            res.json({
                path: "From /allotCourse [post] , The course can no longer intake students. Intake Capacity is Full !",
                status: 304
            })
        }
    }
}

const allAvilableCourse = async (req , res) => {
    // show only those course whose current_Enrolled_Count < intake_Capacity
    const courseDocs = await Course
    .find({
        $expr: { $lt: ["$current_Enrolled_Count", "$intake_Capacity"] }
    })
    .populate('enrolled' , ["username" , "email"])
    res.json({
        path: "From /allCourse [get] , successfully listing all courses with current_Enrolled_Count < intake_Capacity", courseDocs
    })
}

const allCourse = async (req , res) => {
    // show all courses
    const courseDocs = await Course.find({}).populate('enrolled' , ["username" , "email"])
    res.json({ path: "From /allCourse [get] , successfully listing all courses", courseDocs })
}

// get one course
const selectedCourse = async (req , res) => {
    const {id} = req.params
    const courseDocs = await Course.findOne({_id : id}).populate('enrolled' , ["username" , "email"])
    res.json({ path: "From /allCourse [get] , successfully listing all courses", courseDocs })
}

// delete course basedon its id
const deleteCourse = async (req , res) => {
    const {tusiKyaKrRaheHo} = req.params  
    const courseDoc = await Course.findByIdAndDelete(tusiKyaKrRaheHo)
    // courseDoc return the deleted course !!
    res.status(200).json({path : "From /deleteCourse [delete] , successfully deleted course", courseDoc})
}

module.exports = { 
    addCourse,
    setAllPref,
    allotCourse , 
    allAvilableCourse , 
    allCourse , 
    selectedCourse , 
    deleteCourse
}