import React from 'react';

const Hero = ({ personalInfo }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Welcome to my portfolio</h2>
        <p>{personalInfo.summary}</p>
      </div>
    </section>
  );
};

export default Hero;
