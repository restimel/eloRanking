<template>
  <div>
    <textarea
        placeholder="Bulk import"
        :class="{error: error}"
        v-model="bulkResult"
    ></textarea>
    <br>
    <button @click="add">Add results</button>
  </div>
</template>

<script>
import elo from '@/helpers/elo';
export default {
  data: function() {
    return {
      error: false,
      bulkResult: '',
      players: JSON.parse(localStorage.players || '[]'),
    };
  },
  methods: {
    getPlayer: function(name) {
        return this.players.find(p => p.name === name);
    },
    matchResult: function(line) {
        const parse = /^([-\w .]+)\s*:\s*([-\w .]+)[;\t](.+)$/.exec(line);
        if (!parse) {
            this.error = true;
            console.log('Line "%s" is invalid', line);
            return;
        }
        const [,name1, name2, results] = parse;
        let p1 = this.getPlayer(name1);
        let p2 = this.getPlayer(name2);

        if (!p1 || !p2) {
            //todo create player
            this.error = true;
            console.log('player "%s" or "%s" unknown', name1, name2);
            return;
        }

        results.split(/[;\t]/g).forEach(result => {
            const [result1, result2] = result.split(/[:\t ]/);
            elo.computeElo(p1, p2, {
                result1,
                result2,
            });
        });
    },
    add: function() {
      // check value
      if (!/^(?:[-\w .]+\s*:\s*[-\w .]+(?:[;\t]\d+:\d+)+)+$/.test(this.bulkResult)) {
          this.error = true;
          console.log('Format is not valid.')
          return;
      }
      
      //split by line
      const results = this.bulkResult.split('\n');
      results.forEach(this.matchResult, this);

      this.error = false;
      this.bulkResult = '';
      console.log('Bulk done');

      localStorage.players = JSON.stringify(this.players);
      this.$emit('change', this.players);
    }
  },
}
</script>

<style scoped>
    textarea.error {
        border: 3px solid red;
    }
</style>
