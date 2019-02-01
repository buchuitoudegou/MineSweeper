<template>
  <div>{{ srcMap }}</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MineButton from '../components/MineButton.vue';
import { IMineButton } from '../typings';
import { initialMap } from '../utils';
@Component({
  name: 'mine-sweeper'
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
  }
}
</script>
