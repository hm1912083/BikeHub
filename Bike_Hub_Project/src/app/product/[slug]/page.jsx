import AddToCartButton from "../AddToCart";
import prisma from "../../../lib/prisma";
const SingleProduct = async ({ params }) => {
  const slug = params.slug;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row" style={{ marginBottom: "3em", margingTop: "3em" }}>
          <div className="col-md-4 product-image">
            <div>
              <img
                src={`/images/${product.image}`}
                width="100%"
                height="100%"
                id="current-image"
                alt={product.name}
              />
            </div>
            <div className="image-thumbnails">
              {product.images &&
                product.images.length > 0 &&
                JSON.parse(product.images).map((image, index) => (
                  <div key={index}>
                    <img
                      src={`/images/${image.replace(".jpg", ".png")}`}
                      className="image-thumbnail"
                      alt={`Thumbnail ${index}`}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="product-details col-md-5 offset-md-1">
            <h2 className="lead" style={{ marginTop: "1em" }}>
              {product.name}
            </h2>
            <span className="badge" style={{ fontSize: "1em" }}>
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
            <p className="light-text">{product.details}</p>
            <h3 className="lead">{parseFloat(product.price).toFixed(2)} QAR</h3>
            <p
              className="light-text"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
