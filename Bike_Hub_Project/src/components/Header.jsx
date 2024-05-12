"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    console.log("Header", pathname);
    if (pathname == "/dashboard" || pathname == "/products" || pathname == "/orders") {
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" style={{ background: 'linear-gradient(160deg, rgba(0, 0, 0, 1) 44%, rgba(112, 0, 0, 1) 100%)' }}>
            <div className="container">
                <Link href="/" className="navbar-brand">
                    BIKEHUB
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Placeholder for other navigation links */}
                </div>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link href="/cart" className="nav-link btn btn-light text-dark px-4 ml-2">
                            CART
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
        );
    }
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" style={{ background: 'linear-gradient(160deg, rgba(0, 0, 0, 1) 44%, rgba(112, 0, 0, 1) 100%)' }}>
            <div className="container">
                <Link href="/" className="navbar-brand">
                    BIKEHUB
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Placeholder for other navigation links */}
                </div>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link href="/login" className="nav-link btn btn-light text-dark px-4">
                            Login
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link href="/register" className="nav-link btn btn-light text-dark px-4 ml-2">
                            Register
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link href="/cart" className="nav-link btn btn-light text-dark px-4 ml-2">
                            CART
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
