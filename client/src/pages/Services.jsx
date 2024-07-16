import React from 'react';
import Reviews from './Reviews';

const Services = () => {
  const services = [
    { name: 'Wash and Style', duration: '45min' },
    { name: 'Barber Cut/Pixie', duration: '30min' },
    { name: 'Signature Cut (hair longer than a pixie)', duration: '45min' },
    { name: 'Bang Trim', duration: '15min' },
    { name: 'Beard Trim', duration: '15min' },
    { name: 'Children’s Cut (age 10 or younger)', duration: '30min' },
    { name: 'Blonding', duration: '4hr' },
    { name: 'Color', duration: '3hr' },
    { name: 'Root Retouch', duration: '2hr' },
  ];

  return (
    <div>
    <section className="services" role="region" aria-labelledby="services-heading">
      <h2 id="services-heading">Our Services</h2>
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            <span className="service-name">{service.name}</span> - 
            <span className="service-duration">{service.duration}</span>
          </li>
        ))}
      </ul>
    </section>
    <Reviews /> {/*reviews component*/}
    </div>
  );
}
export default Services