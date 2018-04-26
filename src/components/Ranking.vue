<template>
  <div>
    <table v-if="playerList.length">
      <tr>
        <th>
          Player name
        </th>
        <th @click="sortOrder *= -1">
          Rank
        </th>
      </tr>
      <tr v-for="player of playerList" :key="'player-'+player.name">
        <td>{{player.name}}</td>
        <td>{{player.rank}}</td>
      </tr>
    </table>
    <div v-else
      class="nobody"
    >
      There are currenlty no one in database :'(
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Array
    }
  },
  data: function() {
    return {
      sortOrder: 1,
    };
  },
  computed: {
    playerList: function() {
      return (this.players || JSON.parse(localStorage.players || '[]')).slice().sort((a, b) => (b.rank - a.rank) * this.sortOrder);
    }
  },
}
</script>

<style scoped>
  .nobody {
    margin-top: 1em;
    margin-left: 10em;
    font-style: italic;
    color: rgba(50, 150, 200, 0.5);
  }
</style>
