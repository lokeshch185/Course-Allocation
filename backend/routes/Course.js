const express = require('express')
const router = express.Router()
const multer = require('multer');

const uploadImageMiddleware = multer({ dest: './uploads' });


const {
    addCourse,
    setAllPref,
    allotCourse ,      
    allAvilableCourse , 
    allCourse , 
    selectedCourse , 
    deleteCourse
} = require("../controller/Course")
 
// adding multer middleware to upload image 
router.route('/addCourse').post(uploadImageMiddleware.single("Imagefile") , addCourse) 
router.route('/setAllPref').post(setAllPref)
router.route('/allotCourse').post(allotCourse)
router.route('/allAvilableCourse').get(allAvilableCourse)
router.route('/allCourse').get(allCourse)
router.route('/selectedCourse/:id').get(selectedCourse)
router.route('/deleteCourse/:tusiKyaKrRaheHo').post(deleteCourse)

module.exports = router