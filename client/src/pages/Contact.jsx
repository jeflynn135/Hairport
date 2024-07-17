function Contact() {
  // Replace links with social media profiles
  const iconsJ = [
    {
      name: "fa-solid fa-envelope",
      link: "mailto:jenna@gmail.com",
    },
    {
      name: "fa-solid fa-phone",
      link: "tel:+09289193051",
    },
  ];

  const iconsC = [
    {
      name: "fa-solid fa-envelope",
      link: "mailto:casi@gmail.com",
    },
    {
      name: "fa-solid fa-phone",
      link: "tel:+09289193051",
    },
  ];
  const iconsE = [
    {
      name: "fa-solid fa-envelope",
      link: "mailto:eduardo@gmail.com",
    },
    {
      name: "fa-solid fa-phone",
      link: "tel:+09289193051",
    },
  ];

  return (
    <div className="contact-main">
      <div className="contact-card">
        <h1>Jenna</h1>
        <h5>Specializes in blonding and color.</h5>
        <p>Available Mon-Thurs 7:00AM-3:00PM</p>
        <p>Email: jenna@gmail.com</p>
        <p>Phone: 3456789456</p>
        <div className="icon">
          {iconsJ.map((iconJ) => (
            <a
              href={iconJ.link}
              key={iconJ.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={iconJ.name}></i>
            </a>
          ))}
        </div>
      </div>
      <div className="contact-card">
        <h1>Casi</h1>
        <h5>Specializes cuts longer than Barber/Pixie.</h5>
        <p>Available Sun-Wed 10:00AM-6:00PM</p>
        <p>Email: casi@gmail.com</p>
        <p>Phone: 3456789456</p>
       
        <div className="icon">
          {iconsC.map((iconC) => (
            <a
              href={iconC.link}
              key={iconC.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={iconC.name}></i>
            </a>
          ))}
        </div>
      </div>
      <div className="contact-card">
        <h1>Eduardo</h1>
        <h5>Specializes in barber cuts.</h5>
        <p>Available Wed-Sat 9:00AM-5:00PM</p>
        <p>Email: eduardo@gmail.com</p>
        <p>Phone: 3456789456</p>
        <div className="icon">
          {iconsE.map((iconE) => (
            <a
              href={iconE.link}
              key={iconE.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={iconE.name}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
