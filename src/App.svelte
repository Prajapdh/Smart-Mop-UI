<script>
  import { onMount } from 'svelte';
  import { faPlay, faPause, faStop, faBatteryFull, faWater, faSync, faMapMarkerAlt, faTachometerAlt, faExclamationCircle, faHome, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  let mopStatus = 'Idle';
  let batteryLevel = 100;
  let waterTankLevel = 'Full';
  let cleaningSolutionLevel = 'Full';
  let currentLocation = 'Living Room';
  let cleaningSpeed = 'Medium';
  let cleaningMode = 'Normal';
  let alerts = [];
  let isDarkMode = false;

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

  function simulateAlert(alert) {
    alerts = [...alerts, alert];
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
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
    </div>
  </div>
  
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
  
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4 font-heading">Status and Monitoring</h3>
      <p class="mb-2"><FontAwesomeIcon icon={faBatteryFull} /> Battery Level: {batteryLevel}%</p>
      <p class="mb-2"><FontAwesomeIcon icon={faWater} /> Water Tank Level: {waterTankLevel}</p>
      <p class="mb-2">Cleaning Solution Level: {cleaningSolutionLevel}</p>
      <p class="mb-2">Cleaning Progress: 50%</p>
      <p>Estimated Time to Completion: 30 mins</p>
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
</style>