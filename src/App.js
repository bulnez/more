import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Calendar />
    </div>
  );
}

export default App;
