<script>
  import ControlPanel from './components/ControlPanel.svelte';
  import CleaningStatus from './components/CleaningStatus.svelte';
  import BatteryHealth from './components/BatteryHealth.svelte';
  import Schedule from './components/Schedule.svelte';
  import History from './components/History.svelte';

  // Mop status and properties
  let mopStatus = 'Idle';
  let batteryLevel = 100;
  let cleaningMode = 'Normal';
  let progress = 0;
  let waterTankLevel = 'Full';

  // Toggle Mop Start/Stop
  function toggleMopStatus() {
    if (mopStatus === 'Idle') {
      mopStatus = 'Cleaning';
      progress = 0; // Reset progress
    } else {
      mopStatus = 'Idle';
    }
  }

  // Toggle Battery Status
  function toggleBatteryLevel() {
    batteryLevel = batteryLevel === 100 ? 20 : 100; // Simulate low/full battery
  }

  // Toggle Water Tank Status
  function toggleWaterTankLevel() {
    waterTankLevel = waterTankLevel === 'Full' ? 'Empty' : 'Full'; // Simulate empty/full tank
  }

  // Toggle Cleaning Mode
  function toggleCleaningMode() {
    cleaningMode = cleaningMode === 'Normal' ? 'Deep Clean' : 'Normal'; // Switch between modes
  }
</script>

<!-- Page container with centered heading -->
<div class="page-container">
  <!-- Heading for Smart Mop -->
  <header class="heading">
    <h1>Smart Mop</h1>
  </header>

  <div class="grid-container">
    <!-- Surrounding Tiles -->
    <div class="tile">
      <CleaningStatus {mopStatus} {progress} {waterTankLevel} />
    </div>
    <div class="tile">
      <BatteryHealth {batteryLevel} />
    </div>
    <div class="tile">
      <Schedule />
    </div>
    <div class="tile">
      <History />
    </div>

    <!-- Central Control Tile -->
    <div class="tile">
      <ControlPanel 
        {cleaningMode} 
        {mopStatus} 
        on:toggleStartStop={toggleMopStatus}
        on:changeMode={toggleCleaningMode}
      />
    </div>
    
    <!-- Bottom-right buttons for simulating actions -->
    <div class="simulation-buttons">
      <button on:click={toggleMopStatus}>
        {mopStatus === 'Idle' ? 'Start Cleaning' : 'Stop Cleaning'}
      </button>
      <button on:click={toggleWaterTankLevel}>
        {waterTankLevel === 'Full' ? 'Empty Water Tank' : 'Fill Water Tank'}
      </button>
      <button on:click={toggleBatteryLevel}>
        {batteryLevel === 100 ? 'Low Battery' : 'Full Battery'}
      </button>
      <button on:click={toggleCleaningMode}>
        {cleaningMode === 'Normal' ? 'Switch to Deep Clean' : 'Switch to Normal Mode'}
      </button>
    </div>
  </div>
</div>

<style>
  /* Page container that holds everything */
  .page-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #f5f5f5;
    padding-top: 20px;
  }

  /* Heading styles */
  .heading {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }

  .heading h1 {
    font-size: 3rem;
    color: #333;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
  }

  /* Grid container covering full screen with equal column width */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Three equal-width columns */
    gap: 20px;
    height: auto;
    padding: 20px;
    width: 80vw;
    justify-items: center;
    align-items: start;
  }

  /* Tile Styles */
  .tile {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    width: 100%; /* Each tile will take the full width of its column */
    max-width: 300px; /* Max width to ensure it doesn't stretch too much */
    height: auto; /* Height will adjust based on content */
  }

  .tile:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  /* Bottom-right simulation buttons */
  .simulation-buttons {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .simulation-buttons button {
    padding: 10px 15px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .simulation-buttons button:hover {
    background-color: #0056b3;
  }
</style>
