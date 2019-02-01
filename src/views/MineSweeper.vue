<template>
  <div>
    <div class="row-container" v-for="(row,idx) of srcMap" :key="idx">
      <mine-button v-for="(mine, i) of row" :key="idx * 10 + i" :content="String(mine.showContent)"></mine-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MineButton from '../components/MineButton.vue';
import { IMineButton } from '../typings';
import { initialMap } from '../utils';
@Component({
  name: 'mine-sweeper',
  components: {
    MineButton
  }
})
export default class MineSweeper extends Vue {
  srcMap: IMineButton[][] = [[]];

  mounted() {
    this.srcMap = [];
    for (let i = 0; i < 30; ++i) {
      const temp: IMineButton[] = [];
      for (let j = 0; j < 20; ++j) {
        const mine: IMineButton = {
          isMine: false,
          postion: { x: i, y: j },
          isOpen: false,
          isFlag: false,
          showContent: ' ',
          realContent: 0
        };
        temp.push(mine);
      }
      this.srcMap.push(temp);
    }
    initialMap(this.srcMap);
    for (let i = 0; i < 30; ++i) {
      for (let j = 0; j < 20; ++j) {
        if (this.srcMap[i][j].isMine) {
          this.srcMap[i][j].showContent = '*';
        } else {
          this.srcMap[i][j].showContent = this.srcMap[i][j].realContent;
        }
      }
    }
  }
}
</script>
<style scoped>
.row-container {
  display: flex;
  justify-content: flex-start;
}
</style>
