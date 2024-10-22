<script>
  import { faPlay, faBatteryFull, faWater, faSync, faMapMarkerAlt, faTachometerAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  let mopStatus = 'Idle';
  let batteryLevel = 100;
  let waterTankLevel = 'Full';
  let currentLocation = 'Living Room';
  let cleaningSpeed = 'Medium';
  let cleaningMode = 'Normal';
  let alerts = [];

  function toggleMopStatus() {
    mopStatus = mopStatus === 'Idle' ? 'Cleaning' : 'Idle';
  }

  function simulateAlert(alertType) {
    if (!alerts.includes(alertType)) alerts.push(alertType);
  }

  function dismissAlert(alertType) {
    alerts = alerts.filter(alert => alert !== alertType);
  }
</script>

<div class="flex h-screen bg-gray-100">
  <!-- Sidebar -->
  <aside class="bg-gray-800 w-64 flex flex-col text-white p-4 space-y-4">
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faPlay} class="mr-2"/> On/Off
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} class="mr-2"/> Cleaning Mode
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faWater} class="mr-2"/> Water Spray
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faBatteryFull} class="mr-2"/> Battery Level
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} class="mr-2"/> Auto Mode
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} class="mr-2"/> Cleaning Schedule
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} class="mr-2"/> Rotation Control
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faWater} class="mr-2"/> Water Refill Alert
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} class="mr-2"/> Simulation/Test
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} class="mr-2"/> History Logs
    </button>

    <div class="mt-auto flex flex-col items-center text-center">
      <img src="profile-pic.png" alt="User Profile" class="w-16 h-16 rounded-full mb-2"/>
      <p>John Smith</p>
      <p class="text-sm text-gray-400">johnsmith@email.abc</p>
      <button class="mt-4 w-full bg-gray-600 hover:bg-gray-500 py-2">Settings</button>
      <button class="w-full bg-red-600 hover:bg-red-500 py-2 mt-2">Log out</button>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="p-6 flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
    
    <!-- On/Off Control -->
    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-2">Mop Status</h2>
      <div class="flex items-center">
        <FontAwesomeIcon icon={faPlay} class="text-green-500 mr-2"/>
        <span class="text-gray-700">Current Status: {mopStatus}</span>
      </div>
      <button class="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg" on:click={toggleMopStatus}>
        {mopStatus === 'Idle' ? 'Start Mop' : 'Stop Mop'}
      </button>
    </section>

    <!-- Battery Percentage -->
    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-2">Battery</h2>
      <div class="flex items-center">
        <FontAwesomeIcon icon={faBatteryFull} class="text-green-500 mr-2"/>
        <span class="text-gray-700">Battery Level: {batteryLevel}%</span>
      </div>
    </section>

    <!-- Scheduled Cleaning -->
    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-2">Scheduled Cleaning</h2>
      <div>
        <p class="text-gray-700">Current Location: {currentLocation}</p>
        <p class="text-gray-700">Cleaning Speed: {cleaningSpeed}</p>
        <p class="text-gray-700">Cleaning Mode: {cleaningMode}</p>
      </div>
    </section>

    <!-- Water Tank Level -->
    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-2">Water Tank</h2>
      <div class="flex items-center">
        <FontAwesomeIcon icon={faWater} class="text-blue-500 mr-2"/>
        <span class="text-gray-700">Water Tank Level: {waterTankLevel}</span>
      </div>
    </section>

    <!-- Current Location -->
    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-2">Location</h2>
      <div class="flex items-center">
        <FontAwesomeIcon icon={faMapMarkerAlt} class="text-red-500 mr-2"/>
        <span class="text-gray-700">Current Location: {currentLocation}</span>
      </div>
    </section>

    <!-- Alerts -->
    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-2">Alerts</h2>
      {#if alerts.length > 0}
        <ul class="space-y-2">
          {#each alerts as alert}
            <li class="flex justify-between items-center">
              <span class="text-red-500"><FontAwesomeIcon icon={faExclamationCircle} class="mr-2"/> {alert}</span>
              <button class="text-blue-500" on:click={() => dismissAlert(alert)}>Dismiss</button>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-700">No alerts</p>
      {/if}
      <button class="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg" on:click={() => simulateAlert('Refill Water Tank')}>
        Simulate Alert: Refill Water Tank
      </button>
      <button class="mt-2 w-full py-2 bg-blue-500 text-white rounded-lg" on:click={() => simulateAlert('Replace Mop Pads')}>
        Simulate Alert: Replace Mop Pads
      </button>
    </section>

  </main>
</div>

<style>
  /* Tailwind styles already applied via CDN or build */
</style>
