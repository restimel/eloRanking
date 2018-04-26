<template>
  <div>
    <label>
      Player name:
      <input v-model="player">
    </label>
    <br>
    <label>
      Starting rank:
      <input type="number" v-model="rank">
    </label>
    <div>
      <button @click="add">Add</button>
    </div>
    <div class="message" :class="messageType" @click="message = ''" v-show="message">
      {{message}}
    </div>
    <hr>
    <Ranking :players="players"/>
  </div>
</template>

<script>
import Ranking from '@/components/Ranking'
export default {
  data: function() {
    return {
      player: '',
      rank: 1000,
      message: '',
      messageType: 'info',
      players: JSON.parse(localStorage.players || '[]'),
    };
  },
  methods: {
    add: function() {
      const player = {
        name: this.player,
        rank: this.rank,
      };

      if (this.players.find(p => p.name === player.name)) {
        this.message = 'This player already exist';
        this.messageType = 'error';
        return;
      }

      this.players.push(player);
      localStorage.players = JSON.stringify(this.players);
      this.message = `player "${player.name}" added`;
      this.messageType = 'success';
    }
  },
  components: {
    Ranking
  }
}
</script>

<style scoped>
.message {
  margin-top: 1em;
  border-radius: 5px;
  padding: 0.7em;
}
.message.error {
  background-color: #FF6050;
}
.message.success {
  background-color: #55FF44;
}

</style>
