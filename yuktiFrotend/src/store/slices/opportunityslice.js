import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    opportunities: [],
    loading: false,
    error: null,
    message: null,
    myOpportunities: [],
};

const opportunitySlice = createSlice({
    name: "opportunities",
    initialState,
    reducers: {
        requestForPostOpportunity(state) {
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
        requestForGetOpportunity(state) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        successForGetOpportunity(state, action) {
            state.opportunities = action.payload;
            state.error = null;
            state.loading = false;
        },
        failureForGetOpportunity(state, action) {
            state.opportunities = [];
            state.error = action.payload;
            state.loading = false;
        },
        // My Opportunities reducers
        requestForMyOpportunities(state) {
            state.loading = true;
            state.error = null;
        },
        successForMyOpportunities(state, action) {
            state.myOpportunities = action.payload;
            state.loading = false;
        },
        failureForMyOpportunities(state, action) {
            state.myOpportunities = [];
            state.error = action.payload;
            state.loading = false;
        },
        clearAllErrors(state) {
            state.error = null;
            state.message = null;
        },
    },
});

// ✅ Fetch all hackathons
export const getHackathon = () => async (dispatch) => {
    dispatch(opportunitySlice.actions.requestForGetOpportunity());
    try {
        const response = await axios.get(`http://localhost:7000/api/v1/opportunity/hackathonOpportunities`, { withCredentials: true });
        dispatch(opportunitySlice.actions.successForGetOpportunity(response.data.hackathonOpportunity));
    } catch (error) {
        dispatch(opportunitySlice.actions.failureForGetOpportunity(error.response.data.message));
    }
};

// ✅ Fetch my posted opportunities (hackathons + research)
export const getMyOpportunities = () => async (dispatch) => {
    dispatch(opportunitySlice.actions.requestForMyOpportunities());
    try {
        const response = await axios.get(`http://localhost:7000/api/v1/opportunity/myOpportunities`, { withCredentials: true });
        dispatch(opportunitySlice.actions.successForMyOpportunities(response.data.opportunities));
    } catch (error) {
        dispatch(opportunitySlice.actions.failureForMyOpportunities(error.response.data.message));
    }
};

// ✅ Post Hackathon + fetch myOpportunities
export const hackathonPosting = (data) => async (dispatch) => {
    dispatch(opportunitySlice.actions.requestForPostOpportunity());
    try {
        const response = await axios.post(
            `http://localhost:7000/api/v1/opportunity/hackathonOpportunityPost`,
            data,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(opportunitySlice.actions.successForPostOpportunity(response.data.message));
        dispatch(getHackathon()); // Refresh public hackathons
        dispatch(getMyOpportunities()); // Refresh "My Posted Opportunities"
        dispatch(opportunitySlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(opportunitySlice.actions.failureForPostOpportunity(error.response.data.message));
    }
};

// ✅ Post Research + fetch myOpportunities
export const researchPosting = (data) => async (dispatch) => {
    dispatch(opportunitySlice.actions.requestForPostOpportunity());
    try {
        const response = await axios.post(
            `http://localhost:7000/api/v1/opportunity/researchOpportunityPost`,
            data,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(opportunitySlice.actions.successForPostOpportunity(response.data.message));
        dispatch(getMyOpportunities()); // Refresh "My Posted Opportunities"
        dispatch(opportunitySlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(opportunitySlice.actions.failureForPostOpportunity(error.response.data.message));
    }
};

// Clear Errors
export const clearAllOpportunityErrors = () => (dispatch) => {
    dispatch(opportunitySlice.actions.clearAllErrors());
};

export default opportunitySlice.reducer;
