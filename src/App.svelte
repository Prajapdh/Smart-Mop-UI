<script>
  import { onMount } from 'svelte';
  import { faFilter, faBroom, faClipboardCheck, faHistory, faExclamationTriangle, faCalendar, faTimes, faPlay, faBolt, faChartLine, faPause, faStop, faBatteryFull, faWater, faSync, faMapMarkerAlt, faTachometerAlt, faExclamationCircle, faHome, faSun, faMoon,faRobot, faRedo } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { toast } from '@zerodevx/svelte-toast'

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
  let showUserProfile = false;
  let userName = "John Doe";
  let schedules = [];
  let newScheduleTime = '';
  let showScheduleForm = false;
  let selectedDays = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false
  };
  let filterHealth = 75; // Percentage
  let mopPadHealth = 60; // Percentage

  function simulateAlert(message) {
    console.log('Simulating alert:', message); // Add this line for debugging
    toast.push(message, {
      theme: {
        '--toastBackground': '#F59E0B',
        '--toastColor': 'white',
        '--toastBarBackground': '#D97706'
      }
    });
  }

  function generateReport() {
    // Simulate report generation
    toast.push('Self-Diagnosis Report Generated', {
      theme: {
        '--toastBackground': '#10B981',
        '--toastColor': 'white',
        '--toastBarBackground': '#059669'
      }
    });
  }

  function viewCleaningHistory() {
    // Simulate opening cleaning history
    toast.push('Cleaning History Opened', {
      theme: {
        '--toastBackground': '#3B82F6',
        '--toastColor': 'white',
        '--toastBarBackground': '#2563EB'
      }
    });
  }
  
  function toggleScheduleForm() {
    showScheduleForm = !showScheduleForm;
  }

  function addSchedule() {
    if (newScheduleTime && Object.values(selectedDays).some(day => day)) {
      const newSchedule = {
        time: newScheduleTime,
        days: Object.keys(selectedDays).filter(day => selectedDays[day])
      };
      schedules = [...schedules, newSchedule].sort((a, b) => a.time.localeCompare(b.time));
      newScheduleTime = '';
      resetSelectedDays();
      showScheduleForm = false;
    }
  }

  function removeSchedule(index) {
    schedules = schedules.filter((_, i) => i !== index);
  }

  function resetSelectedDays() {
    Object.keys(selectedDays).forEach(day => selectedDays[day] = false);
  }

  function formatSchedule(schedule) {
    return `${schedule.time} (${schedule.days.join(', ')})`;
  }

  function toggleUserProfile() {
    showUserProfile = !showUserProfile;
  }

  function saveUserName() {
    alert(`Name saved: ${userName}`);
    toggleUserProfile();
  }

  function toggleMopStatus(status) {
    if (status === 'Idle') {
      mopStatus = 'Idle';
    } else if (status === 'Cleaning') {
      mopStatus = 'Cleaning';
    } else if (status === 'Paused') {
      mopStatus = 'Paused';
    }
    console.log('Mop Status:', mopStatus);
  }

  function toggleMonitoringStatus() {
    if (mopStatus === 'Cleaning' && batteryLevel > 0) {
      cleaningProgress = Math.min(cleaningProgress + 1, 100);
      batteryLevel = Math.max(batteryLevel - 1, 0);
      estimatedTime = Math.max(estimatedTime - 1, 0);
      waterTankLevelPercentage = Math.max(waterTankLevelPercentage - 0.5, 0);
      cleaningSolutionLevelPercentage = Math.max(cleaningSolutionLevelPercentage - 0.3, 0);
    } else if (mopStatus === 'Idle' || mopStatus === 'Paused') {
      // Do not change values when idle or paused
    } else if (mopStatus === 'Returning to Dock') {
      // Handle returning to dock state
      currentRoomIndex = 0;
      currentLocation = rooms[currentRoomIndex];
      currentFloorPlanIndex = 0;
      if (currentLocation === 'Dock') {
        mopStatus = 'Idle';
        cleaningProgress = 0;
        batteryLevel = 100;
        estimatedTime = 0;
        waterTankLevelPercentage = 100;
        cleaningSolutionLevelPercentage = 100;
      }
    }
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

<SvelteToast />

<div id="wrapper" class="p-0 m-0 pb-10 w-screen h-screen overflow-x-hidden bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans">
  <!-- Navigation Bar -->
<div class="top-bar sticky top-0 w-full bg-secondary text-white flex justify-between items-center p-4 shadow-lg">
  <div class="app-title text-2xl font-bold font-heading">SmartMop</div>
  <div class="user-options flex space-x-6 items-center">
    <button on:click={toggleTheme} class="text-white hover:text-accent">
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
    </button>
    <span class="cursor-pointer" on:click={toggleUserProfile}>{userName}'s Profile</span>
    <span class="cursor-pointer" on:click={toggleDeviceInfo}>Device Information</span>
    <span class="cursor-pointer" on:click={toggleSupportInfo}>Support</span>
  </div>
</div>

<!-- Device Information Modal -->
{#if showDeviceInfo}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
      <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Device Information</h3>
      <div class="space-y-2 text-gray-700 dark:text-gray-300">
        <p><strong>Device:</strong> SmartMop Intelligent Cleaner</p>
        <p><strong>Model Number:</strong> AAXNN2342</p>
        <p><strong>Battery Level:</strong> {batteryLevel}%</p>
        <p><strong>Water Tank Level:</strong> {waterTankLevelPercentage}%</p>
        <p><strong>Cleaning Solution Level:</strong> {cleaningSolutionLevelPercentage}%</p>
        <p><strong>Current Location:</strong> {currentLocation}</p>
      </div>
      <button class="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={toggleDeviceInfo}>Close</button>
    </div>
  </div>
{/if}

<!-- Support Information Modal -->
{#if showSupportInfo}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
      <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Support Information</h3>
      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        <p>If you need help or have any questions regarding the SmartMop, please refer to the user manual or contact our support team.</p>
        <p><strong>Support Contact:</strong> support@smartmop.com</p>
        <p><strong>Phone Number:</strong> +1-800-123-4567</p>
        <p><strong>Operating Hours:</strong> Mon-Fri, 9 AM - 5 PM EST</p>
      </div>
      <button class="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={toggleSupportInfo}>Close</button>
    </div>
  </div>
{/if}

<!-- User Profile Modal -->
{#if showUserProfile}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
      <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Profile</h3>
      <div class="mb-4">
        <label for="userName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input type="text" id="userName" bind:value={userName} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      </div>
      <div class="flex justify-end space-x-2">
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" on:click={toggleUserProfile}>Cancel</button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={saveUserName}>Save</button>
      </div>
    </div>
  </div>
{/if}

  <!-- Tiles Container -->
  <div class="tiles-container grid grid-cols-3 auto-rows-auto gap-6 p-6 w-full">
    <!-- Navigation Tile -->
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md row-span-2 col-start-1">
      <h3 class="text-xl font-semibold mb-4 font-heading">Navigation</h3>
      <p class="mb-4">Current Location: {currentLocation}</p>
      <button class="bg-primary text-white py-2 px-4 rounded mb-4 hover:bg-primary-dark w-full" on:click={returnToDock}>
        {mopStatus != 'Returning to Dock' ? 'Return to Charging Dock' : 'At Dock'}
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
    
    <!-- main controls tile -->
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md col-span-1 row-span-3 col-start-2 flex flex-col items-center">
      <img src="../public/SmartMop.png" alt="Smart Mop Image" class="w-full mb-6 rounded-lg">
      <h3 class="text-2xl font-semibold mb-6 font-heading text-gray-800 dark:text-gray-200">Cleaning Controls</h3>
      
      <div class="flex space-x-4 mb-6 w-full">
        <button 
          class="flex-1 {mopStatus === 'Cleaning' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-300 hover:bg-green-400'} dark:text-white text-gray-900 py-3 px-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center" 
          on:click={() => toggleMopStatus('Cleaning')}
        >
          <FontAwesomeIcon icon={faPlay} class="mr-2 dark:text-white text-gray-700" />
          {mopStatus != 'Cleaning' ? 'Start' : 'Cleaning'}
        </button>
        
        <button 
          class="flex-1 {mopStatus === 'Paused' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-300 hover:bg-yellow-400'} dark:text-white text-gray-900 py-3 px-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center" 
          on:click={() => toggleMopStatus('Paused')}
        >
          <FontAwesomeIcon icon={faPause} class="mr-2 dark:text-white text-gray-700" />
          Pause
        </button>
        
        <button 
          class="flex-1 {mopStatus === 'Idle' ? 'bg-red-500 hover:bg-red-600' : 'bg-red-300 hover:bg-red-400'} dark:text-white text-gray-900 y-3 px-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center" 
          on:click={() => toggleMopStatus('Idle')}
        >
          <FontAwesomeIcon icon={faStop} class="mr-2 dark:text-white text-gray-700" />
          Stop
        </button>
      </div>
      
      <div class="w-full mb-6">
        <label for="cleaningMode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cleaning Mode:</label>
        <select id="cleaningMode" bind:value={cleaningMode} class="w-full border rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <option value="Quick">Quick Clean</option>
          <option value="Deep">Deep Clean</option>
          <option value="Spot">Spot Clean</option>
        </select>
      </div>
      
      <div class="w-full mb-6">
        <label for="waterFlow" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Water Flow Rate:</label>
        <input id="waterFlow" type="range" min="1" max="5" step="1" class="w-full">
        <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1 w-[80%] mx-auto">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>
      
      <div class="w-full mb-6">
        <label for="solutionConc" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cleaning Solution Concentration:</label>
        <input id="solutionConc" type="range" min="1" max="5" step="1" class="w-full">
        <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1 w-[80%] mx-auto">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>
      
      <div class="w-full">
        <label for="rotationSpeed" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mop Head Rotation Speed:</label>
        <input id="rotationSpeed" type="range" min="1" max="5" step="1" class="w-full">
        <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1 w-[80%] mx-auto">
          <span>Slow</span>
          <span>Medium</span>
          <span>Fast</span>
        </div>
      </div>
    </div>
    
    <!-- Scheduling Tile -->
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md row-span-2 col-start-3">
      <h3 class="text-xl font-semibold mb-4 font-heading">Scheduling</h3>
      
      {#if !showScheduleForm}
        <button class="bg-primary text-white py-2 px-4 rounded mb-4 hover:bg-primary-dark w-full" on:click={toggleScheduleForm}>
          Set New Schedule
        </button>
      {:else}
        <div class="mb-4">
          <input
            type="time"
            bind:value={newScheduleTime}
            class="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <div class="grid grid-cols-4 gap-2 mb-2">
            {#each Object.keys(selectedDays) as day}
              <label class="flex items-center space-x-2">
                <input type="checkbox" bind:checked={selectedDays[day]} class="form-checkbox">
                <span class="text-sm">{day.slice(0, 3)}</span>
              </label>
            {/each}
          </div>
          <button class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark w-full" on:click={addSchedule}>
            Add Schedule
          </button>
        </div>
      {/if}
    
      <h4 class="font-semibold mb-2">Current Schedules:</h4>
      {#if schedules.length === 0}
        <p class="text-gray-600 dark:text-gray-400">No schedules set</p>
      {:else}
        <ul class="space-y-2">
          {#each schedules as schedule, index}
            <li class="flex justify-between items-center">
              <span class="flex items-center">
                <FontAwesomeIcon icon={faCalendar} class="mr-2 text-primary" />
                {formatSchedule(schedule)}
              </span>
              <button class="text-red-500 hover:text-red-700" on:click={() => removeSchedule(index)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Status and Monitoring Tile -->
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md row-start-3 row-span-2 col-start-1">
      <h3 class="text-xl font-semibold mb-4 font-heading text-gray-800 dark:text-gray-200">Status and Monitoring</h3>
      
      <p class="mb-2 text-gray-700 dark:text-gray-300"><strong>Battery Level: {batteryLevel}%</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
        <div class="bg-green-500 h-4 rounded-full" style="width: {batteryLevel.toFixed(2)}%"></div>
      </div>
      
      <p class="mb-2 text-gray-700 dark:text-gray-300"><strong>Water Tank Level: {waterTankLevelPercentage}%</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
        <div class="bg-blue-500 h-4 rounded-full" style="width: {waterTankLevelPercentage.toFixed(2)}%"></div>
      </div>
      
      <p class="mb-2 text-gray-700 dark:text-gray-300"><strong>Cleaning Solution Level: {cleaningSolutionLevelPercentage}%</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
        <div class="bg-purple-500 h-4 rounded-full" style="width: {cleaningSolutionLevelPercentage.toFixed(2)}%"></div>
      </div>
      
      <p class="mb-2 text-gray-700 dark:text-gray-300"><strong>Cleaning Progress: {cleaningProgress}%</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
        <div class="bg-yellow-500 h-4 rounded-full" style="width: {cleaningProgress.toFixed(2)}%"></div>
      </div>
      
      <p class="mt-4 mb-2 text-gray-700 dark:text-gray-300"><strong>Estimated Time to Completion: {estimatedTime} mins</strong></p>
      <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
        <div class="bg-red-500 h-4 rounded-full" style="width: {100 - (estimatedTime / 30) * 100}%"></div>
      </div>
    </div>

    <!-- Maintenance Tile -->
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md row-start-3 row-span-2 col-start-3">
      <h3 class="text-xl font-semibold mb-6 font-heading">Maintenance</h3>
      
      <div class="space-y-6">
        <div>
          <h4 class="text-lg font-medium mb-2 flex items-center">
            <FontAwesomeIcon icon={faFilter} class="mr-2 text-blue-500" />
            Filter Status
          </h4>
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div class="bg-blue-600 h-2.5 rounded-full" style="width: {filterHealth}%"></div>
          </div>
          <p class="text-sm mt-1 text-gray-600 dark:text-gray-400">Filter health: {filterHealth}%</p>
          <button 
            class="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            on:click={() => simulateAlert('Filter Replacement Needed')}
          >
            <FontAwesomeIcon icon={faExclamationTriangle} class="mr-2" />
            Simulate Filter Alert
          </button>
        </div>
    
        <div>
          <h4 class="text-lg font-medium mb-2 flex items-center">
            <FontAwesomeIcon icon={faBroom} class="mr-2 text-green-500" />
            Mop Pad Status
          </h4>
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div class="bg-green-600 h-2.5 rounded-full" style="width: {mopPadHealth}%"></div>
          </div>
          <p class="text-sm mt-1 text-gray-600 dark:text-gray-400">Mop pad health: {mopPadHealth}%</p>
          <button 
            class="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 flex items-center justify-center"
            on:click={() => simulateAlert('Mop Pad Replacement Needed')}
          >
            <FontAwesomeIcon icon={faExclamationTriangle} class="mr-2" />
            Simulate Mop Pad Alert
          </button>
        </div>
    
        <button 
          class="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300 flex items-center justify-center"
          on:click={generateReport}
        >
          <FontAwesomeIcon icon={faClipboardCheck} class="mr-2" />
          Generate Self-Diagnosis Report
        </button>
    
        <button 
          class="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300 flex items-center justify-center"
          on:click={viewCleaningHistory}
        >
          <FontAwesomeIcon icon={faHistory} class="mr-2" />
          View Cleaning History Log
        </button>
      </div>
    </div>
    
    <!-- Performance Analytics Tile -->
    <div class="tile bg-white dark:bg-secondary-light p-6 rounded-lg shadow-md row-start-4 row-span-1 col-start-2">
      <h3 class="text-2xl font-semibold mb-6 font-heading text-gray-800 dark:text-gray-200">Performance Analytics</h3>
      
      <div class="grid grid-cols-2 gap-4 max-h-full">
        <div class="stat-card bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <p class="text-sm text-blue-600 dark:text-blue-300 mb-1">Area Cleaned</p>
          <p class="text-2xl font-bold text-blue-800 dark:text-blue-100">200 sq ft</p>
          <FontAwesomeIcon icon={faHome} class="text-blue-400 dark:text-blue-500 text-3xl mt-2" />
        </div>
        
        <div class="stat-card bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <p class="text-sm text-green-600 dark:text-green-300 mb-1">Energy Consumption</p>
          <p class="text-2xl font-bold text-green-800 dark:text-green-100">50 Wh</p>
          <FontAwesomeIcon icon={faBolt} class="text-green-400 dark:text-green-500 text-3xl mt-2" />
        </div>
        
        <div class="stat-card bg-indigo-50 dark:bg-indigo-900 p-4 rounded-lg">
          <p class="text-sm text-indigo-600 dark:text-indigo-300 mb-1">Water Usage</p>
          <p class="text-2xl font-bold text-indigo-800 dark:text-indigo-100">10 L</p>
          <FontAwesomeIcon icon={faWater} class="text-indigo-400 dark:text-indigo-500 text-3xl mt-2" />
        </div>
        
        <div class="stat-card bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <p class="text-sm text-purple-600 dark:text-purple-300 mb-1">Cleaning Efficiency</p>
          <p class="text-2xl font-bold text-purple-800 dark:text-purple-100">90%</p>
          <FontAwesomeIcon icon={faChartLine} class="text-purple-400 dark:text-purple-500 text-3xl mt-2" />
        </div>
      </div>
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