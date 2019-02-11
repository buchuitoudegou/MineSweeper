<template>
<div>
  <a-button class="mine-button" @click="clickEventHandler" @contextmenu="flagEventHandler">{{ content }}</a-button>
</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IPosition } from '../typings';
@Component({
  name: 'mine-button'
})
export default class MineButton extends Vue {
  @Prop(String) content !: string;
  @Prop() position !: IPosition;
  
  flagEventHandler(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.$emit('flag', this.position);
    return false;
  }

  clickEventHandler() {
    this.$emit('open', this.position);
  }
}
</script>
<style scoped>
.mine-button {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
}
</style>
