<template>
  <div
    :style="'transition: padding-left 0.25s; position:fixed; top:0; left:0; height: 100vh; width: 100vw; padding-top: 64px; padding-left: '+$store.state.drawerSize+'px; overflow: hidden;'"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "FullScreenContainer"
};
</script>
