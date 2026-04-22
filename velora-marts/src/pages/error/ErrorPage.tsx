import Header from "../../components/Header"
import './ErrorPage.css'


const ErrorPage = ({carts}) => {

    return (
        <>

        <Header carts={carts} />

        <div className="error-page">
            <p className="error-number">404</p>
            <h1 className="error-text"> Sorry Page Not Found</h1>
        </div>
        
        </>
    )
}

export default ErrorPage