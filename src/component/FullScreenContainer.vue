<template>
  <div
    style="position:fixed; top:0; left:0; height: 100vh; width: 100vw; padding-top: 64px; padding-left: 300px; "
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "FullScreenContainer"
};
</script>
