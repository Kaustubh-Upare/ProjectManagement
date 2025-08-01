const express=require('express')
const route=express.Router();
const {isAdmin}=require('../middleware/Auth');
const { AdminDashboardStats, adminUsersTaskData, getallProjects, deleteProject, updateProject, deleteTask, editTask, changeProjectStatus, changeTaskStatus, deleteTaskFiles, getAllChats, addTask, getAllTaskDetails } = require('../controllers/adminHandler');

route.use(isAdmin);

// Projects
route.get('/dashyS',AdminDashboardStats);
route.get('/userTasks',adminUsersTaskData);
route.get('/allProjects',getallProjects);
route.delete('/project/delete/:projectId',deleteProject)
route.put('/project/:projectId',updateProject);

// Tasks
route.delete('/task/delete/:taskId',deleteTask);
route.post('/edit/:taskId',editTask);
route.post('/file/delete',deleteTaskFiles);
route.post('/createTask',addTask)
route.get('/allDetails',getAllTaskDetails)

// Change Status
route.post('/project/status',changeProjectStatus);
route.put('/task/status',changeTaskStatus);

// Chats
route.get('/chat/AllChats',getAllChats);


module.exports=route;