<template>
<div>
  <a-button class="mine-button" @click="clickEventHandler" @contextmenu="flagEventHandler"
  :class="{ 'isClosed': !isOpen, 'isMine': content === '*', 'isFlag': isFlag && !isOpen }">{{ content }}</a-button>
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
  @Prop(Boolean) isOpen !: boolean;

  @Prop(Boolean) isFlag !: {
    type: boolean,
    require: true
  };
  
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
.isClosed {
  background-color: #bfbfbf;
}
button.isMine {
  background-color: #ff4d4f;
}
.isFlag {
  background-color: #91d5ff;
}
.isMine.isFlag {
  background-color: #52c41a;
}
</style>
