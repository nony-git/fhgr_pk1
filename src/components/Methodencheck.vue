<template>
  <div class="methodencheck">
    <div class="methodencheck-processbar" v-if="page != 0">
      Processbar
    </div>

    <div class="methodencheck-page" v-if="page == 0">
      <img class="methodencheck-image" src="../assets/methodencheck_intro_image.png" alt="Image UX">
      <div class="methodencheck-text">
        <p>
          Im Bereich der Usability Evaluation existiert eine Vielzahl unterschiedlicher Methoden, die für die Untersuchung interaktiver
          Produkte genutzt werden können. Die Entscheidung <b>welche Methode</b> dabei konkret für das jeweilige Produkt und den <b>jeweiligen
          Zweck</b> am geeignetsten ist, kann nicht immer einfach getroffen werden.
        </p>
      </div>
      <button class="button button-primary-bg" v-on:click="page++">Start</button>
    </div>

    <div class="methodencheck-page methodencheck-formcontainer" v-if="page == 1">
      <div class="methodencheck-form">
        <h2>Frage 1</h2>
        <div class="methodencheck-question">
          {{ questions['produktstatus']['frage'] }}
        </div>
        <div class="methodencheck-answers">
          <div class="methodencheck-answer" v-for="(name, value, index) in questions['produktstatus']['antworten']" v-bind:key="index" v-on:click="inputs['produktstatus'] = parseInt(value); updateMethods('produktstatus')">
            <div class="activeAnswer" v-if="inputs.produktstatus == value">
              {{ name }}
            </div>
            <div class="inactiveAnswer" v-else>
              {{ name }}
            </div>
          </div>
        </div>
        <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
        <button class="methodencheck-btn" v-on:click="page++" v-if="inputs.produktstatus != 0">Weiter</button>
      </div>

      <div class="methodencheck-methods">
        <div class="methodencheck-method" v-for="method in methods" v-bind:key="method['id']">
          {{ method["bezeichnung"] }}

          <div class="inactiveMethod" v-if="method.active == false"></div>
        </div>
      </div>
    </div>

    <div class="methodencheck-page methodencheck-formcontainer" v-if="page == 2">
      <div class="methodencheck-form">
        <h2>Frage 2</h2>
        <div class="methodencheck-question">
          {{ questions['motivation']['frage'] }}
        </div>
        <div class="methodencheck-answers">
          <div class="methodencheck-answer" v-for="(name, value, index) in questions['motivation']['antworten']" v-bind:key="index" v-on:click="inputs['motivation'] = parseInt(value); updateMethods('motivation')">
            <div class="activeAnswer" v-if="inputs.motivation == value">
              {{ name }}
            </div>
            <div class="inactiveAnswer" v-else>
              {{ name }}
            </div>
          </div>
        </div>
        <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
        <button class="methodencheck-btn" v-on:click="page++" v-if="inputs.motivation != 0">Weiter</button>
      </div>

      <div class="methodencheck-methods">
        <div class="methodencheck-method" v-for="method in methods" v-bind:key="method['id']">
          {{ method["bezeichnung"] }}

          <div class="inactiveMethod" v-if="method.active == false"></div>
        </div>
      </div>
    </div>

    <div class="methodencheck-page methodencheck-formcontainer" v-if="page == 3">
      <div class="methodencheck-form">
        <h2>Frage 3</h2>
        <div class="methodencheck-question">
          {{ questions['untersuchungsziel']['frage'] }}
        </div>
        <div class="methodencheck-answers">
          <div class="methodencheck-answer" v-for="(name, value, index) in questions['untersuchungsziel']['antworten']" v-bind:key="index" v-on:click="inputs['untersuchungsziel'] = parseInt(value); updateMethods('untersuchungsziel')">
            <div class="activeAnswer" v-if="inputs.untersuchungsziel == value">
              {{ name }}
            </div>
            <div class="inactiveAnswer" v-else>
              {{ name }}
            </div>
          </div>
        </div>
        <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
        <button class="methodencheck-btn" v-on:click="page++" v-if="inputs.untersuchungsziel != 0">Weiter</button>
      </div>

      <div class="methodencheck-methods">
        <div class="methodencheck-method" v-for="method in methods" v-bind:key="method['id']">
          {{ method["bezeichnung"] }}

          <div class="inactiveMethod" v-if="method.active == false"></div>
        </div>
      </div>
    </div>

    <div class="methodencheck-page methodencheck-formcontainer" v-if="page == 4">
      <div class="methodencheck-form">
        <h2>Frage 4</h2>
        <div class="methodencheck-question">
          {{ questions['untersuchungsschwerpunkt']['frage'] }}
        </div>
        <div class="methodencheck-answers">
          <div class="methodencheck-answer" v-for="(name, value, index) in questions['untersuchungsschwerpunkt']['antworten']" v-bind:key="index" v-on:click="inputs['untersuchungsschwerpunkt'] = parseInt(value); updateMethods('untersuchungsschwerpunkt')">
            <div class="activeAnswer" v-if="inputs.untersuchungsschwerpunkt == value">
              {{ name }}
            </div>
            <div class="inactiveAnswer" v-else>
              {{ name }}
            </div>
          </div>
        </div>
        <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
        <button class="methodencheck-btn" v-on:click="page++" v-if="inputs.untersuchungsschwerpunkt != 0">Weiter</button>
      </div>

      <div class="methodencheck-methods">
        <div class="methodencheck-method" v-for="method in methods" v-bind:key="method['id']">
          {{ method["bezeichnung"] }}

          <div class="inactiveMethod" v-if="method.active == false"></div>
        </div>
      </div>
    </div>

    <div class="methodencheck-page methodencheck-formcontainer" v-if="page == 5">
      <div class="methodencheck-form">
        <h2>Frage 5</h2>
        <div class="methodencheck-question">
          {{ questions['zeit']['frage'] }}
        </div>
        <div class="methodencheck-answers">
          <div class="methodencheck-answer" v-for="(name, value, index) in questions['zeit']['antworten']" v-bind:key="index" v-on:click="inputs['zeit'] = parseInt(value); updateMethods('zeit')">
            <div class="activeAnswer" v-if="inputs.zeit == value">
              {{ name }}
            </div>
            <div class="inactiveAnswer" v-else>
              {{ name }}
            </div>
          </div>
        </div>
        <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
        <button class="methodencheck-btn" v-on:click="page++" v-if="inputs.zeit != 0">Weiter</button>
      </div>

      <div class="methodencheck-methods">
        <div class="methodencheck-method" v-for="method in methods" v-bind:key="method['id']">
          {{ method["bezeichnung"] }}

          <div class="inactiveMethod" v-if="method.active == false"></div>
        </div>
      </div>
    </div>

    <div class="methodencheck-page methodencheck-formcontainer" v-if="page == 6">
      <div class="methodencheck-form">
        <h2>Frage 6</h2>
        <div class="methodencheck-question">
          {{ questions['budget']['frage'] }}
        </div>
        <div class="methodencheck-answers">
          <div class="methodencheck-answer" v-for="(name, value, index) in questions['budget']['antworten']" v-bind:key="index" v-on:click="inputs['budget'] = parseInt(value); updateMethods('budget')">
            <div class="activeAnswer" v-if="inputs.budget == value">
              {{ name }}
            </div>
            <div class="inactiveAnswer" v-else>
              {{ name }}
            </div>
          </div>
        </div>
        <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
        <button class="methodencheck-btn" v-on:click="page++" v-if="inputs.budget != 0">Weiter</button>
      </div>

      <div class="methodencheck-methods">
        <div class="methodencheck-method" v-for="method in methods" v-bind:key="method['id']">
          {{ method["bezeichnung"] }}

          <div class="inactiveMethod" v-if="method.active == false"></div>
        </div>
      </div>
    </div>

    <div class="methodencheck-page" v-if="page == 7">
      <h2>Result</h2>
      {{ getResults() }}
      <button class="methodencheck-btn" v-on:click="page--">Zurück</button>
      <button class="methodencheck-btn" v-on:click="page = 0; clearInputs()">Startseite</button>
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
      methods: dataset.methoden,
      inputs: {
        produktstatus: 0,
        motivation: 0,
        untersuchungsziel: 0,
        untersuchungsschwerpunkt: 0,
        zeit: 0,
        budget: 0
      }
    }
  },
  methods: {
    updateMethods: function(check) {
      var inputs = this.inputs;
      this.methods.forEach(function(method) {
        if (method[check].includes(inputs[check].toString())) {
          method['active'] = true;
        }
        else {
          method['active'] = false;
        }
      }
    )},
    clearInputs: function() {
        this.inputs['produktstatus'] = 0;
        this.inputs['motivation'] = 0;
        this.inputs['untersuchungsziel'] = 0;
        this.inputs['untersuchungsschwerpunkt'] = 0;
        this.inputs['zeit'] = 0;
        this.inputs['budget'] = 0;
    },
    getResults: function() {
      var results = [];
      this.methods.forEach(function(method) {

        if (method['active'] == 1) {
          results.push(method['bezeichnung']);
        }
      })
      if (results != '') {
        return results
      }
      else {
        return "Keine passende Methode gefunden"
      }
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
.methodencheck-page {
  padding: 2rem;
}
.methodencheck-image {
  width: 100%;
  object-fit: cover;
  margin-bottom: 1rem;
}
.methodencheck-text {
  text-align: left;
}
.methodencheck-formcontainer {
  display: flex;
}
.methodencheck-form {
  width: 70%;
  border-right: 1px solid #817E65;
  padding-right: 2rem;
}
.methodencheck-question {
  margin-bottom: 2rem;
}
.methodencheck-answers {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.methodencheck-answer {
  width: 45%;
  margin-right: 2%;
  margin-bottom: 2%;
  border: 2px solid #408198;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.25s;
  display: flex;
  justify-content: center;
}
.methodencheck-answer:hover {
  background: #408198;
  color: #ffffff;
}
.methodencheck-answer:nth-child(2n+0) {
  margin-right: 0;
}
.methodencheck-methods {
  position: relative;
  width: 30%;
  padding: 0 2rem;
  overflow: auto;
  max-height: 500px;
  display: flex;
  flex-direction: column;
}
.methodencheck-method {
  border: 2px solid #817E65;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: left;
  position: relative;
}
.inactiveMethod {
  position: absolute;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  top: -2px;
  left: -2px;
  background: #ffffff;
  opacity: 0.8;
}
.activeAnswer {
  width: 100%;
  padding: 1rem;
  background: #408198;
  color: #ffffff;
}
.inactiveAnswer {
  width: 100%;
  padding: 1rem;
}
</style>
