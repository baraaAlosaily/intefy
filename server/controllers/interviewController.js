import Interviews from "../models/Interviews.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  unauthenticatedError,
  NotAcceptable
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment";
import User from "../models/User.js";

const createInterview = async (req, res) => {
  const {
    studentFirstName,
    studentSecondName,
    logicMark,
    englishMark,
    codingMark,
    status,
    englishTest,
    interviewLocation,
  } = req.body;

  if (
    !studentFirstName ||
    !studentSecondName ||
    !logicMark ||
    !englishMark ||
    !codingMark ||
    !status ||
    !interviewLocation||
    !status ||
    !englishTest
  ) {
    throw new BadRequestError("Please Provide All Values");
  }

  if((logicMark>10||logicMark<0)
  ||
  (codingMark>10||codingMark<0)||
  (englishMark>10||englishMark<0)||
  (englishTest>50||englishTest<0)
  ){
    throw new NotAcceptable("Please Provide Valid Marks Logic,Coding,English Between 10-0 and English Test Between 50-0")
  }

  req.body.createdBy = req.user.userId;

  const user= await User.findById(req.user.userId);
  console.log(user)

  let finalResult = Math.ceil(
    (Number(logicMark) + Number(englishMark) + Number(codingMark)) / 3
  );

  if (finalResult >= 6) {
    req.body.status = "pass";
  }

  const interview = await Interviews.create({
    ...req.body,
    result:finalResult,
    username:user.name+" "+user.lastName
  });

  res.status(StatusCodes.CREATED).json({ interview });
};
const getOwnInterview = async (req, res) => {
  const { status, interviewLocation, courseType, sort, search } = req.query;

  let queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition
  if (status !== "all") {
    queryObject.status = status;
  }

  if (interviewLocation !== "all") {
    queryObject.interviewLocation = interviewLocation;
  }

  if (courseType !== "all") {
    queryObject.courseType = courseType;
  }

  if (search) {
    queryObject.studentFirstName = { $regex: search, $options: "i" };
  }

  //No await
  let result = Interviews.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("studentFirstName");
  }
  if (sort === "z-a") {
    result = result.sort("-studentFirstName");
  }

  //Setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  //chain sort
  const interviews = await result;
  const totalInterviews = await Interviews.countDocuments(queryObject);
  const numberOfPages = Math.ceil(totalInterviews / limit);

  res
    .status(StatusCodes.OK)
    .json({ interviews, totalInterviews, numberOfPages });
};

const getAllInterview = async (req, res) => {
  const { status, interviewLocation, courseType, sort, search } = req.query;

  let queryObject = {};

  let user = await User.findById(req.user.userId);

  console.log(user);

  if (user.isAdmin === false) {
    throw new unauthenticatedError("You are not authorized to get this data");
  }
  // add stuff based on condition
  if (status !== "all") {
    queryObject.status = status;
  }

  if (interviewLocation !== "all") {
    queryObject.interviewLocation = interviewLocation;
  }

  if (courseType !== "all") {
    queryObject.courseType = courseType;
  }

  if (search) {
    queryObject.studentFirstName = { $regex: search, $options: "i" };
  }

  //No await
  let result = Interviews.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("studentFirstName");
  }
  if (sort === "z-a") {
    result = result.sort("-studentFirstName");
  }

  //Setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  //chain sort
  const interviews = await result;
  const totalInterviews = await Interviews.countDocuments(queryObject);
  const numberOfPages = Math.ceil(totalInterviews / limit);

  res
    .status(StatusCodes.OK)
    .json({ interviews, totalInterviews, numberOfPages });
};
const updateInterview = async (req, res) => {
  const { id: interivewId } = req.params;
  const {     
    studentFirstName,
    studentSecondName,
    logicMark,
    englishMark,
    codingMark,
    status,
    interviewLocation,
    englishTest,
    } = req.body;

  if (    
    !studentFirstName ||
    !studentSecondName ||
    !logicMark ||
    !englishMark ||
    !codingMark ||
    !status ||
    !interviewLocation||
    !status ||
    !englishTest) {
    throw new BadRequestError("Please Provide All Values");
  }

  const interview = await Interviews.findOne({ _id: interivewId });

  if (!interview) {
    throw new NotFoundError(`No interview with id : ${interivewId}`);
  }

  if(Number(logicMark)>10&&Number(logicMark)<10||
  Number(codingMark)>10&&Number(codingMark)<10||
  Number(englishMark)>10&&Number(englishMark)<10||
  Number(englishTest)>50&&Number(englishTest)<50
  ){
    throw new NotAcceptable("Please provide valid marks")
  }

  let finalResult = Math.ceil(
    (Number(logicMark) + Number(englishMark) + Number(codingMark)) / 3
  );

  if (finalResult >= 6) {
    req.body.status = "pass";
  }

  //check permission
  checkPermissions(req.user, interview.createdBy);

  const updatedInterview = await Interviews.findOneAndUpdate(
    { _id: interivewId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedInterview });
};

