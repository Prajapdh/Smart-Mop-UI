<script>
    let history = ['Cleaned on 2024-10-15', 'Cleaned on 2024-10-18'];
  </script>
  
  <div class="history">
    <h2>Cleaning History</h2>
    <ul>
      {#each history as entry}
        <li>{entry}</li>
      {/each}
    </ul>
  </div>
  
  <style>
    .history {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
    }
  
    li {
      padding: 5px 0;
    }
  </style>
