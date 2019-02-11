<template>
<div style="display: flex; height: 100vh; justify-content: center; align-items: center;" id="container">
  <div id="mine-wrapper">
    <div class="row-container" v-for="(row,idx) of srcMap" :key="idx">
      <mine-button v-for="(mine, i) of row" :key="idx * 10 + i" 
      :position="{ x: idx, y: i }"
      :content="String(mine.showContent)" 
      @open="openBtn"
      @flag="flagBtn"></mine-button>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MineButton from '../components/MineButton.vue';
import { IMineButton, IPosition } from '../typings';
import { initialMap, ROW_COUNT, COL_COUNT, MINE_COUNT, openButton } from '../utils';
@Component({
  name: 'mine-sweeper',
  components: {
    MineButton
  }
})
export default class MineSweeper extends Vue {
  srcMap: IMineButton[][] = [[]];

  restMine: number = MINE_COUNT;
  wrongFlag: number = 0;

  openBtn(pos: IPosition) {
    if (this.srcMap[pos.x][pos.y].realContent === -1) {
      for (let i = 0; i < ROW_COUNT; ++i) {
        for (let j = 0; j < COL_COUNT; ++j) {
          if (this.srcMap[i][j].isMine) {
            this.srcMap[i][j].showContent = '*';
          }
        }
      }
      alert('you lose');
    } else {
      openButton(this.srcMap, pos);
    }
  }

  flagBtn(pos: IPosition) {
    if (this.srcMap[pos.x][pos.y].isFlag === true) {
      this.srcMap[pos.x][pos.y].isFlag = false;
      this.srcMap[pos.x][pos.y].showContent = ' ';
      if (this.srcMap[pos.x][pos.y].isMine) {
        this.restMine ++;
      } else {
        this.wrongFlag --;
      }
    } else {
      this.srcMap[pos.x][pos.y].isFlag = true;
      this.srcMap[pos.x][pos.y].showContent = '^';
      if (this.srcMap[pos.x][pos.y].isMine) {
        this.restMine --;
      } else {
        this.wrongFlag ++;
      }
    }
    if (this.restMine === 0 && this.wrongFlag === 0) {
      alert('you win');
    }
  }

  mounted() {
    this.srcMap = [];
    for (let i = 0; i < ROW_COUNT; ++i) {
      const temp: IMineButton[] = [];
      for (let j = 0; j < COL_COUNT; ++j) {
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
  }
}
</script>
<style scoped>
.row-container {
  display: flex;
  justify-content: flex-start;
}
</style>
