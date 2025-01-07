import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const DepartmentalForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    duration: "",
    eligibility: "",
    applicationDeadline: "",
    contactEmail: "",
    applyLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, like sending to API
    console.log("Form submitted:", formData);
  };

  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Particles Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 5000;

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Particles Material
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00aaff,
      size: 0.05,
    });

    // Particles Mesh
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Camera Position
    camera.position.z = 5;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on Unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Background Animation */}
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      ></div>

      {/* Form */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          background: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflowY: "auto", // Add scrolling if needed
        }}
      >
        <h1 style={{ marginBottom: "20px", fontSize: "24px", color: "#333" }}>
          Departmental Form
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Project Title */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Project Description */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          {/* Skills Required */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="skills"
            >
              Skills Required
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={formData.skills}
              onChange={handleChange}
              required
            />
            <small className="text-gray-500">Comma separated list of skills</small>
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="duration"
            >
              Duration (in months)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          {/* Eligibility Criteria */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="eligibility"
            >
              Eligibility Criteria
            </label>
            <textarea
              id="eligibility"
              name="eligibility"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={formData.eligibility}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          {/* Application Deadline */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="applicationDeadline"
            >
              Application Deadline
            </label>
            <input
              type="date"
              id="applicationDeadline"
              name="applicationDeadline"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={formData.applicationDeadline}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact Email */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="contactEmail"
            >
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          {/* Application Link */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="applyLink"
            >
              Application Link (Optional)
            </label>
            <input
              type="url"
              id="applyLink"
              name="applyLink"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={formData.applyLink}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Post Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentalForm;

