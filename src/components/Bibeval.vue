<template>
  <div class="hello">
    <question></question>
  </div>
</template>

<script>
import question from './question.vue'

export default {
  name: 'Bibeval',
  components: {
    question
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
