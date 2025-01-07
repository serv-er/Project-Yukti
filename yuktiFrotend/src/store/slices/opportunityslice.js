import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState= {
    opportunities: [],
    loading: false,
    error: null,
    message: null,
    //singleJob: {},
    //myJobs: [],
  }

const opportunitySlice=createSlice({
    name:"opportunities",
    initialState,
    reducers:{
          requestForPostOpportunity(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
          },
          successForPostOpportunity(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
          },
          failureForPostOpportunity(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
          },
          clearAllErrors(state, action) {
            state.error = null;
            state.opportunities = state.opportunities;
          },
          
    }
})
export const hackathonPosting = (data) => async (dispatch) => {
    dispatch(opportunitySlice.actions.requestForPostOpportunity());
    try {
        console.log(data)
      const response = await axios.post(
        `http://localhost:7000/api/v1/opportunity/hackathonOpportunityPost`,
        data,
        { withCredentials: true, headers: {"Content-Type": "application/json"} }
      );
      dispatch(opportunitySlice.actions.successForPostOpportunity(response.data.message));
      dispatch(opportunitySlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(opportunitySlice.actions.failureForPostOpportunity(error.response.data.message));
    }
};

export const researchPosting = (data) => async (dispatch) => {
  dispatch(opportunitySlice.actions.requestForPostOpportunity());
  try {
      console.log(data)
    const response = await axios.post(
      `http://localhost:7000/api/v1/opportunity/researchOpportunityPost`,
      data,
      { withCredentials: true, headers: {"Content-Type": "application/json"} }
    );
    dispatch(opportunitySlice.actions.successForPostOpportunity(response.data.message));
    dispatch(opportunitySlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(opportunitySlice.actions.failureForPostOpportunity(error.response.data.message));
  }
};

export const clearAllOpportunityErrors=()=>(dispatch)=>{
    dispatch(opportunitySlice.actions.clearAllErrors())
}

export default opportunitySlice.reducer;