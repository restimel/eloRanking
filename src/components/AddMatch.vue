<template>
  <div>
    <div class="form">
      <div>
        <label>
          1st Player name:
          <input v-model="player1">
          <span v-if="info1">
              ({{ info1.message }})
          </span>
        </label>
        <br>
        <label>
          2nd Player name:
          <input v-model="player2">
          <span v-if="info2">
              ({{ info2.message }})
          </span>
        </label>
        <br>
        <label>
          Score:
          <input type="number" v-model="result1" min="0" class="result">
          <input type="number" v-model="result2" min="0" class="result">
        </label>
        <div>
          <button @click="add">Add</button>
        </div>
        <div class="message" :class="messageType" @click="message = ''" v-show="message">
          {{message}}
        </div>
      </div>
      <BulkResult @change="update" />
    </div>
    <hr>
    <Ranking :players="players"/>
  </div>
</template>

<script>
import elo from '@/helpers/elo';
import Ranking from '@/components/Ranking';
import BulkResult from '@/components/BulkResult';

export default {
  data: function() {
    return {
      player1: '',
      player2: '',
      result1: 0,
      result2: 0,
      message: '',
      messageType: 'info',
      players: JSON.parse(localStorage.players || '[]'),
    };
  },
  computed: {
      info1: function() {
          if (!this.player1) {
              return null;
          }
          const player = this.players.find(p => p.name === this.player1);
          const info = {
              message: 'unknown player'
          };
          if (player) {
              info.player = player;
              info.message = player.rank;
          }
          return info;
      },
      info2: function() {
          if (!this.player2) {
              return null;
          }
          const player = this.players.find(p => p.name === this.player2);
          const info = {
              message: 'unknown player'
          };
          if (player) {
              info.player = player;
              info.message = player.rank;
          }
          return info;
      },
  },
  methods: {
    add: function() {
      const info1 = this.info1;
      const info2 = this.info2;
      if (!info1 || !info1.player) {
        this.message = 'Enter a valid first player';
        this.messageType = 'error';
        return;
      }
      if (!info2 || !info2.player) {
        this.message = 'Enter a valid second player';
        this.messageType = 'error';
        return;
      }

      const p1 = info1.player;
      const p2 = info2.player;
      
      const {gain1, gain2, error} = elo.computeElo(p1, p2, {
        result1: this.result1,
        result2: this.result2,
      });

      if (error) {
        this.message = error;
        this.messageType = 'error';
        return;
      }

      this.message = `Ranks updated: ${p1.name} → ${p1.rank} (${(gain1 > 0 ? '+' : '') + gain1}) |  ${p2.name} → ${p2.rank} (${(gain2 > 0 ? '+' : '') + gain2})`;
      this.messageType = 'success';
      
      localStorage.players = JSON.stringify(this.players);
    },
    update: function() {
      this.players = JSON.parse(localStorage.players || '[]')
    }
  },
  components: {
    Ranking,
    BulkResult,
  }
}
</script>

<style scoped>
.result {
    width: 3em;
}
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

.form {
  display: flex;
  justify-content: space-between;
}

</style>
