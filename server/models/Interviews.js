import mongoose from "mongoose"

const InterviewSchema= new mongoose.Schema({
    studentFirstName:{
        type:String,
        required:[true,'Please provide student first name'],
        maxlength:25
    },
    studentSecondName:{
        type:String,
        required:[true,'Please provide student last name'],
        maxlength:25
    },
    logicMark:{
        type: Number,
        min: 0,
        max: 10,
        required:[true,'Please provide logic mark'],
    },
    englishMark:{
        type: Number,
        min: 0,
        max: 10,
        required:[true,'Please provide english mark'],
    },
    codingMark:{
        type: Number,
        min: 0,
        max: 10,
        required:[true,'Please provide coding mark'],
    },
    englishTest:{
        type: Number,
        min: 0,
        max: 50,
        required:[true,'Please provide english mark'],
    },
    result:{
        type: Number,
        min: 0,
        max: 10,
        required:[true,'Please provide coding mark'],
    },
    status:{
        type:String,
        enum:['pass','failed','retake','pending'],
        default:'pending'
    },
    interviewLocation:{
        type:String,
        required:[true,'Please provide city'],
        enum:['Amman','Irbid'],
        default:'Amman',
    },
    courseType:{
        type:String,
        enum:['javascript','python','dotnet','java','cybersecurity','datavisualization','mobiledevelopment','others'],
        default:'others'
    },
    note:{
       type:String,
       maxlength:100,
       default:"No notes required"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }

},{timestamps:true})

export default mongoose.model('Interviews',InterviewSchema);