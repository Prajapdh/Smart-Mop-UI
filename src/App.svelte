<script>
  import ControlPanel from './components/ControlPanel.svelte';
  import CleaningStatus from './components/CleaningStatus.svelte';
  import BatteryHealth from './components/BatteryHealth.svelte';
  import Schedule from './components/Schedule.svelte';
  import History from './components/History.svelte';
  import UserInfoButton from './components/UserInfoButton.svelte';
  import Navbar from './components/Navbar.svelte';

  let mopStatus = 'Idle';
  let batteryLevel = 100;
  let cleaningMode = 'Normal';
  let progress = 0;
  let waterTankLevel = 'Full';
</script>

<div class="wrapper">
  <Navbar />

  <main class="content">
    <h1 class="title">Smart Mop Interface</h1>
    <div class="user-info">
      <UserInfoButton />
    </div>
    
    <div class="status-section">
      <CleaningStatus {mopStatus} {progress} {waterTankLevel} />
      <BatteryHealth {batteryLevel} />
    </div>

    <ControlPanel 
      {cleaningMode} 
      {mopStatus} 
      on:toggleStartStop={() => mopStatus = mopStatus === 'Idle' ? 'Cleaning' : 'Idle'}
      on:changeMode={(e) => cleaningMode = e.detail}
    />

    <Schedule />
    <History />
  </main>
</div>

<style>
  /* Wrapper that spans the full screen */
  .wrapper {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--background-color);
  }

  /* Center the inner content */
  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 2em;
    margin-bottom: 20px;
  }

  .status-section {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }

  .user-info {
    margin-bottom: 20px;
    text-align: right;
  }
</style>
