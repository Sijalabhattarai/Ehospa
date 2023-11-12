import React from 'react';
import Navbar from '../components/Navbar';
import "public/styles/globals.css";

const AboutPage = () => {
  return (
    <div>


      <div className="instructions">
        <div className="cover">
          <div className="details">
            <h1 style={{ color: 'red' }}>About Us</h1>
            <p>Welcome to EHospa, a leading healthcare provider committed to delivering excellent medical services. Our state-of-the-art facility is equipped with advanced technology and staffed by a team of dedicated professionals, including doctors, nurses, and support staff. We strive to provide personalized care and ensure the well-being of our patients.</p>
          </div>
        </div>
        <h2>How It Works</h2>
        <li>Explore the various features and functionalities available:</li>
        <ul>
          <li>Appointments: Use our AI-powered system to schedule appointments with doctors of your choice.</li>
          <li>Reports: Access your medical reports online, securely stored in your account.</li>
          <li>Queue Management: Get real-time updates on your appointment queue status and estimated waiting time.</li>
        </ul>
        <li>To schedule an appointment:</li>
        <ul>
          <li>Click on the "Appointments" section and provide the necessary details.</li>
          <li>Our AI system will suggest available time slots based on your preferences and the doctor's availability.</li>
          <li>Select your preferred date and time, and confirm your appointment.</li>
        </ul>
        <li>For accessing reports:</li>
        <ul>
          <li>Go to the "Reports" section and log in to your account.</li>
          <li>You will find a list of your available reports that you can view or download.</li>
        </ul>
        <li>For queue management:</li>
        <ul>
          <li>Check the "Queue Management" section to see your current position in the queue and estimated waiting time.</li>
          <li>Receive notifications when your turn is approaching or if there are any changes in the schedule.</li>
        </ul>
        <li>If you have any questions or need assistance, feel free to contact our customer support team via the provided contact information.</li>
      </div>
    </div>
  );
};

export default AboutPage;
