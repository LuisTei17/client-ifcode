import React from "react";
import Image from "next/image";

const Card = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar">
          <Image src="/icons/user.png" alt="Avatar" width={60} height={60} />
        </div>
        <span className="featured">♡ Featured</span>
      </div>

      <div className="card-tag">Medical Support</div>

      <h3 className="card-title">Medical Appointment Transport</h3>
      <p className="card-description">
        Need a ride to your doctor's appointment? I provide safe, reliable transportation to medical
        appointments.
      </p>

      <div className="card-info">
        <p><strong>Linda Martinez</strong> (52)</p>
        <p>City-wide</p>
        <p>Monday-Friday 8AM-4PM</p>
      </div>

      <button className="card-btn">
        <Image src="/icons/phone.png" alt="Phone" width={16} height={16} /> Get in Touch
      </button>
    </div>
  );
};

export default Card;
