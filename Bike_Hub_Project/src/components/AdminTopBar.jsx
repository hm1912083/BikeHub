'use client'
 
import { usePathname, useRouter } from 'next/navigation'
import Link from "next/link";

function AdminTopBar() {
  const pathname = usePathname()
  const router = useRouter();
  console.log("Admin Top Bar",pathname)

  const logout = async () => {
    try {
      localStorage.removeItem("authenticatedUser");
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="btn-group mb-5" role="group">
      <Link href="/dashboard">
        <span className={`btn btn-outline-dark ${pathname == "/dashboard" ? "active" : ""}`}>
          <i className="fa fa-home"></i> Home
        </span>
      </Link>
      <Link href="/products">
        <span className={`btn btn-outline-dark ${pathname == "/products" ? "active" : ""}`}>
          <i className="fa fa-gift"></i> Products
        </span>
      </Link>
      <Link href="/orders">
        <span className={`btn btn-outline-dark ${pathname == "/orders" ? "active" : ""}`}>
          <i className="fa fa-first-order"></i> Orders
        </span>
      </Link>
      <span onClick={logout} className="btn btn-outline-dark">
        <i className="fa fa-sign-out"></i> Logout
      </span>
    </div>
  );
}

export default AdminTopBar;
