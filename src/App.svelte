<script>
  import { onMount } from 'svelte';
  import { faPlay, faPause, faStop, faBatteryFull, faWater, faSync, faMapMarkerAlt, faTachometerAlt, faExclamationCircle, faHome, faSun, faMoon,faRobot, faRedo } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  let mopStatus = 'Idle';
  let batteryLevel = Math.floor(Math.random() * 51) + 50;
  let waterTankLevelPercentage = Math.floor(Math.random() * 51) + 25;
  let cleaningSolutionLevelPercentage = Math.floor(Math.random() * 41) + 60;
  let currentLocation = 'Living Room';
  let cleaningSpeed = 'Medium';
  let cleaningMode = 'Normal';
  let cleaningProgress = Math.floor(Math.random() * 31) + 20;
  let estimatedTime = Math.floor(Math.random() * 21) + 10;
  let alerts = [];
  let isDarkMode = false;
  let showDeviceInfo = false;
  let showSupportInfo = false;
  let rooms = ['Dock', 'Main Bedroom', 'Guest Bedroom', 'Living Room', 'Kitchen'];
  let currentRoomIndex = 0;
  let floorPlans = [
    { name: 'Docked', url: '../public/DockFloorPlan.png' },
    { name: 'In Main Bedroom', url: '../public/Bed1FloorPlan.png' },
    { name: 'In Guest Bedroom', url: '../public/Bed2FloorPlan.png' },
    { name: 'In Living Room', url: '../public/LivingFloorPlan.png' },
    { name: 'In Kitchen', url: '../public/KitchenFloorPlan.png' },
  ];
  let currentFloorPlanIndex = 0;

  function toggleMopStatus() {
      mopStatus = mopStatus === 'Idle' ? 'Cleaning' : 'Idle';
    }

  function toggleMonitoringStatus() {
    if (mopStatus === 'Cleaning' && batteryLevel > 0) {
          cleaningProgress = Math.min(cleaningProgress + 1, 100);
          batteryLevel = Math.max(batteryLevel - 1, 0);
          estimatedTime = Math.max(estimatedTime - 1, 0);
          waterTankLevelPercentage = Math.max(waterTankLevelPercentage - 0.5, 0);
          cleaningSolutionLevelPercentage = Math.max(cleaningSolutionLevelPercentage - 0.3, 0);
        }
    else if(mopStatus === 'Idle'){
      cleaningProgress = 0;
          batteryLevel = 100;
          estimatedTime = 2;
          waterTankLevelPercentage = 100;
          cleaningSolutionLevelPercentage = 100;
    }
  }

  function simulateAlert(alert) {
    alerts = [...alerts, alert];
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
  }

  function toggleDeviceInfo() {
      showDeviceInfo = !showDeviceInfo;
    }
  
  function toggleSupportInfo() {
    showSupportInfo = !showSupportInfo;
  }

  function returnToDock() {
    mopStatus = 'Returning to Dock';
    currentRoomIndex = 0;
    currentLocation = rooms[currentRoomIndex];
    currentFloorPlanIndex = 0;
    alert('SmartMop is returning to the charging dock.');
  }

  function cycleRooms() {
    currentRoomIndex = (currentRoomIndex + 1) % rooms.length;
    currentLocation = rooms[currentRoomIndex];
    currentFloorPlanIndex = (currentFloorPlanIndex + 1) % floorPlans.length;
  }

  onMount(() => {
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDarkMode = true;
      document.documentElement.classList.add('dark');
    } else {
      isDarkMode = false;
      document.documentElement.classList.remove('dark');
    }

    const interval = setInterval(() => {
      toggleMonitoringStatus();
      cycleRooms();
    }, 10000);

    return () => clearInterval(interval);
  });
</script>



