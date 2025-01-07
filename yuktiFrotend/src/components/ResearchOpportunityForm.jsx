import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { clearAllOpportunityErrors,researchPosting } from "../store/slices/opportunityslice";
import { toast } from "react-toastify";

const ResearchOpportunityForm = () => {
  const initialFormData = {
    title: "",
    description: "",
    facultyName: "",
    qualifications: "",
    skillsRequired: [],
    startDate: "",
    endDate: "",
    benefits: "",
    visibility:"",
  };
  const [formData, setFormData] = useState(initialFormData);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Research Opportunity Submitted: ", formData);
    dispatch(researchPosting(formData));
    setFormData(initialFormData);
    setSkillInput("");
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
      className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Post Research Opportunity
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          placeholder="Enter research title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          placeholder="Provide a brief description of the research opportunity"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Faculty Name</label>
        <input
          type="text"
          name="facultyName"
          value={formData.facultyName}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Qualifications Needed
        </label>
        <textarea
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          placeholder="List qualifications required (e.g., enrolled in CS, GPA > 8.0)"
          rows="3"
          required
        ></textarea>
      </div>

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
  

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Benefits</label>
        <textarea
          name="benefits"
          value={formData.benefits}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          placeholder="Mention benefits (e.g., certificate, stipend, publication)"
          rows="3"
        ></textarea>
      </div>
{/*
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Application Link</label>
        <input
          type="url"
          name="applicationLink"
          value={formData.applicationLink}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          placeholder="Provide a link to apply or submit applications"
          required
        />
      </div>
 */}
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
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600">
          Post Research Opportunity
        </button>
      </div>
    </form>
  );
};

export default ResearchOpportunityForm;
