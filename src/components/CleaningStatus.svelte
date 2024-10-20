<script>
    export let mopStatus;
    export let progress;
    export let waterTankLevel;
  </script>
  
  <div class="cleaning-status">
    <h2>Cleaning Status</h2>
    <p>Status: {mopStatus}</p>
    <p>Progress: {progress}%</p>
    <p>Water Tank: {waterTankLevel}</p>
  </div>
  
  <style>
    .cleaning-status {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
  </style>
  