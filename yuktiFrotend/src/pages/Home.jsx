import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PeregrineSpinner from "../components/PeregrineSpinner";
import { Link } from "react-router-dom";
import * as THREE from "three";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const canvasRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLearnMoreClick = () => {
    setShowLearnMore(!showLearnMore);
  };

  useEffect(() => {
    // Three.js setup
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x007bff,
      size: 0.05,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Rotating cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0, -3);
    scene.add(cube);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Make particles float
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 relative">
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen z-10">
          <PeregrineSpinner />
        </div>
      ) : (
        <>
          <div className="text-center py-10 z-10">
       
            <div className=" text-gray-800 py-16 px-8 relative z-10">
              <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600 animate-fadeIn">
                  Empowering Students & Faculty with Opportunities and Collaboration!
                </h1>
                <p className="text-lg md:text-2xl font-bold text-gray-600 mb-8 animate-fadeInSlow relative bg-gray-500 animate-fadeOutBackground">
                  Join our platform to connect, innovate, and grow together. Explore projects, contribute to research, and find jobs tailored to students and faculty.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4 animate-bounceIn">
                  <Link to="/login">
                    <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                      Get Started
                    </button>
                  </Link>
                  <button
                    className="bg-gray-200 text-blue-600 hover:bg-gray-300 px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    onClick={handleLearnMoreClick}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            {/* Welcome Section */}
            <div className="mt-6 p-6 rounded-full shadow-lg transition-transform transform hover:scale-105 max-w-full w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] mx-auto bg-blue-100">
              {isAuthenticated && user ? (
                user.role === "Student" ? (
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-blue-600">Welcome, {user.name || "Student"}!</h1>
                    <p className="text-base sm:text-lg mb-6 text-gray-700">
                      You’re one step away from being part of exciting projects and earning valuable experience. Check out opportunities to contribute and grow!
                    </p>
                    <Link to="/dashboardStudent">
                      <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded transition">
                        Go to Dashboard
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-blue-600">Welcome, {user.name || "Faculty"}!</h1>
                    <p className="text-base sm:text-lg mb-6 text-gray-700">
                      Post opportunities, mentor students, and lead departmental initiatives to drive growth and innovation.
                    </p>
                    <Link to="/dashboardFaculty">
                      <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded transition">
                        Go to Dashboard
                      </button>
                    </Link>
                  </div>
                )
              ) : (
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-blue-600">Welcome!</h1>
                  <p className="text-base sm:text-lg mb-6 text-gray-700">Please log in to explore opportunities.</p>
                  <Link to="/login">
                    <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded transition">Log In</button>
                  </Link>
                </div>
              )}
            </div>
            {/* Learn More  */}
            {showLearnMore && (
            <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-lg w-4/5 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Learn More About Our Platform</h2>
              <p className="text-lg mb-4">
                Our platform is designed to bring together students and faculty in an efficient, user-friendly
                environment. Whether you're looking to connect with peers for collaboration, find mentorship, or
                create and post opportunities for students, our platform provides tailored solutions for all.
              </p>
              <h3 className="text-2xl font-semibold text-blue-600 mb-3">For Students:</h3>
              <ul className="list-disc ml-6 mb-4">
                <li>Explore project and job opportunities.</li>
                <li>Connect with faculty and peers for mentorship and collaboration.</li>
                <li>Engage in extracurricular activities like hackathons and competitions.</li>
              </ul>
              <h3 className="text-2xl font-semibold text-blue-600 mb-3">For Faculty:</h3>
              <ul className="list-disc ml-6">
                <li>Post research and project opportunities for students.</li>
                <li>Mentor students in their academic and professional growth.</li>
                <li>Organize departmental events, talks, and initiatives.</li>
              </ul>
              <button
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded transition hover:bg-blue-700"
                onClick={handleLearnMoreClick}
              >
                Close
              </button>
            </div>
          )}
            {/* Features*/ }
            <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2 text-blue-600">Role-Specific Dashboards</h3>
                <p className="text-sm">Tailored experiences for students and faculty, providing relevant tools and features based on roles.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2 text-blue-600">Collaborative Projects</h3>
                <p className="text-sm">Connect with peers and faculty to work on impactful projects and initiatives.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2 text-blue-600">College-Based Environment</h3>
                <p className="text-sm">Automatically group users from the same college for a personalized collaborative space.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2 text-blue-600">Mentorship Opportunities</h3>
                <p className="text-sm">Gain guidance from experienced faculty and professionals in your field.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2 text-blue-600">Hackathons & Competitions</h3>
                <p className="text-sm">Participate in events to showcase skills and collaborate with others.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2 text-blue-600">Job Board</h3>
                <p className="text-sm">Discover opportunities tailored to your career aspirations.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                <h3 className="text-xl font-bold mb-2 text-blue-600">Chat & Communication</h3>
                <p className="text-sm">Engage with peers or faculty through real-time chat for better collaboration and networking.</p>
              </div>
            </div>
          </div>

          <footer className="mt-10 py-4 bg-blue-600 text-white text-center">
            <p>&copy; {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
          </footer>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Home;
