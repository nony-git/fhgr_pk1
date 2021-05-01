<template>
  <div class="methodencheck">
    <h1>Methodencheck</h1>
    <div class="methodencheck-processbar" v-if="page != 0">
      Processbar
    </div>

    <div class="methodencheck-page" v-if="page == 0">
      <h2>Intro</h2>

      {{questions}}
      <br><br>
      UND
      <br><br>
      {{methods}}

      <button class="methodencheck-btn" v-on:click="page++">Start</button>
    </div>

    <div class="methodencheck-page" v-if="page == 1">
      <h2>Frage 1</h2>
      <div class="methodencheck-question">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
        At vero eos et accusam et justo duo dolores etea rebum.
      </div>
      <div class="methodencheck-answercontainer">
        <div>Antwort 1</div>
        <div>Antwort 2</div>
        <div>Antwort 3</div>
        <div>Antwort 4</div>
      </div>
      <br>
      <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
      <button class="methodencheck-btn" v-on:click="page++">Weiter</button>
    </div>

    <div class="methodencheck-page" v-if="page == 2">
      <h2>Page 2</h2>
      <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
      <button class="methodencheck-btn" v-on:click="page++">Weiter</button>
    </div>

    <div class="methodencheck-page" v-if="page == 3">
      <h2>Page 3</h2>
      <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
      <button class="methodencheck-btn" v-on:click="page++">Weiter</button>
    </div>

    <div class="methodencheck-page" v-if="page == 4">
      <h2>Result</h2>
      <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
    </div>
  </div>
</template>

<script>
import dataset from './json/data_methodencheck.json'

export default {
  name: 'Methodencheck',
  data: function() {
    return {
      page: 0,
      questions: dataset.fragen,
      methods: dataset.methoden
    }
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
