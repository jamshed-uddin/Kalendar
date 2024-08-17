import { PlusIcon } from "@heroicons/react/24/outline";
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

      <div className="add-event-btn">
        <button>
          <PlusIcon
            style={{ width: "2.4rem", height: "2.4rem", color: "blue" }}
          />
        </button>
      </div>
    </div>
  );
}

export default App;
