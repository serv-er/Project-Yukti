import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { clearAllOpportunityErrors, hackathonPosting } from "../store/slices/opportunityslice";
import { toast } from "react-toastify";

const HackathonUploadForm = () => {
  const initialFormData = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    time: "",
    venue: "",
    eligibilityCriteria: "",
    prizes: "",
    visibility: "",
    tags: [],
    skillsRequired: [], 
  };
  const [formData, setFormData] = useState(initialFormData);
  const [tagInput, setTagInput] = useState("");
  const [skillInput,setSkillInput]=useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.opportunities);

  const handleSkillAddition = () => {
    if (skillInput.trim() !== "") {
      setFormData({
        ...formData,
        skillsRequired: [...formData.skillsRequired, skillInput.trim()],
      });
      setSkillInput("");  // Clear input after adding
    }
  };

  const handleSkillRemoval = (index) => {
    const newSkills = formData.skillsRequired.filter((_, i) => i !== index);
    setFormData({ ...formData, skillsRequired: newSkills });
  };
  const handleTagAddition = () => {
    if (tagInput.trim() !== "") {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleTagRemoval = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(hackathonPosting(formData));
    //console.log("Form Submitted: ", formData);
   // alert("Hackathon details uploaded successfully!");
    setFormData(initialFormData);
    setTagInput("");
    setSkillInput("");
    // Add backend integration for submission here
  };

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllOpportunityErrors());
    }
    if(message){
      toast.success(message)
    //dispatch(resetJobSlice())
    }
  },[dispatch,error,loading,message])
  return (
    <form
    onSubmit={handleSubmit}
    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto"
  >
    <h2 className="text-xl font-bold mb-4">Upload Hackathon Details</h2>
  
    {/* Title */}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Hackathon Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter the hackathon title"
        required
      />
    </div>
  
    {/* Description */}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Provide a brief description of the hackathon"
        rows="4"
        required
      ></textarea>
    </div>
  
    {/* Start Date and End Date */}
    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 font-bold mb-2">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
    </div>
  
    {/* Time */}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Time</label>
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
  
    {/* Skills Required */}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Skills Required</label>
      <div className="flex">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Add skills (e.g., JavaScript, React)"
        />
        <button
          type="button"
          onClick={handleSkillAddition}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <div className="mt-2">
        {formData.skillsRequired.map((skill, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mt-1"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleSkillRemoval(index)}
              className="ml-1 text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  
    {/* Visibility */}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Visibility</label>
      <select
        name="visibility"
        value={formData.visibility}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Default (Visible to all)</option>
        <option value="department">Departmental Only</option>
        <option value="college">All College Students</option>
      </select>
    </div>
  
    {/* Venue */}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Venue</label>
      <input
        type="text"
        name="venue"
        value={formData.venue}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter the venue address"
        required
      />
    </div>
  
    {/* Eligibility */}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Eligibility</label>
      <input
        type="text"
        name="eligibilityCriteria"
        value={formData.eligibilityCriteria}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Specify the eligibility criteria"
        required
      />
    </div>
  
    {/* Prize Details */}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Prize Details</label>
      <textarea
        name="prizes"
        value={formData.prizes}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="List the prizes for the hackathon"
        rows="3"
        required
      ></textarea>
    </div>
  
    {/* Tags */}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Tags</label>
      <div className="flex">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Add tags (e.g., AI, Web Dev)"
        />
        <button
          type="button"
          onClick={handleTagAddition}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <div className="mt-2">
        {formData.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mt-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleTagRemoval(index)}
              className="ml-1 text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  
    {/* Submit Button */}
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-600"
      >
        Upload Hackathon
      </button>
    </div>
  </form>
  
  );
};
export default HackathonUploadForm;
