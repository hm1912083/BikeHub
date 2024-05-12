"use client"
import axios from "axios";

const AddToCartButton = ({ product }) => {

  const handleAddToCart = async () => {
    try {
      const { data } = await axios.post('/api/product/cart', {
        product_id: product.id,
        name: product.name,
        price: product.price,
        slug: product.slug,
        image: product.image,
        quantity: 1
      });
      alert("Item added to cart successfully");
    } catch (error) { 
      if(error.response.status==409)
      alert(error.response.data.message)
      console.error('Error adding to cart:', error.response?.data?.message || error.message);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      type="submit"
      className="btn rounded custom-border-n"
      disabled={product.quantity <= 0}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
