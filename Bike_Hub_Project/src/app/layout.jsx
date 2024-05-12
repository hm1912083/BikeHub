import Header from '../components/Header'
import Footer from '../components/Footer' 
import Styles from'../../public/css/app.css'
// import Styles from "@/public/css/app.css"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
