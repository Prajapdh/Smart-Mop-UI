<script>
    export let batteryLevel;
  </script>
  
  <div class="battery-health">
    <h2>Battery Level</h2>
    <p>{batteryLevel}%</p>
  </div>
  
  <style>
    .battery-health {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
  </style>
  