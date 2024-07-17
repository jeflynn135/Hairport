import React from 'react';
// import Reviews from './Reviews'

const Services = () => {
    const services = [
        { name: 'Wash and Style', duration: '45min', description: '$30', src: '/wash-2.jpg'},
        { name: 'Barber Cut/Pixie', duration: '30min', description: '$40', src: '/barber.jpg' },
        { name: 'Signature Cut (longer than a pixie)', duration: '45min', description: '$50', src: '/cut.jpg' },
        { name: 'Bang Trim', duration: '15min', description: '$20', src: '/bangs.jpg' },
        { name: 'Beard Trim', duration: '15min', description: '$20', src: '/beard-2.jpg' },
        { name: 'Children’s Cut (age 10 or younger)', duration: '30min', description: '$40', src: '/kids.jpg' },
        { name: 'Blonding', duration: '4hr', description: '$100+', src: '/blonde.jpg' },
        { name: 'Color', duration: '3hr', description: '$75+', src: '/long-cut.jpg' },
        { name: 'Root Retouch', duration: '2hr', description: '$50', src: '/root.jpg' },
        { name: 'Perm', duration: '1.5hr', description: '$75', src: '/perm-2.jpg' },
    ];

    return (
        <div>
            {/* <img src="/salon-banner.jpg" alt="salon pic" className='banner'/> */}
            <div className='banner'></div>
            <section className="services" role="region" aria-labelledby="services-heading">
                <h2 id="services-heading">Our Services</h2>
                <div className='row p-4'>
                    {services.map((service, index) => (
                        <div className="col-sm-12 col-md-6" key={index}>
                            {/* <span className="service-name">{service.name}</span> - 
            <span className="service-duration">{service.duration}</span> */}
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={service.src} className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{service.name}</h5>
                                            <p className="card-text">{service.description}</p>
                                            <p className="card-text"><small className="text-body-secondary">{service.duration}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
export default Services