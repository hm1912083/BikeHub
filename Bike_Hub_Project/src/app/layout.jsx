import Header from '../components/Header'
import Footer from '../components/Footer' 
import '../../public/css/App.css'

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
