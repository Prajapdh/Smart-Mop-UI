<script>
    let showInfo = false;
  
    function toggleInfo() {
      showInfo = !showInfo;
    }
  </script>
  
  <div class="user-info-button">
    <button on:click={toggleInfo}>
      {showInfo ? 'Hide Info' : 'Show Info'}
    </button>
  
    {#if showInfo}
      <div class="info">
        <p>Project by Daksh Prajapati, Varad Parte, and Dhruv Singh</p>
        <a href="https://github.com/Prajapdh/Smart-Mop-UI">https://github.com/Prajapdh/Smart-Mop-UI</a>
      </div>
    {/if}
  </div>
  
  <style>
    .user-info-button {
      display: inline-block;
      margin-right: 20px;
    }
  
    .info {
      margin-top: 10px;
    }
  </style>
  