const deleteInterview = async (req, res) => {
  const { id: interviewId } = req.params;

  const interview = await Interviews.findById({ _id: interviewId });

  if (!interview) {
    throw new NotFoundError(`No job with id : ${interviewId}`);
  }

  //check permission
  checkPermissions(req.user, interview.createdBy);

  await interview.remove();

  res.status(StatusCodes.OK).json({ msg: "Interview deleted successfully" });
};

const showStats = async (req, res) => {

  let user = await User.findById(req.user.userId);
  if (user.isAdmin === false) {
    throw new unauthenticatedError("You are not authorized to get this data");
  }
  let stats = await Interviews.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
    //    {$group:{date:'$createdAt',count:{$sum:1}}}
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pass: stats.pass || 0,
    failed: stats.failed || 0,
    retake: stats.retake || 0,
    pending: stats.pending || 0,
  };

  let cityStats = await Interviews.aggregate([
    { $group: { _id: "$interviewLocation", count: { $sum: 1 } } },
    //    {$group:{date:'$createdAt',count:{$sum:1}}}
  ]);

  cityStats = cityStats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultCityStats = {
    Amman: cityStats.Amman || 0,
    Irbid: cityStats.Irbid || 0,
  };

  let courseTypeStats = await Interviews.aggregate([
    { $group: { _id: "$courseType", count: { $sum: 1 } } },
    //    {$group:{date:'$createdAt',count:{$sum:1}}}
  ]);

  courseTypeStats = courseTypeStats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultCourseTypeStats = {
    javascript:courseTypeStats.javascript||0,
    python:courseTypeStats.python||0,
    dotnet:courseTypeStats.dotnet||0,
    java:courseTypeStats.java||0,
    cybersecurity:courseTypeStats.cybersecurity||0,
    datavisualization:courseTypeStats.mobiledevelopment||0,
    mobiledevelopment:courseTypeStats.mobiledevelopment||0,
    others:courseTypeStats.others||0,
  };

  let monthlyApplication = await Interviews.aggregate([
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
          day: {
            $dayOfMonth: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1,"_id.day": -1 } },
    { $limit: 10 },
  ]);

  console.log(monthlyApplication);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month,day },
        count,
      } = item;
      const date = moment().
         day(day)
        .month(month - 1)
        .year(year)
        .format("MMM Do YYYY");

      return { date, count };
    })
    .reverse();

  let usersStats = await Interviews.aggregate([
    { $group: { _id: "$createdBy", count: { $sum: 1 } } },
  ]);

  const functionAwaitingPromise = async () => {
    let newArr = [];
    for (let i = 0; i < usersStats.length; i++) {
      try {
        let user = await User.findById(usersStats[i]._id);
        let obj = {
          _id: user.name+" "+user.lastName,
          count: usersStats[i].count,
        };
        newArr.push(obj);
      } catch (error) {
        console.log(error);
      }
    }
    usersStats = newArr;
  };

  await functionAwaitingPromise();

  res
    .status(StatusCodes.OK)
    .json({
      usersStats,
      monthlyApplication,
      defaultStats,
      defaultCityStats,
      defaultCourseTypeStats,
    });
};

export {
  getAllInterview,
  createInterview,
  getOwnInterview,
  deleteInterview,
  updateInterview,
  showStats,
};
