import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function App() {
  const [showAbout, setShowAbout] = useState(false);
  const firstRender = useRef(true); // Track first load

  const bgRef = useRef(null);
  const h3TextRef = useRef(null);
  const h1Ref = useRef(null);
  const imgref = useRef(null);
  const cvButtonRef = useRef(null);
  const aboutMeButtonRef = useRef(null);
  const aboutContainerRef = useRef(null);

  // Background animation
  useEffect(() => {
    const bg = bgRef.current;
    const colors = [
      'linear-gradient(270deg, #ff6eb4, #9b59b6)',
      'linear-gradient(270deg, #8e44ad, #3498db)',
      'linear-gradient(270deg, #d291bc, #7f8cdb)',
      'linear-gradient(270deg, #5dade2, #bb8fce)',
    ];

    let index = 0;
    const duration = 7;

    function animateGradient() {
      if (!bg) return;
      index = (index + 1) % colors.length;
      gsap.to(bg, {
        background: colors[index],
        duration,
        ease: 'power1.inOut',
        onComplete: animateGradient,
      });
    }

    gsap.set(bg, { background: colors[0] });
    animateGradient();
    return () => {
      if (bg) gsap.killTweensOf(bg);
    };
  }, []);

  // Typewriter animation
  useEffect(() => {
    if (showAbout) return;

    const h3Text = h3TextRef.current;
    const text = "Software Engineer";

    h3Text.textContent = '';
    gsap.set(h3Text, { opacity: 1, filter: 'blur(0px)' });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    for (let i = 0; i <= text.length; i++) {
      tl.to(h3Text, {
        duration: 0.1,
        textContent: text.slice(0, i),
        ease: 'none',
      });
    }

    tl.to({}, { duration: 2 }); // Pause before deleting

    for (let i = text.length; i >= 0; i--) {
      tl.to(h3Text, {
        duration: 0.05,
        textContent: text.slice(0, i),
        ease: 'none',
      });
    }

    tl.to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, [showAbout]);

  // One-time animations
  useEffect(() => {
    const h1 = h1Ref.current;
    const img = imgref.current;
    const cvButton = cvButtonRef.current;
    const aboutMeButton = aboutMeButtonRef.current;
    const mm = gsap.matchMedia();

    gsap.fromTo(h1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 });

    mm.add('(min-width: 1025px)', () => {
      gsap.fromTo(img, { xPercent: 50 }, { xPercent: -40, duration: 2, delay: 4 });
    });

    gsap.fromTo(img, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2.5, delay: 2 });

    gsap.fromTo(
      aboutMeButton,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: window.innerWidth <= 1024 ? 3.5 : 5.5 }
    );
    gsap.fromTo(
      cvButton,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: window.innerWidth <= 1024 ? 4 : 6 }
    );

    return () => mm.revert();
  }, []);

  // About button click
  const handleAboutClick = () => {
    const tl = gsap.timeline({
      onComplete: () => setShowAbout(true),
    });

    tl.to(
      [h1Ref.current, h3TextRef.current, imgref.current, cvButtonRef.current, aboutMeButtonRef.current],
      {
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.95,
        duration: 0.8,
        ease: "power2.out",
      }
    );
  };

  // Open about section
  useEffect(() => {
    if (showAbout) {
      gsap.fromTo(
        aboutContainerRef.current,
        { opacity: 0, filter: "blur(10px)", scale: 1.05 },
        { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [showAbout]);

  // Close about section
  const handleBackClick = () => {
    const tl = gsap.timeline({
      onComplete: () => setShowAbout(false),
    });

    tl.to(aboutContainerRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      scale: 0.95,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  // Handle only show animations if not prev shown
  useEffect(() => {
    if (showAbout) {
      firstRender.current = false;
      return;
    }

    if (firstRender.current) return;

    gsap.fromTo(
      [h1Ref.current, imgref.current, cvButtonRef.current, aboutMeButtonRef.current],
      { opacity: 0, filter: "blur(10px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
      }
    );
  }, [showAbout]);

  return (
    <div className='App' ref={bgRef}>
      <div
        className='home-container'
        style={{ display: showAbout ? 'none' : 'block' }}
      >
        <h1 ref={h1Ref}>Yonna Klaassen</h1>
        <h3>
          <span ref={h3TextRef}></span>
          <span className='cursor'>|</span>
        </h3>
        <div className='container'>
          <img ref={imgref} className='pfp-round' src='me.jpg' alt='Yonna Klaassen'></img>
          <div className='buttons'>
            <button onClick={handleAboutClick} ref={aboutMeButtonRef} className='button'>
              About Me
            </button>
            <form method='get' action={'Yonna_Klaassen_CV.pdf'}>
              <button type='submit' ref={cvButtonRef} className='button'>
                View CV
              </button>
            </form>
          </div>
        </div>
      </div>

      <div
        className='about-container'
        ref={aboutContainerRef}
        style={{ display: showAbout ? 'block' : 'none' }}
      >
        <h1>About Me</h1>
        <img id="about-me-img" className="pfp-round" src="me-2.jpg" alt="Yonna Klaassen" />
        <div className="info-row">
          <span className='emoji'>✨</span>
          <p>
            <strong>Name: </strong>
            <strike> Zou</strike>
            <span className="highlight"> Yon</span>
            <strike>g</strike>
            <span className="highlight"> Na</span>
            <strike>n</strike>
            <span className="highlight"> Klaassen</span>
          </p>
        </div>
        <div className="info-row">
          <span className='emoji'>🎓</span>
          <p><strong>Degree:</strong> <a href='https://app.diplomasafe.com/en-US/certificates/d4ebf1fe3fba6ea19f96831c53f24c98351386c7f' target='_blank' rel="noreferrer"> MSc. in Computer Science and Engineering</a></p>
        </div>
        <div className="info-row">
          <span className='emoji'>💻</span>
          <p>
            <strong>Programming:</strong> Java, JavaScript/TypeScript, C#, Python, SQL, HTML, CSS
          </p>
        </div>
        <div className="info-row">
          <span className='emoji'>🛠️</span>
          <p>
            <strong>Frameworks:</strong> React, Angular, .NET, Unity, Spring Boot
          </p>
        </div>

        <div className="info-row">
          <span className='emoji'>☁️</span>
          <p>
            <strong>Tools & Platforms:</strong> Git, AWS, Azure, PostgreSQL, MSSQL, Apache Kafka, Android Studio, MATLAB
          </p>
        </div>

        <div className="info-row">
          <span className='emoji'>🌟</span>
          <p>
            <strong>Soft Skills:</strong> Eager to learn, Teamwork, Communication, Dependable, Critical Thinking, Time Management
          </p>
        </div>
        <div className="info-row">
          <span className='emoji'>🗣️</span>
          <div className="text">
            <p>
              <strong>Languages:</strong> Dutch, English, Danish </p>
          </div>
        </div>
        <div className="info-row">
          <span className='emoji'>❤️</span>
          <p><strong>Hobbies:</strong> 🧵👩🏻‍💻🧳🛹📺🎮💃🏽</p>
        </div>
        <div className='bottom-row'>
          <p id='connect'>Connect with me here - <a href="https://www.linkedin.com/in/yonna-klaassen" target='_blank' rel="noreferrer"><img className='socials-icon' src='linkedin-icon.png' alt='linkedin'></img></a></p>
          <button id="back-button" onClick={handleBackClick} className="button">Back</button>
        </div>
      </div>
    </div>
  );
}

export default App;
