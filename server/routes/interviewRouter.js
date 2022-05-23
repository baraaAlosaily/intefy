import express from "express"
const router=express.Router();

import {createInterview,deleteInterview,updateInterview,getOwnInterview,showStats,getAllInterview} from "../controllers/interviewController.js"

router.route('/all').get(getAllInterview);
router.route('/').post(createInterview).get(getOwnInterview);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteInterview).patch(updateInterview);

export default router;