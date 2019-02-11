<template>
<div id="container">
  <div style="height: 20%; width: 100%; background-color: black; 
  display: flex; align-items: center; justify-content: center;">
    <h1 style="color: white; font-size: 3rem;">World of MineSweeper</h1>
  </div>
  <div id="main-container">
    <a-card id="controler">
      <a-button @click="restart">restart</a-button>
      <h2>remaining mines: {{ restMine - wrongFlag }}</h2>
    </a-card>
    <a-card id="mine-wrapper">
      <div class="row-container" v-for="(row,idx) of srcMap" :key="idx">
        <mine-button v-for="(mine, i) of row" :key="idx * 10 + i" 
        :position="{ x: idx, y: i }"
        :content="String(mine.showContent)"
        :isOpen="mine.isOpen"
        :isFlag="mine.isFlag"
        @open="openBtn"
        @flag="flagBtn"></mine-button>
      </div>
    </a-card>
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

  isComplete: boolean = false;

  restMine: number = MINE_COUNT;
  wrongFlag: number = 0;

  restart() {
    this.restMine = MINE_COUNT;
    this.wrongFlag = 0;
    this.isComplete = false;
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

  openBtn(pos: IPosition) {
    if (this.isComplete) {
      return;
    }
    if (this.srcMap[pos.x][pos.y].isOpen) {
      return;
    }
    if (this.srcMap[pos.x][pos.y].realContent === -1) {
      for (let i = 0; i < ROW_COUNT; ++i) {
        for (let j = 0; j < COL_COUNT; ++j) {
          if (this.srcMap[i][j].isMine) {
            this.srcMap[i][j].showContent = '*';
          }
        }
      }
      this.isComplete = true;
      setTimeout(() => { alert('you lose'); }, 1000);
    } else {
      openButton(this.srcMap, pos);
    }
  }

  flagBtn(pos: IPosition) {
    if (this.isComplete) {
      return;
    }
    if (this.srcMap[pos.x][pos.y].isOpen) {
      return;
    }
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
      this.isComplete = true;
      setTimeout(() => { alert('you win'); }, 1000);
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
<style>
.row-container {
  display: flex;
  justify-content: flex-start;
}
#mine-wrapper {
  padding: 1rem;
  background-color: white;
}
#container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fafafa;
}
#main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#controler .ant-card-body {
  display: flex;
  justify-content: space-around;
}
.ant-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}
</style>
