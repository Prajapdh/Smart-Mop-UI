<script>
  // Import Font Awesome icons
  import { faPlay, faPause, faBatteryFull, faBatteryQuarter, faWater, faSync, faHistory } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';


  // State for mop controls
  let mopStatus = 'Idle';
  let batteryLevel = 100;
  let cleaningMode = 'Normal';
  let waterTankLevel = 'Full';

  // Dummy Data for Feedback and Goals
  let feedbacks = [
    { user: 'Anonymous', feedback: 'Company Culture', time: '1h ago' },
    { user: 'Anonymous', feedback: 'Team Leader', time: '2h ago' },
    { user: 'Anonymous', feedback: 'Benefits', time: '1d ago' }
  ];

  let goals = [
    { team: 'Marketing', description: 'Made progress towards their goal' },
    { team: 'Operations', description: 'Added new items to their goal' },
    { action: 'On/Off', description: 'Turn the Smart Mop on or off' }
  ];

  let upcomingCleanings = [
    { room: 'Living Room' },
    { room: 'Bedroom' },
    { room: 'Kitchen, Tiles' }
  ];

  // Simulation functions
  function toggleMopStatus() {
    mopStatus = mopStatus === 'Idle' ? 'Cleaning' : 'Idle';
  }

  function toggleBatteryLevel() {
    batteryLevel = batteryLevel === 100 ? 20 : 100; // Simulate low/full battery
  }

  function toggleWaterTankLevel() {
    waterTankLevel = waterTankLevel === 'Full' ? 'Empty' : 'Full';
  }

  function toggleCleaningMode() {
    cleaningMode = cleaningMode === 'Normal' ? 'Deep Clean' : 'Normal';
  }
</script>

<!-- Main container -->
<div class="page-container">
  <!-- Sidebar for control buttons -->
  <aside class="sidebar">
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faPlay} /> On/Off
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} /> Cleaning Mode
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faWater} /> Water Spray
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={batteryLevel === 100 ? faBatteryFull : faBatteryQuarter} /> Battery Level
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} /> Auto Mode
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} /> Cleaning Schedule
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} /> Rotation Control
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faWater} /> Water Refill Alert
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faSync} /> Simulation/Test
    </button>
    <button class="sidebar-button">
      <FontAwesomeIcon icon={faHistory} /> History Logs
    </button>

    <!-- User Info -->
    <div class="user-info">
      <img src="profile-pic.png" alt="User Profile" class="profile-pic" />
      <div class="user-details">
        <p>John Smith</p>
        <p>johnsmith@email.abc</p>
      </div>
      <button class="settings-button">Settings</button>
      <button class="logout-button">Log out</button>
    </div>
  </aside>

  <!-- Main Content Area -->
  <main class="main-content">
    <!-- Feedback Section -->
    <section class="tile feedback-section">
      <h3>New Feedback!</h3>
      {#each feedbacks as feedback}
        <div class="feedback">
          <p>{feedback.user} shared feedback about {feedback.feedback}</p>
          <button class="small-button">View</button>
          <button class="small-button">Reply</button>
          <button class="small-button">Archive</button>
        </div>
      {/each}
    </section>

    <!-- Smart Mop Control Panel -->
    <section class="tile smart-mop-control">
      <h3>Smart Mop Control</h3>
      <div class="battery-level">
        <FontAwesomeIcon icon={batteryLevel === 100 ? faBatteryFull : faBatteryQuarter} size="2x" />
        <p>Battery: {batteryLevel}%</p>
        <p>Water Tank: {waterTankLevel}</p>
        <p>Mode: {cleaningMode}</p>
      </div>
      <div class="controls">
        <button class={mopStatus === 'Idle' ? 'inactive-button' : 'active-button'} on:click={toggleMopStatus}>
          {mopStatus === 'Idle' ? 'Start Cleaning' : 'Stop Cleaning'}
        </button>
        <button class={cleaningMode === 'Normal' ? 'inactive-button' : 'active-button'} on:click={toggleCleaningMode}>
          Switch Mode
        </button>
        <button class={waterTankLevel === 'Full' ? 'inactive-button' : 'active-button'} on:click={toggleWaterTankLevel}>
          {waterTankLevel === 'Full' ? 'Empty Water Tank' : 'Fill Water Tank'}
        </button>
        <button class={batteryLevel === 100 ? 'inactive-button' : 'active-button'} on:click={toggleBatteryLevel}>
          {batteryLevel === 100 ? 'Simulate Low Battery' : 'Simulate Full Battery'}
        </button>
      </div>
    </section>

    <!-- Upcoming Cleanings -->
    <section class="tile upcoming-cleanings">
      <h3>Upcoming Cleanings</h3>
      {#each upcomingCleanings as cleaning}
        <div class="cleaning">
          <p>{cleaning.room}</p>
          <button class="small-button">View Details</button>
          <button class="small-button">Reschedule</button>
        </div>
      {/each}
    </section>

    <!-- Goals Section -->
    <section class="tile goals-section">
      <h3>Goals</h3>
      {#each goals as goal}
        <div class="goal">
          <p>{goal.team ? goal.team : goal.action} {goal.description}</p>
          <button class="small-button">{goal.team ? 'View' : 'Start'}</button>
        </div>
      {/each}
    </section>

    <!-- Cleaning History and Support -->
    <section class="tile bottom-section">
      <div class="cleaning-history">
        <h3>Cleaning History</h3>
        <p>Review all cleanings and operations logs here.</p>
        <button class="small-button">View History</button>
      </div>
      <div class="support-section">
        <h3>Support</h3>
        <button class="small-button">Help Center</button>
        <button class="small-button">Subscription</button>
        <button class="small-button">Manage Team</button>
        <button class="small-button">Learning Hub</button>
      </div>
    </section>
  </main>
</div>

<style>
  /* General layout */
  .page-container {
    display: flex;
    height: 100vh;
    background-color: #f4f4f4;
  }

  /* Sidebar Styles */
  .sidebar {
    width: 250px;
    background-color: #333;
    color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sidebar-button {
    background-color: #444;
    border: none;
    color: white;
    padding: 10px 15px;
    margin-bottom: 10px;
    cursor: pointer;
    text-align: left;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sidebar-button:hover {
    background-color: #555;
  }

  .user-info {
    margin-top: auto;
    text-align: center;
  }

  .profile-pic {
    width: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .user-details {
    color: #aaa;
  }

  /* Main Content Styles */
  .main-content {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto 1fr;
    gap: 20px;
    padding: 20px;
    background-color: #fff;
  }

  .tile {
    background-color: #e0e0e0;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .controls button {
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
  }

  .active-button {
    background-color: #007bff;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .inactive-button {
    background-color: white;
    color: #007bff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .small-button {
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
    cursor: pointer;
  }

  .small-button:hover {
    background-color: #0056b3;
  }

  .feedback, .goal, .cleaning {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
</style>
