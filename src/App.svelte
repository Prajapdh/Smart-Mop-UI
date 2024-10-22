<script>
  import { faPlay, faPause, faStop, faBatteryFull, faWater, faSync, faMapMarkerAlt, faTachometerAlt, faExclamationCircle, faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  let mopStatus = 'Idle';
  let batteryLevel = 100;
  let waterTankLevel = 'Full';
  let cleaningSolutionLevel = 'Full';
  let currentLocation = 'Living Room';
  let cleaningSpeed = 'Medium';
  let cleaningMode = 'Normal';
  let alerts = [];

  function toggleMopStatus() {
    mopStatus = mopStatus === 'Idle' ? 'Cleaning' : 'Idle';
  }

  function simulateAlert(alert) {
    alerts = [...alerts, alert];
  }
</script>

<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1e1e2f;
    color: white;
    padding: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .app-title {
    font-size: 24px;
    font-weight: bold;
  }

  .user-options {
    display: flex;
    align-items: center;
  }

  .user-options span {
    margin-left: 20px;
    cursor: pointer;
    font-size: 16px;
  }

  .tiles-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 20px;
    padding: 20px;
  }

  .tile {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .cleaning-controls {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cleaning-controls img {
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
  }

  .tile button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .tile button:hover {
    background-color: #0056b3;
  }
</style>

<div class="top-bar">
  <div class="app-title">SmartMop</div>
  <div class="user-options">
    <span>User Profile</span>
    <span>Settings</span>
    <span>Logout</span>
  </div>
</div>

<div class="tiles-container">
  <div class="tile">
    <h3>Navigation</h3>
    <button>Room Selection</button>
    <button>Define Custom Area</button>
    <div>
      <p>Manual Directional Control:</p>
      <button><FontAwesomeIcon icon={faArrowUp} /></button>
      <div>
        <button><FontAwesomeIcon icon={faArrowLeft} /></button>
        <button><FontAwesomeIcon icon={faArrowRight} /></button>
      </div>
      <button><FontAwesomeIcon icon={faArrowDown} /></button>
    </div>
    <button on:click={() => mopStatus = 'Returning to Dock'}>Return to Charging Dock</button>
  </div>
  <div class="tile cleaning-controls">
    <img src="./public/SmartMop.png" alt="Smart Mop Image">
    <h3>Cleaning Controls</h3>
    <button on:click={() => mopStatus = 'Cleaning'}>Start Cleaning</button>
    <button on:click={() => mopStatus = 'Paused'}>Pause Cleaning</button>
    <button on:click={() => mopStatus = 'Idle'}>Stop Cleaning</button>
    <p>Select Cleaning Mode:</p>
    <select bind:value={cleaningMode}>
      <option value="Quick">Quick</option>
      <option value="Deep">Deep</option>
      <option value="Spot">Spot</option>
    </select>
    <p>Adjust Water Flow Rate:</p>
    <input type="range" min="1" max="5" step="1">
    <p>Set Cleaning Solution Concentration:</p>
    <input type="range" min="1" max="5" step="1">
    <p>Control Mop Head Rotation Speed:</p>
    <input type="range" min="1" max="5" step="1">
  </div>
  <div class="tile">
    <h3>Scheduling</h3>
    <button>Set Recurring Schedule</button>
    <button>One-Time Scheduled Cleaning</button>
    <p>Upcoming Scheduled Cleans:</p>
    <ul>
      <li>Tomorrow at 10 AM</li>
      <li>Friday at 2 PM</li>
    </ul>
  </div>
  <div class="tile">
    <h3>Status and Monitoring</h3>
    <p><FontAwesomeIcon icon={faBatteryFull} /> Battery Level: {batteryLevel}%</p>
    <p><FontAwesomeIcon icon={faWater} /> Water Tank Level: {waterTankLevel}</p>
    <p>Cleaning Solution Level: {cleaningSolutionLevel}</p>
    <p>Cleaning Progress: 50%</p>
    <p>Estimated Time to Completion: 30 mins</p>
  </div>
  <div class="tile">
    <h3>Maintenance</h3>
    <p>Filter Replacement Reminder</p>
    <p>Mop Pad Replacement Alert</p>
    <button on:click={() => simulateAlert('Filter Replacement Needed')}>Simulate Filter Replacement Alert</button>
    <button on:click={() => simulateAlert('Mop Pad Replacement Needed')}>Simulate Mop Pad Replacement Alert</button>
    <button>Self-Diagnosis Report</button>
    <button>Cleaning History Log</button>
  </div>
  <div class="tile">
    <h3>Performance Analytics</h3>
    <p>Area Cleaned: 200 sq ft</p>
    <p>Energy Consumption: 50 Wh</p>
    <p>Water Usage: 10 L</p>
    <p>Cleaning Efficiency: 90%</p>
  </div>
</div>
