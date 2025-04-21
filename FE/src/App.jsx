import './App.css'
import AppRoutes from './routes';

function App() {
  
  const handleLogin = () => {
    // fetch('http://localhost:8080/login/oauth2/code/google')
    // .then(response => response.text())
    // .then(data => {
    //   console.log(data)
    // })
    // .catch(error => {
    //   console.log(error)
    // })
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }

  return (
    <>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" 
        className="logo" 
        alt="Google logo" 
        onClick={handleLogin} />
        <AppRoutes />
    </>
  )
}

export default App
