import React, { useEffect, useRef } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Chart as ChartJS } from 'chart.js';
import * as THREE from 'three';
//import './FacultyDashboard.css'; // Include CSS for animations

// Register Chart.js plugins
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const FacultyDashboard = () => {
  const globeRef = useRef();

  useEffect(() => {
    // Three.js Animation for Globe
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    globeRef.current.appendChild(renderer.domElement);

    // Create a rotating sphere
    const geometry = new THREE.SphereGeometry(13, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    const animate = () => {
      sphere.rotation.y += 0.01;
      sphere.rotation.x += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    return () => renderer.dispose();
  }, []);

  // Chart.js Data
  const pieData = {
    labels: ['Opportunities Posted', 'Students Mentored', 'Collaboration Requests'],
    datasets: [
      {
        data: [15, 30, 10],
        backgroundColor: ['#0077ff', '#ff7f0e', '#2ca02c'],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Opportunities Posted',
        data: [5, 8, 4, 10],
        backgroundColor: '#0077ff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Faculty Dashboard</h1>

      <div className="dashboard-grid">
        {/* Globe Animation */}
        <div className="dashboard-item globe-container">
          <h2 className="section-title bg-white">Global Activities</h2>
          <div ref={globeRef}></div>
          </div>

        {/* Pie Chart */}
        <div className="dashboard-item">
          <h2 className="section-title">Activities Overview</h2>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart */}
        <div className="dashboard-item">
          <h2 className="section-title">Monthly Opportunities</h2>
          <Bar data={barData} />
        </div>

        {/* Mentorship Stats */}
        <div className="dashboard-item stats-container">
          <h2 className="section-title">Mentorship Stats</h2>
          <ul>
            <li>Total Students Mentored: <strong>30</strong></li>
            <li>Average Mentorship Rating: <strong>4.6 / 5</strong></li>
            <li>Active Mentorships: <strong>12</strong></li>
          </ul>
        </div>

        {/* Research Interests */}
        <div className="dashboard-item">
          <h2 className="section-title">Research Interests</h2>
          <p>Artificial Intelligence, Machine Learning, Data Science, Quantum Computing</p>
        </div>

        {/* Collaboration Requests */}
        <div className="dashboard-item">
          <h2 className="section-title">Collaboration Requests</h2>
          <p>You have <strong>5 pending requests</strong>. <a href="/collaborations">View Details</a></p>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
