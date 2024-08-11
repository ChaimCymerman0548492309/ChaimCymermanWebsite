import ReactDOM from 'react-dom/client'; // Make sure to import from 'react-dom/client'
import App from './App';
import App2 from './App2';


const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <>
  <div >
    <div >
      <App />
    </div>
    <div >
      <App2 />
    </div>
  </div>
</>
);
