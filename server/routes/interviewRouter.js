import express from "express"
const router=express.Router();

import {createInteview,deleteJob,updateJob,getOwnInterview,showStats,getAllInterview} from "../controllers/interviewController.js"

router.route('/all').get(getAllInterview);
router.route('/').post(createInteview).get(getOwnInterview);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;