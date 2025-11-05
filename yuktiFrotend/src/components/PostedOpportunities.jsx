import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOpportunities } from '../store/slices/opportunityslice';

const PostedOpportunities = () => {
  const dispatch = useDispatch();
  const { myOpportunities, loading } = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(getMyOpportunities());
  }, [dispatch]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading && <p>Loading...</p>}

      {/* Render Hackathons */}
      {myOpportunities?.hackathons?.length > 0 && myOpportunities.hackathons.map((opp) => (
        <HackathonCard key={opp._id} data={opp} />
      ))}

      {/* Render Researches */}
      {myOpportunities?.researches?.length > 0 && myOpportunities.researches.map((opp) => (
        <ResearchCard key={opp._id} data={opp} />
      ))}
    </div>
  );
};

const HackathonCard = ({ data }) => (
  <div className="shadow-xl rounded-2xl p-4 border-l-4 border-blue-500">
    <h2 className="text-xl font-bold text-blue-700">{data.title}</h2>
    <p className="text-sm text-gray-500">{data.description}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Prizes: {data.prizes}</span>
      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Start: {data.startDate}</span>
      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">End: {data.endDate}</span>
    </div>
    <p className="mt-2 text-xs text-gray-400">Skills: {data.skillsRequired?.join(', ')}</p>
  </div>
);

const ResearchCard = ({ data }) => (
  <div className="shadow-xl rounded-2xl p-4 border-l-4 border-purple-500">
    <h2 className="text-xl font-bold text-purple-700">{data.title}</h2>
    <p className="text-sm text-gray-500">{data.description}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Faculty: {data.facultyName}</span>
      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Start: {data.startDate}</span>
      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">End: {data.endDate}</span>
    </div>
    <p className="mt-2 text-xs text-gray-400">Qualifications: {data.qualifications}</p>
    <p className="mt-1 text-xs text-gray-400">Benefits: {data.benefits}</p>
  </div>
);

export default PostedOpportunities;
