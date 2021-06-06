<template>
  <button :class="{ selected: checked.includes(value) }" @click="click()">
    <slot></slot>
  </button>
</template>

<!----/ Script /---->

<script>
export default {
  props: ["checked", "value"],
  model: {
    prop: "checked",
    event: "input",
  },
  data: function () {
    return {
      isSelected: this.selected,
    };
  },
  methods: {
    click() {
      if (this.checked.includes(this.value)) {
        this.checked.splice(this.checked.indexOf(this.value), 1);
      } else {
        this.checked.push(this.value);
      }
    },
  },
};
</script>

<style scoped>
</style>
