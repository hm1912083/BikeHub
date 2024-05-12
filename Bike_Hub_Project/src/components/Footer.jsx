const Footer = () => {
  return (
    <footer className="bg-dark" style={{ background: 'linear-gradient(160deg, rgba(0, 0, 0, 1) 44%, rgba(112, 0, 0, 1) 100%)' }}>
      <div className="container">
        <div className="footer">
          <div className="row">
            <div className="col-md-10">
              <h2 className="footer-link">BIKEHUB</h2><br />
              <h3>Pedal into Adventure: Welcome to BikeHub!</h3>
              <p>At BikeHub, we're more than just an online store; we're a community of passionate cyclists dedicated to fueling your adventures on two wheels. From sleek road bikes to rugged mountain rides, find your perfect match and gear up for your next journey.</p>
            </div>
            <div className="col-md-2">
              <a href="/" className="nav-link text-white font-weight-bold"><i className="fa fa-home"></i> Home</a>
              <a href="about-us" className="nav-link text-white font-weight-bold"><i className="fa fa-info"></i> About Us</a>
              <a href="contact-us" className="nav-link text-white font-weight-bold"><i className="fa fa-envelope"></i> Contact Us</a>
            </div>
          </div>
        </div>
        <p className="text-center">© 2024 BIKES | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
