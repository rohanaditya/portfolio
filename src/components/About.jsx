import React from 'react';

const About = ({ aboutData }) => {
  return (
    <section className="about">
      <div className="section-container">
        <h2>About Me</h2>
        <p>{aboutData.description}</p>
      </div>
    </section>
  );
};

export default About;
