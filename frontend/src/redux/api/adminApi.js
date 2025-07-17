import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const adminApi=createApi({
    reducerPath:"adminApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/admin"}),
    tagTypes:['project'],
    endpoints:(builder)=>({
        getAllProjectAdmin:builder.query({
            query:()=>({
                url:'/allProjects',
                credentials:'include'
            }),
            providesTags:['project']
        }),
        updateProjectAdmin:builder.mutation({
            query:({id,edit})=>({
                url:`/project/${id}`,   
                method:'PUT',
                credentials:'include',
                body:edit,
                headers:{
                    "Content-Type":"application/json"
                }
            }),
            invalidatesTags:['project']
        }),
        updateTaskAdmin:builder.mutation({
            query:({id,edit})=>({
                url:`/edit/${id}`,
                method:'POST',
                credentials:'include',
                body:edit,
            })
        }),
        changeProjectStatus:builder.mutation({
            
            query:({projectId,archy})=>{
                console.log("Admin api",projectId,archy)
                return(
                    {
                        url:'/project/status',
                        method:'post',
                        credentials:'include',
                        headers: {
                            'Content-Type': 'application/json', 
                          },
                        body:JSON.stringify({archy,projectId})
                    }
                )
            }
                
        }),
        changeTaskStatus:builder.mutation({
            query:({taskId,projectId,archy})=>({
                url:'/task/status',
                method:'POST',
                credentials:'include',
                body:{taskId,projectId,archy}
            }),
        }),
        getAllGroups:builder.query({
            query:()=>({
                url:'/chat/AllChats',
                credentials:'include',
            })
        }),
        AdminAssignNewTask:builder.mutation({
            query:(tasky)=>({
                url:"/createTask",
                method:'POST',
                credentials:'include',
                body:tasky,
                headers:{
                    "Content-Type":"application/json"
                }
            }),
            invalidatesTags:['project']
        }),
        GetAdminTaskDashboard:builder.query({
            query:()=>({
                url:'/allDetails',
                credentials:'include'
            })
        })
    })
})
export default adminApi;
export const {useGetAllProjectAdminQuery,useUpdateProjectAdminMutation,
    useUpdateTaskAdminMutation,useChangeProjectStatusMutation,
    useChangeTaskStatusMutation,useGetAllGroupsQuery,useAdminAssignNewTaskMutation,
    useGetAdminTaskDashboardQuery
}=adminApi