import React from 'react';

const Contact = ({ contactData }) => {
  return (
    <section className="contact">
      <div className="section-container">
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <p>Feel free to reach out for collaborations or just a friendly hello!</p>
          <div className="contact-links">
            <a href={`mailto:${contactData.email}`} className="contact-link">
              📧 Email
            </a>
            <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="contact-link">
              💻 GitHub
            </a>
            <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
              💼 LinkedIn
            </a>
            <a href={contactData.twitter} target="_blank" rel="noopener noreferrer" className="contact-link">
              🐦 Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
