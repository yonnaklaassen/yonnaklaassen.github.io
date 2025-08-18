import './App.css';
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function App() {
  const bgRef = useRef(null);
  const h3TextRef = useRef(null);
  const h1Ref = useRef(null);
  const imgref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const colors = [
      'linear-gradient(270deg, #ff6eb4, #9b59b6)',
      'linear-gradient(270deg, #8e44ad, #3498db)',
      'linear-gradient(270deg, #d291bc, #7f8cdb)',
      'linear-gradient(270deg, #5dade2, #bb8fce)',
    ];

    let index = 0;
    const duration = 8;

    function animateGradient() {
      index = (index + 1) % colors.length;
      gsap.to(bgRef.current, {
        background: colors[index],
        duration,
        ease: 'power1.inOut',
        onComplete: animateGradient,
      });
    }

    gsap.set(bgRef.current, { background: colors[0] });
    animateGradient();

    gsap.fromTo(h1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 });

    gsap.fromTo(imgref.current, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 2.5, delay: 2});
    gsap.fromTo(imgref.current, {xPercent: 50}, {xPercent: -40, duration: 2, delay: 4});

    gsap.fromTo(buttonRef.current, { opacity: 0}, { opacity: 1, duration: 0.9, delay: 5.5 });

    const text = "Software Engineer";
    const h3Text = h3TextRef.current;
    h3Text.textContent = '';

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    for (let i = 0; i <= text.length; i++) {
      tl.to(h3Text, {
        duration: 0.1,
        textContent: text.slice(0, i),
        ease: "none",
      });
    }

    tl.to({}, { duration: 2 }); // Pause before deleting

    for (let i = text.length; i >= 0; i--) {
      tl.to(h3Text, {
        duration: 0.05,
        textContent: text.slice(0, i),
        ease: "none",
      });
    }

    tl.to({}, { duration: 0.5 });

    return () => {
      gsap.killTweensOf(bgRef.current);
      gsap.killTweensOf(h3Text);
      tl.kill();
    };
  }, []);

  return (
    <div className='App' ref={bgRef}>
      <h1 ref={h1Ref}>Yonna Klaassen</h1>
      <h3>
        <span ref={h3TextRef}></span>
        <span className='cursor'>|</span>
      </h3>
      <div className='container'>
      <img ref={imgref} id='pfp' src='me.jpg' alt='Yonna Klaassen'></img>
      <form method='get' action={'Yonna_Klaassen_CV.pdf'}>
          <button type='submit' ref={buttonRef} className='button'>View CV</button>
      </form>
      </div>
    </div>
  );
}

export default App;
