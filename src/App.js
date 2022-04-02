import "./App.css";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  let Component = OrderSummary; // default to order page
  return (
    <div className="App">
      <Component />
    </div>
  );
}

export default App;
