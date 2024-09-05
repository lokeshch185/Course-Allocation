const express = require('express')
const router = express.Router()

const {
    addGrievance ,
    allGrievance ,
    resolveGrievance ,
    selectedGrievance
} = require("../controller/Grievance")

router.route('/addGrievance').post(addGrievance)
router.route('/allGrievance').get(allGrievance)
router.route('/resolveGrievance/:id').post(resolveGrievance)
router.route('/selectedGrievance/:id').get(selectedGrievance)

module.exports = router