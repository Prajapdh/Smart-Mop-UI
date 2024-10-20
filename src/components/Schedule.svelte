<script>
    let scheduleTime = '';
  </script>
  
  <div class="schedule">
    <h2>Schedule Cleaning</h2>
    <input type="time" bind:value={scheduleTime} />
    <button on:click={() => alert(`Scheduled cleaning at ${scheduleTime}`)}>
      Set Schedule
    </button>
  </div>
  
  <style>
    .schedule {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
  
    input {
      margin-right: 10px;
    }
  </style>
  