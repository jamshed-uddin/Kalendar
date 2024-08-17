import "./App.css";
import Calendar from "./components/Calendar";
import Events from "./components/Events";

function App() {
  return (
    <div className="container">
      {/* calendar and event container */}
      <div className="cal-event-container">
        {/* calendar */}
        <div className="calendar">
          <Calendar />
        </div>
        {/* events */}
        <div className="events">
          <Events />
        </div>
      </div>
    </div>
  );
}

export default App;
