<template>
  <div id="app">

    <HelloWorld v-if="show=='methodencheck'" msg="Hallo methodencheck!"/>
    <Bibeval v-if="show=='bibeval'"/>
    <HelloWorld v-if="show=='suchanfrage'" msg="Hallo suchanfrage!"/>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Bibeval from './components/Bibeval.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
		Bibeval
  },
  props:[
    "show"
  ]
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
