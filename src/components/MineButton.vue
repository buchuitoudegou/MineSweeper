<template>
<div>
  <a-button class="mine-button">{{ content }}</a-button>
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
  mouted() {
    const element = document.querySelector('.mine-button');
    if (element) {
      document.oncontextmenu = () => false;
      element.addEventListener('mousedown', (event: any) => {
        if (event.which === 3) {
          this.$emit('flag', this.position);
        } else if (event.which === 4) {
          this.$emit('open', this.position);
        }
      });
    }
  }
}
</script>
