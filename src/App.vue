<template>
  <div id="app">
    <div class="container">
      <Methodencheck v-if="show=='methodencheck'"/>
      <Bibeval v-if="show=='bibeval'"/>
      <Suchanfrage v-if="show=='suchanfrage'"/>
    </div>
  </div>
</template>

<script>

import Bibeval from './components/Bibeval.vue'
import Methodencheck from './components/Methodencheck.vue'
import Suchanfrage from './components/Suchanfrage.vue'

export default {
  name: 'App',
  components: {
		Bibeval,
    Methodencheck,
    Suchanfrage,
  },
  props:[
    "show"
  ]
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