<div id="wrapper" class="p-0 m-0 pb-10 w-screen h-screen overflow-x-hidden bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans">
  <div class="top-bar sticky top-0 w-full bg-secondary text-white flex justify-between items-center p-4 shadow-lg">
    <div class="app-title text-2xl font-bold font-heading">SmartMop</div>
    <div class="user-options flex space-x-6 items-center">
      <button on:click={toggleTheme} class="text-white hover:text-accent">
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </button>
      <span class="cursor-pointer">User Profile</span>
      <span class="cursor-pointer">Settings</span>
      <span class="cursor-pointer">Logout</span>
      <span class="info-button" on:click={toggleDeviceInfo}>Device Information</span>
      <span class="support-button" on:click={toggleSupportInfo}>Support</span>
    </div>
  </div>
  
  <!-- Device Information Modal -->
  {#if showDeviceInfo}
    <div class="overlay" on:click={toggleDeviceInfo}></div>
    <div class="info-modal">
      <h3>Device Information</h3>
      <p><strong>Device:</strong> SmartMop Intelligent Cleaner</p>
      <p><strong>Model Number:</strong> AAXNN2342</p>
      <p><strong>Battery Level:</strong> {batteryLevel}%</p>
      <p><strong>Water Tank Level:</strong> {waterTankLevelPercentage}%</p>
      <p><strong>Cleaning Solution Level:</strong> {cleaningSolutionLevelPercentage}%</p>
      <p><strong>Current Location:</strong> {currentLocation}</p>
      <button class="close-button" on:click={toggleDeviceInfo}>Close</button>
    </div>
  {/if}
  
  <!-- Support Information Modal -->
  {#if showSupportInfo}
    <div class="overlay" on:click={toggleSupportInfo}></div>
    <div class="support-modal">
      <h3>Support Information</h3>
      <p>If you need help or have any questions regarding the SmartMop, please refer to the user manual or contact our support team.</p>
      <p><strong>Support Contact:</strong> support@smartmop.com</p>
      <p><strong>Phone Number:</strong> +1-800-123-4567</p>
      <p><strong>Operating Hours:</strong> Mon-Fri, 9 AM - 5 PM EST</p>
      <button class="close-button-support" on:click={toggleSupportInfo}>Close</button>
    </div>
  {/if}

  <!-- Tiles Container -->
  <div class="tiles-container grid grid-cols-3 gap-6 p-6 w-full h-full">
    <!-- Navigation Tile -->
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4 font-heading">Navigation</h3>
      <p class="mb-4">Current Location: {currentLocation}</p>
      <button class="bg-primary text-white py-2 px-4 rounded mb-4 hover:bg-primary-dark w-full" on:click={returnToDock}>
        Return to Charging Dock
      </button>
      <div class="mb-4">
        <h4 class="font-semibold mb-2">Floor Plan</h4>
        <img 
      src={floorPlans[currentFloorPlanIndex].url} 
      alt={floorPlans[currentFloorPlanIndex].name} 
      class="object-contain rounded-lg border-2 border-primary"
    >
        <p class="mt-2 text-center">{floorPlans[currentFloorPlanIndex].name}</p>
      </div>
    </div>
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md col-span-1 row-span-2 flex flex-col items-center">
      <img src="../public/SmartMop.png" alt="Smart Mop Image" class="w-full max-w-xs mb-6">
      <h3 class="text-xl font-semibold mb-4 font-heading">Cleaning Controls</h3>
      <button class="bg-primary text-white py-2 px-4 rounded mb-2 hover:bg-primary-dark" on:click={() => mopStatus = 'Cleaning'}>Start Cleaning</button>
      <button class="bg-primary text-white py-2 px-4 rounded mb-2 hover:bg-primary-dark" on:click={() => mopStatus = 'Paused'}>Pause Cleaning</button>
      <button class="bg-primary text-white py-2 px-4 rounded mb-4 hover:bg-primary-dark" on:click={() => mopStatus = 'Idle'}>Stop Cleaning</button>
      <p class="mb-2">Select Cleaning Mode:</p>
      <select bind:value={cleaningMode} class="border rounded p-2 mb-4 bg-white dark:bg-secondary-light text-text-light dark:text-text-dark">
        <option value="Quick">Quick</option>
        <option value="Deep">Deep</option>
        <option value="Spot">Spot</option>
      </select>
      <p class="mb-2">Adjust Water Flow Rate:</p>
      <input type="range" min="1" max="5" step="1" class="mb-4 w-full">
      <p class="mb-2">Set Cleaning Solution Concentration:</p>
      <input type="range" min="1" max="5" step="1" class="mb-4 w-full">
      <p class="mb-2">Control Mop Head Rotation Speed:</p>
      <input type="range" min="1" max="5" step="1" class="mb-4 w-full">
    </div>
  
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4 font-heading">Scheduling</h3>
      <button class="bg-primary text-white py-2 px-4 rounded mb-2 hover:bg-primary-dark">Set Recurring Schedule</button>
      <button class="bg-primary text-white py-2 px-4 rounded mb-4 hover:bg-primary-dark">One-Time Scheduled Cleaning</button>
      <p class="mb-4">Upcoming Scheduled Cleans:</p>
      <ul class="list-disc list-inside">
        <li>Tomorrow at 10 AM</li>
        <li>Friday at 2 PM</li>
      </ul>
    </div>
  
    <!-- Status and Monitoring Tile -->
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4 font-heading text-gray-800 dark:text-gray-200">Status and Monitoring</h3>
      
      <p class="mb-2 text-gray-700 dark:text-gray-300"><strong>Battery Level: {batteryLevel}%</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
        <div class="bg-green-500 h-4 rounded-full" style="width: {batteryLevel}%"></div>
      </div>
      
      <p class="mb-2 text-gray-700 dark:text-gray-300"><strong>Water Tank Level: {waterTankLevelPercentage}%</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
        <div class="bg-blue-500 h-4 rounded-full" style="width: {waterTankLevelPercentage}%"></div>
      </div>
      
      <p class="mb-2 text-gray-700 dark:text-gray-300"><strong>Cleaning Solution Level: {cleaningSolutionLevelPercentage}%</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
        <div class="bg-purple-500 h-4 rounded-full" style="width: {cleaningSolutionLevelPercentage}%"></div>
      </div>
      
      <p class="mb-2 text-gray-700 dark:text-gray-300"><strong>Cleaning Progress: {cleaningProgress}%</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
        <div class="bg-yellow-500 h-4 rounded-full" style="width: {cleaningProgress}%"></div>
      </div>
      
      <p class="mt-4 mb-2 text-gray-700 dark:text-gray-300"><strong>Estimated Time to Completion: {estimatedTime} mins</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
        <div class="bg-red-500 h-4 rounded-full" style="width: {100 - (estimatedTime / 30) * 100}%"></div>
      </div>
    </div>

  
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4 font-heading">Maintenance</h3>
      <p class="mb-2">Filter Replacement Reminder</p>
      <p class="mb-2">Mop Pad Replacement Alert</p>
      <button class="bg-primary text-white py-2 px-4 rounded mb-2 hover:bg-primary-dark" on:click={() => simulateAlert('Filter Replacement Needed')}>Simulate Filter Replacement Alert</button>
      <button class="bg-primary text-white py-2 px-4 rounded mb-4 hover:bg-primary-dark" on:click={() => simulateAlert('Mop Pad Replacement Needed')}>Simulate Mop Pad Replacement Alert</button>
      <button class="bg-primary text-white py-2 px-4 rounded mb-2 hover:bg-primary-dark">Self-Diagnosis Report</button>
      <button class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">Cleaning History Log</button>
    </div>
  
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4 font-heading">Performance Analytics</h3>
      <p class="mb-2">Area Cleaned: 200 sq ft</p>
      <p class="mb-2">Energy Consumption: 50 Wh</p>
      <p class="mb-2">Water Usage: 10 L</p>
      <p>Cleaning Efficiency: 90%</p>
    </div>
  </div>
</div>

<style global>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap');

  :root {
    font-family: 'Inter', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }

  /* Dhruv's styles */
  .info-button {
    color: white;
    cursor: pointer;
  }
  .support-button {
    color: white;
    cursor: pointer;
  }
  .info-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 500px;
    z-index: 10;
  }
  .support-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 500px;
    z-index: 10;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
  }
  .close-button,
  .close-button-support {
    margin-top: 20px;
    background-color: #4B5563;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  .progress-bar {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    height: 20px;
    margin-top: 10px;
  }
  .progress {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.5s ease;
  }
  .status-indicator {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    background-color: #f59e0b;
    color: white;
    font-weight: bold;
  }
  .control-button {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    margin: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .start-button {
    background-color: #22c55e;
    color: white;
  }
  .pause-button {
    background-color: #fbbf24;
    color: black;
  }
  .stop-button {
    background-color: #ef4444;
    color: white;
  }
  .control-button:hover {
    opacity: 0.9;
  }
  .direction-button {
    background-color: #e5e7eb;
    padding: 20px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .direction-button:hover {
    background-color: #d1d5db;
  }
  .mode-button {
    background-color: #f3f4f6;
    color: #111827;
    padding: 12px 24px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .mode-button:hover {
    background-color: #e5e7eb;
  }
/* Dhruv styles end */
</style>