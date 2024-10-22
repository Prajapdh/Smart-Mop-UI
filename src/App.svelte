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

<div class="top-bar sticky top-0 w-full bg-gray-800 text-white flex justify-between items-center p-4 shadow-lg">
  <div class="app-title text-2xl font-bold">SmartMop</div>
  <div class="user-options flex space-x-6">
    <span class="cursor-pointer">User Profile</span>
    <span class="cursor-pointer">Settings</span>
    <span class="cursor-pointer">Logout</span>
  </div>
</div>

<div class="tiles-container grid grid-cols-3 gap-6 p-6 w-full h-full">
  <div class="tile bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">Navigation</h3>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-2">Room Selection</button>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-4">Define Custom Area</button>
    <div class="mb-4">
      <p class="mb-2">Manual Directional Control:</p>
      <div class="flex space-x-4 mb-2">
        <button class="bg-blue-600 text-white py-2 px-4 rounded"><FontAwesomeIcon icon={faArrowUp} /></button>
      </div>
      <div class="flex space-x-4 mb-2">
        <button class="bg-blue-600 text-white py-2 px-4 rounded"><FontAwesomeIcon icon={faArrowLeft} /></button>
        <button class="bg-blue-600 text-white py-2 px-4 rounded"><FontAwesomeIcon icon={faArrowRight} /></button>
      </div>
      <div class="flex space-x-4">
        <button class="bg-blue-600 text-white py-2 px-4 rounded"><FontAwesomeIcon icon={faArrowDown} /></button>
      </div>
    </div>
    <button class="bg-blue-600 text-white py-2 px-4 rounded" on:click={() => mopStatus = 'Returning to Dock'}>Return to Charging Dock</button>
  </div>
  <div class="tile cleaning-controls bg-gray-100 p-6 rounded-lg shadow-md col-span-1 row-span-2 flex flex-col items-center">
    <img src="/path/to/smart-mop-image.jpg" alt="Smart Mop Image" class="w-full max-w-xs mb-6">
    <h3 class="text-xl font-semibold mb-4">Cleaning Controls</h3>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-2" on:click={() => mopStatus = 'Cleaning'}>Start Cleaning</button>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-2" on:click={() => mopStatus = 'Paused'}>Pause Cleaning</button>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-4" on:click={() => mopStatus = 'Idle'}>Stop Cleaning</button>
    <p class="mb-2">Select Cleaning Mode:</p>
    <select bind:value={cleaningMode} class="border rounded p-2 mb-4">
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
  <div class="tile bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">Scheduling</h3>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-2">Set Recurring Schedule</button>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-4">One-Time Scheduled Cleaning</button>
    <p class="mb-4">Upcoming Scheduled Cleans:</p>
    <ul class="list-disc list-inside">
      <li>Tomorrow at 10 AM</li>
      <li>Friday at 2 PM</li>
    </ul>
  </div>
  <div class="tile bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">Status and Monitoring</h3>
    <p class="mb-2"><FontAwesomeIcon icon={faBatteryFull} /> Battery Level: {batteryLevel}%</p>
    <p class="mb-2"><FontAwesomeIcon icon={faWater} /> Water Tank Level: {waterTankLevel}</p>
    <p class="mb-2">Cleaning Solution Level: {cleaningSolutionLevel}</p>
    <p class="mb-2">Cleaning Progress: 50%</p>
    <p>Estimated Time to Completion: 30 mins</p>
  </div>
  <div class="tile bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">Maintenance</h3>
    <p class="mb-2">Filter Replacement Reminder</p>
    <p class="mb-2">Mop Pad Replacement Alert</p>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-2" on:click={() => simulateAlert('Filter Replacement Needed')}>Simulate Filter Replacement Alert</button>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-4" on:click={() => simulateAlert('Mop Pad Replacement Needed')}>Simulate Mop Pad Replacement Alert</button>
    <button class="bg-blue-600 text-white py-2 px-4 rounded mb-2">Self-Diagnosis Report</button>
    <button class="bg-blue-600 text-white py-2 px-4 rounded">Cleaning History Log</button>
  </div>
  <div class="tile bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">Performance Analytics</h3>
    <p class="mb-2">Area Cleaned: 200 sq ft</p>
    <p class="mb-2">Energy Consumption: 50 Wh</p>
    <p class="mb-2">Water Usage: 10 L</p>
    <p>Cleaning Efficiency: 90%</p>
  </div>
</div>
