import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  Autocomplete,
  Chip,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { CalendarToday, Folder } from "@mui/icons-material";
import { useAddNewProjectMutation, useAddTaskMutation, useEditProjectMutation, useGetAllMembersQuery, useGetProjectMembersMutation } from "../../redux/api/api";
import { useAsyncMutation } from "../Hooks/Hooks";


const AssignTaskProjectDialog = ({ open,projectName ,projectId,onClose }) => {

//   const {user}=useSelector((state)=>state.auth)
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [piroA,setpiroA]=useState(projectId);
  const [teamStudents,setTeamStudents]=useState([]);
  const [EditProject,isLoadingEditProject]=useAsyncMutation(useEditProjectMutation)
  const [getProjectMembers,projectMembersLoading]=useAsyncMutation(useGetProjectMembersMutation)
  const[addTheTask,taskLoading]=useAsyncMutation(useAddTaskMutation)
//   console.log("ProjectMembers",getProjectMembers("Getting The Members..."));

  useEffect(()=>{
    const fetchMembers=async()=>{
        console.log('haa id',piroA)
        const response=await getProjectMembers("Getting The Members...", { piroA })
        console.log("ProjectMembers", response);
        setTeamStudents(response?.members?.teamMembers || [])
    }
    fetchMembers()
  },[piroA])

  const handleEditProject=async ()=>{
    const t={
      projectTitle,description,assignees,dueDate,piroA
    }
    console.log(projectTitle,description,assignees,dueDate)
    await addTheTask("Adding the Task",t)
   onClose()
  }

  const {data:getAllMembers,isLoading:yeda}=useGetAllMembersQuery()
  const members = getAllMembers?.members || []; 
  
  const handleCloseDialog=()=>{
    DialogHandler(false);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md"
    fullWidth
    PaperProps={{
      sx: {
        padding: "12px",
        width: "600px", // Rectangular Format
        maxWidth: "100%",
        height: "auto",
      },
    }}>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", pb: 1, fontSize: "16px" }}>Assign New Task</DialogTitle>
      <DialogContent sx={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Project Title */}
        <FormControl fullWidth variant="standard">
            <InputLabel>Projects</InputLabel>
            <Select value={piroA} 
            onChange={(e)=>setpiroA(e.target.value)}
            >
                <MenuItem value={projectId}>{projectName}</MenuItem>
            </Select>
        </FormControl>
        
        
        
        <div>
        <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>Task Name</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          value={projectTitle}
          sx={{
            "& .MuiInputLabel-root": { fontSize: "15px" }, // Small label text
          }}
          onChange={(e) => setProjectTitle(e.target.value)}
          InputProps={{
            inputProps: { style: { fontSize: "12px", padding: "13 px" } },
          }}
        />

        </div>
        

        {/* Description*/}
        <div>
        <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>Description</Typography>
        <TextField
        size="small"
          fullWidth
          variant="outlined"
          margin="dense"
          sx={{
            "& .MuiInputLabel-root": { fontSize: "15px" }, // Small label text
          }}
          multiline
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{
            inputProps: { style: { fontSize: "12px", padding: "13 px" } },
          }}
        />
        </div>

          <div>
            <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>Due Date</Typography>
            <TextField
          fullWidth
          size="small"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputProps={{
            inputProps: { style: { fontSize: "12px", padding: "13 px" } },
          }}
        />
          </div>
          

        {/* Assign Member */}
        <div>
        <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>Select Memmbers</Typography>
        <Autocomplete
          size="small"
          multiple
          options={teamStudents} // Use transformed data
          getOptionLabel={(option) => option.name} // Display name in dropdown
          value={ assignees.length>0? teamStudents.filter(m => assignees.includes(m._id)) : []} // Show selected names
          onChange={(event, newValue) =>{
            if (!projectMembersLoading) {
              setAssignees(newValue.map((item) => item._id)); // Store only IDs
            }
          }} // Store only IDs
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip {...getTagProps({ index })} key={option._id}
                sx={{ fontSize: "12px" }} label={option.name} />
            ))
            }
            renderOption={(props, option) =>
                option._id === "loading" ? (
                <li {...props} key="loading">
                <CircularProgress size={20} sx={{ marginRight: 1 }} /> Loading...
                </li>
                ) : (
              <li {...props} key={option._id}>
                {option.name}
              </li>
                )
                }
            renderInput={(params) => (
              <TextField {...params} 
                sx={{ "& .MuiInputBase-root": { fontSize: "12px" }}}
              />
            )}
            fullWidth
        />
        </div>
        
      <TextField
        fullWidth
        type="file"
        size="small"
        InputProps={{
          inputProps: { style: { fontSize: "12px", padding: "15 px" } },
        }}
      />
        
        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleEditProject}
          disabled={isLoadingEditProject}
        >
          Assign Task
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTaskProjectDialog;
