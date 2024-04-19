// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://user-auth-x5yj.vercel.app/api/user/' }),
    endpoints: (builder) => ({

      registerUser: builder.mutation({
        query: (user) =>{
          return{
            url: 'signup',
            method: 'POST',
            body: user,
            headers: {
              'Content-type': 'application/json'
            }
          }
        }
       
      }),
      loginUser: builder.mutation({
        query: (user) =>{
          return{
            url: 'login',
            method: 'POST',
            body: user,
            headers: {
              'Content-type': 'application/json'
            }
          }
        }
       
      }),
      resetPasswordEmail: builder.mutation({
        query: (user) =>{
          return{
            url: 'resetPasswordEmail',
            method: 'POST',
            body: user,
            headers: {
              'Content-type': 'application/json'
            }
          }
        }
       
      }),
      resetPassword: builder.mutation({
        query: ({user, id, token}) =>{
          return{
            url: `resetPassword/${id}/${token}`,
            method: 'POST',
            body: user,
            headers: {
              'Content-type': 'application/json'
            }
          }
        }
      }),
      getLoggedData: builder.query({
        query: (token) =>{
          return{
            url: "loggedUser",
            method: 'GET',
            headers: {
              'authorization': `Bearer ${token}`
            }
          }
        }
      }),
      updateUser: builder.mutation({
        query: ({user, token}) =>{
          return{
            url: "updatePassword",
            method: 'POST',
            body: user,
            headers: {
              'authorization': `Bearer ${token}`
            }
          }
        }
      }),
    }),
  })
  

  export const { useRegisterUserMutation, useLoginUserMutation, useResetPasswordEmailMutation, 
    useResetPasswordMutation, useGetLoggedDataQuery, useUpdateUserMutation} = userAuthApi