import prisma from "../../lib/prisma"

export default async function Home() {
  const products = await prisma.product.findMany()
  return (
    <>
    <div className="hero-image">
        <div className="hero-content">
            <div className="col-md-4 hero-text">
                <h3>
                    Pedal into Adventure: Welcome to BikeHub!
                </h3>
                <p>At BikeHub, we're more than just an online store; we're a community of passionate cyclists dedicated to fueling your adventures on two wheels. From sleek road bikes to rugged mountain rides, find your perfect match and gear up for your next journey.</p>
                <button className="btn btn-dark custom-border my-2 my-sm-0">Shop</button>
                <button className="btn btn-dark custom-border my-2 my-sm-0">Contact Us</button>
            </div>
        </div>
    </div>


    <div className="container">
      <div className="content-head">
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Bikes Collection</h2>
        <p style={{ textAlign: "center" }}>
          At BikeHub, we're more than just an online store; we're a community of passionate cyclists dedicated to fueling your adventures on two wheels. From sleek road bikes to rugged mountain rides, find your perfect match and gear up for your next journey.
        </p>
      </div>
      <h2 className="header text-center">Featured Products</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-6 col-sm-12 col-lg-4 product">
            <a href={`/product/${product.slug}`} className="custom-card">
              <div className="card view overlay zoom">
                <img src={`../../images/${product.image}`} className="card-img-top img-fluid" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{product.name}<span className="float-right">{product.price} QAR</span></h5>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
