<template>
  <div id="app">

    <img alt="Vue logo" src="./assets/fhgr.jpg">
    <HelloWorld v-if="show=='methodencheck'" msg="Hallo methodencheck!"/>
    <HelloWorld v-if="show=='bibeval'" msg="Hallo bibeval!"/>
    <HelloWorld v-if="show=='suchanfrage'" msg="Hallo suchanfrage!"/>
    <HelloWorld v-if="show=='Team'" msg="Hallo Team!"/>
    {{show}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
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
