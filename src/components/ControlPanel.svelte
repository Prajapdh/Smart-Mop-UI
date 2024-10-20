<script>
    export let mopStatus;
    export let cleaningMode;
  
    const modes = ['Light', 'Normal', 'Deep Clean'];
  
    function toggleStartStop() {
      const event = new CustomEvent('toggleStartStop');
      dispatchEvent(event);
    }
  
    function changeMode(newMode) {
      const event = new CustomEvent('changeMode', { detail: newMode });
      dispatchEvent(event);
    }
  </script>
  
  <div class="control-panel">
    <h2>Control Panel</h2>
  
    <div class="mop-status">
      <p>Status: {mopStatus}</p>
      <button on:click={toggleStartStop}>
        {mopStatus === 'Idle' ? 'Start Cleaning' : 'Stop Cleaning'}
      </button>
    </div>
  
    <div class="mode-selection">
      <h3>Cleaning Mode</h3>
      <select on:change="{(e) => changeMode(e.target.value)}">
        {#each modes as mode}
          <option value={mode} selected={cleaningMode === mode}>{mode}</option>
        {/each}
      </select>
    </div>
  </div>
  
  <style>
    .control-panel {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
  
    button {
      margin-top: 10px;
    }
  
    .mode-selection {
      margin-top: 20px;
    }
  </style>
  