import ImgForm from './ImgForm';
import './App.css';
import ImgTest from './ImgTest';

function App() {
  return (
    <>
      <div className='App'>
        <h1 className='title'>SSD Web App</h1>
        <div className='card'>
          <ImgForm />
        </div>
      </div>
      <footer>
        <p className='credit'>Created by Chihiro & Justin Snider @2023</p>
      </footer>
    </>
  );
}

export default App;
