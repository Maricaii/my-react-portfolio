import React, { useState, useEffect } from 'react';
import './index.css'; // Make sure this path matches your CSS filename

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, downloading, finished
  const [progress, setProgress] = useState(0);

  // Resume bar simulator
  const handleDownload = () => {
    if (downloadStatus !== 'idle') return;
    setDownloadStatus('downloading');
    setProgress(0);
  };

  useEffect(() => {
    let interval;
    if (downloadStatus === 'downloading') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadStatus('finished');
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [downloadStatus]);

  // Dynamically switch background classes matching your CSS setups
  const getBackgroundClass = () => {
    if (currentPage === 'About') return 'bg-about';
    if (currentPage === 'Projects') return 'bg-projects';
    return 'bg-home';
  };

  // --- COMPONENT: NAV BAR ---
  const Navigation = () => (
    <ul className="nav-bar">
      <li>
        <button onClick={() => setCurrentPage('Home')}>Home</button>
      </li>
      <li>
        <button onClick={() => setCurrentPage('About')}>About Me</button>
      </li>
      <li>
        <button onClick={() => setCurrentPage('Projects')}>Projects</button>
      </li>
    </ul>
  );

  // --- COMPONENT: FOOTER ---
  const Footer = () => (
    <footer>
      <div className="footerTop">Maricar Bucalan</div>
      <p>Designer · Programmer · Nail Tech</p>
      <div>
        <a href="https://www.facebook.com/profile.php?id=100088131397741" target="_blank" rel="noreferrer">Facebook</a>
        <a href="#">LinkedIn</a>
        <a href="#">GitHub</a>
        <a href="#">+63 9918369471</a>
        <a href="mailto:maricarbucalan@gmail.com">maricarbucalan@gmail.com</a>
      </div>
    </footer>
  );

  // --- VIEW: HOME ---
  const HomeView = () => (
    <div className="home-container">
      <img src="/Formal.jpg" alt="Maricar Bucalan" className="home-avatar" />
      <div className="home-details">
        <h1>Maricar C. Bucalan</h1>
        <h4>BS Information Technology </h4>
        <h4 style={{ color: '#6B705C' }}>IT Student | Game Asset Creator | Aspiring Software Engineer</h4>
        <p>I am currently pursuing a degree in Information Technology, focusing on software development and game asset design.</p>
        <p>I combine creative 3D modeling with programming knowledge to build interactive and system-driven projects.</p>
        <p>I aim to grow into a professional software engineer specializing in structured and optimized systems.</p>

        <button 
          type="button" 
          onClick={handleDownload}
          className={`downloadBtn ${downloadStatus === 'finished' ? 'finished' : ''}`}
        >
          <span>
            {downloadStatus === 'idle' && 'Download Resume'}
            {downloadStatus === 'downloading' && 'Downloading...'}
            {downloadStatus === 'finished' && 'Downloaded!'}
          </span>
          <div className="progressBar" style={{ width: `${progress}%` }} />
        </button>
      </div>
    </div>
  );

  // --- VIEW: ABOUT ME ---
  const AboutView = () => (
    <div className="about-content">
      <div className="about-avatar-wrapper">
        <img src="Formal.jpg" alt="Maricar Bucalan" className="about-avatar" />
      </div>
      <p className="p">I am an Information Technology student with a strong interest in software development and game design.</p>
      
      <h3>Skills:</h3>
      <ul className="about-list">
        <li>Programming languages (HTML, Java, C#)</li>
        <li>Game Asset Creation</li>
      </ul>
  
      <h3>Strengths:</h3>
      <ul className="about-list">
        <li>Problem-solving</li>
        <li>Logical thinking</li>
        <li>System organization</li>
      </ul>

      <h3>My Career Goal</h3>
      <p className="p">I aim to become a software engineer specializing in scalable and efficient systems.</p>
    </div>
  );

  // --- VIEW: PROJECTS ---
  const ProjectsView = () => (
    <div id="mainContent">
      <div className="projectsContainer">
        
        <div className="projectCard">
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎮</div>
          <h3>Game Asset Design</h3>
          <p>3D models and assets created for game development projects using creative design tools.</p>
          <button type="button" className="projectBtn">View Assets</button>
        </div>

        <div className="projectCard">
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌐</div>
          <h3>Portfolio Website</h3>
          <p>A personal portfolio built with HTML, CSS, and JavaScript showcasing my skills and work.</p>
          <button type="button" className="projectBtn">View Code</button>
        </div>

        <div className="projectCard">
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚙️</div>
          <h3>System Projects</h3>
          <p>Software systems developed using Java and C# focusing on structured and optimized logic.</p>
          <button type="button" className="projectBtn">View Systems</button>
        </div>

      </div>
    </div>
  );

  return (
    <div id="pageContainer" className={getBackgroundClass()}>
      <Navigation />
      
      <main style={{ paddingTop: '60px' }}>
        {currentPage === 'Home' && <HomeView />}
        {currentPage === 'About' && <AboutView />}
        {currentPage === 'Projects' && <ProjectsView />}
      </main>

      <Footer />
    </div>
  );
}