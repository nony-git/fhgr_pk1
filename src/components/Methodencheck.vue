<template>
  <div class="methodencheck">
    <!-- START: PROCESSBAR -->
    <div class="methodencheck-processbar" v-if="page > 0">
      <div class="methodencheck-step" v-bind:class="{stepActive: page > 0}"></div>
      <div class="methodencheck-line" v-bind:class="{lineActive: page > 1}"></div>
      <div class="methodencheck-step" v-bind:class="{stepActive: page > 1}"></div>
      <div class="methodencheck-line" v-bind:class="{lineActive: page > 2}"></div>
      <div class="methodencheck-step" v-bind:class="{stepActive: page > 2}"></div>
      <div class="methodencheck-line" v-bind:class="{lineActive: page > 3}"></div>
      <div class="methodencheck-step" v-bind:class="{stepActive: page > 3}"></div>
      <div class="methodencheck-line" v-bind:class="{lineActive: page > 4}"></div>
      <div class="methodencheck-step" v-bind:class="{stepActive: page > 4}"></div>
      <div class="methodencheck-line" v-bind:class="{lineActive: page > 5}"></div>
      <div class="methodencheck-step" v-bind:class="{stepActive: page > 5}"></div>
      <div class="methodencheck-line" v-bind:class="{lineActive: page > 6}"></div>
      <div class="methodencheck-endstep" v-bind:class="{endstepActive: page > 6}"></div>
    </div>
    <!-- END: PROCESSBAR -->

    <!-- START: WELCOME-PAGE -->
    <div class="methodencheck-page" v-if="page == 0">
      <div class="methodencheck-text">
        <p>
          Im Bereich der Usability Evaluation existiert eine Vielzahl unterschiedlicher Methoden, die für die Untersuchung interaktiver
          Produkte genutzt werden können. Die Entscheidung <b>welche Methode</b> dabei konkret für das jeweilige Produkt und den <b>jeweiligen
          Zweck</b> am geeignetsten ist, kann nicht immer einfach getroffen werden.
        </p>
      </div>
      <div class="methodencheck-buttons-start">
        <button class="button button-primary-bg" v-on:click="page++">Start</button>
        <button class="methodencheck-infobutton button button-primary-bg" v-on:click="page=-1"></button>
      </div>
    </div>
    <!-- END: WELCOME-PAGE -->

    <!-- START: INFO-PAGE -->
    <div class="methodencheck-page" v-if="page == -1">
      <div class="methodencheck-text">
        <p>
          Im Bereich der Usability Evaluation existiert eine Vielzahl unterschiedlicher Methoden, die für die Untersuchung interaktiver
          Produkte genutzt werden können. Die Entscheidung <b>welche Methode</b> dabei konkret für das jeweilige Produkt und den <b>jeweiligen
          Zweck</b> am geeignetsten ist, kann nicht immer einfach getroffen werden.
        </p>
        <p>
          In der Regel ist hierfür eine gewisse Erfahrung und entsprechendes Know-How erforderlich. Die Auswahl einer passenden
          Evaluationsmethode und die Konzeption eines geeigneten Untersuchungsdesigns ist daher eine intellektuelle Aufgabe, die
          nur bedingt automatisierbar ist.
        </p>
        <p>
          Der CHeval Methodencheck soll und kann daher eine persönliche Beratung durch Usability-Experten nicht ersetzen.
          Vielmehr soll mit diesem Tool auch <b>Laien bzw. Personen mit wenig Erfahrung im Usability-Bereich</b> die Möglichkeit
          gegeben werden, sich auf einfache Weise einen ersten Eindruck über für sie in Frage kommende
          <b>Evaluationsmethoden</b> zu verschaffen.
        </p>
        <p>
          Falls Sie Probleme bei der Auswahl der einzelnen Optionen haben, so können Sie mit der Maus über die einzelnen Begriffe
          fahren und bekommen zusätzliche Informationen eingeblendet, die Ihnen bei der Entscheidung helfen sollen.
        </p>
        <p>
          Sofern Sie weiterführende Fragen haben, sich gerne zusätzlich von uns beraten lassen würden, oder die Evaluation, die
          Ihnen empfohlen wurde, mit unserer Unterstützung durchführen wollen, so zögern Sie nicht uns zu kontaktieren.
        </p>
      </div>
      <div class="methodencheck-buttons-start">
        <button class="button button-primary-bg" v-on:click="page = 1">Start</button>
        <button class="methodencheck-button button button-primary-bg" v-on:click="page = 0">zurück</button>
      </div>
    </div>
    <!-- END: INFO-PAGE -->

    <!-- START: QUESTION-PAGES -->
    <div v-for="question in questions" v-bind:key="question['id']">
      <div class="methodencheck-page" v-if="page == question['id']">

        <!-- HEADER QUESTION-PAGE -->
        <div class="methodencheck-titlecontainer">
          <h2 class="methodencheck-questiontitle">Frage {{ question['id'] }}</h2>
          <div class="methodencheck-methodentitle-wrapper">
            <h2 class="methodencheck-methodentitle" v-bind:class="{methodentitleActive: methodsActivated}">Methoden</h2>
            <label class="methodencheck-methodenswitch">
              <input type="checkbox" checked v-on:click="changeMethodeActivated()">
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <!-- QUESTIONS AND ANSWERS -->
        <div class="methodencheck-formcontainer">
          <!-- QUESTION -->
          <div class="methodencheck-form" v-bind:class="{fromSmall: methodsActivated}">
            <div class="methodencheck-question">
              {{ question['frage'] }}
            </div>

            <!-- ANSWERS -->
            <div>
              <!-- MULTIPLECHOICE ANSWERS -->
              <div class="methodencheck-answers" v-if="question['multiplechoice']">
                  <div class="methodencheck-levelanswers" v-for="(name, value, index) in question['antworten']" v-bind:key="index" v-on:click="updateInputs(question['titel'], value);updateMethods(question['titel']); sortMethods()">
                    <div class="methodencheck-topanswer" v-if="name['level'] == 1" v-on:click="showSubAnwser(value)">
                      <div class="activeTopAnswer" v-if="inputs[question['titel']].includes(parseInt(value))">
                        {{ name['antwort'] }}
                      </div>
                      <div class="inactiveTopAnswer" v-else>
                        {{ name['antwort'] }}
                      </div>
                    </div>
                    <div class="methodencheck-subanswer" v-if="name['level'] == 2" v-bind:class="{showSubAnwser: subAnswerActivated}">
                      <div class="activeSubAnswer" v-if="inputs[question['titel']].includes(parseInt(value))">
                        {{ name['antwort'] }}
                      </div>
                      <div class="inactiveSubAnswer" v-else>
                        {{ name['antwort'] }}
                      </div>
                    </div>
                  </div>
              </div>

              <!-- SINGLECHOICE ANSWER -->
              <div  class="methodencheck-answers" v-else>
                <div class="methodencheck-answer" v-for="(name, value, index) in question['antworten']" v-bind:key="index" v-on:click="updateInputs(question['titel'], value);updateMethods(question['titel']); sortMethods()">
                  <div class="activeAnswer" v-if="inputs[question['titel']] == value">
                    {{ name }}
                  </div>
                  <div class="inactiveAnswer" v-else>
                    {{ name }}
                  </div>
                </div>
              </div>
            </div>

            <!-- BUTTONS -->
            <div class="methodencheck-buttonContainer">
              <button class="methodencheck-button methodencheck-button-back button button-primary-bg" v-on:click="page--"></button>
              <button class="methodencheck-button methodencheck-button-forward button button-primary-bg" v-on:click="page++" v-if="inputs[question['titel']] != 0">Weiter</button>
            </div>
          </div>

          <!-- METHODS -->
          <div class="methodencheck-methodsContainer" v-bind:class="{methodsActive: methodsActivated}">
            <div class="methodencheck-methods">
              <div class="methodencheck-method" v-for="method in methods" v-bind:key="method['id']">
                {{ method["bezeichnung"] }}
                <div class="inactiveMethod" v-if="method.active == false"></div>
              </div>
            </div>
            <div class="methodencheck-methodenblur"></div>
          </div>

        </div>
      </div>
    </div>
    <!-- END: QUESTION-PAGES -->

    <!-- START: RESULT-PAGE -->
    <div class="methodencheck-page" v-if="page == Object.keys(questions).length + 1">
      <h2 class="methodencheck-questiontitle">Empfohlene Methoden</h2>

      <div class="methodencheck-results">
        <div v-for="method in methods" v-bind:key="method['id']">
          <div class="methodencheck-result" v-if="method['active'] === true">
            <h3 class="methodencheck-resulttitle">{{ method['bezeichnung'] }}</h3>
            <br>
            Hier könnte noch Text, Bilder, Metadaten zu den Methoden ergänzt werden.
            <br>
            Müsste halt noch getextet und ausgearbeitete werden.
          </div>
        </div>
        {{ showNoResults() }}
      </div>

      <div class="methodencheck-controls">
        <div class="methodencheck-resultbuttons">
          <button class="button button-primary-bg methodencheck-button-back" v-on:click="page--"></button>
          <button class="button button-primary-bg methodencheck-button methodencheck-button-forward" v-on:click="page = 0; clearInputs(); clearMethods()">zurück zum Start</button>
        </div>
      </div>
    </div>
    <!-- END: RESULT-PAGE -->
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
        untersuchungsschwerpunkt: [],
        zeit: 0,
        budget: 0
      },
      methodsActivated: true,
      subAnswerActivated: false
    }
  },
  methods: {
    updateInputs: function(question, inputValue) {
      inputValue = parseInt(inputValue);
      if (this.questions[question]['multiplechoice']) {
        if (inputValue == 1) {
          this.inputs[question] = [1];
        }
        else {
          var index = this.inputs[question].indexOf(1);
          if (index > -1) {
            this.inputs[question].splice(index, 1);
          }

          if (this.inputs[question].includes(inputValue)) {
            var i = this.inputs[question].indexOf(inputValue);
            this.inputs[question].splice(i, 1);
          }
          else {
            this.inputs[question].push(inputValue);
          }
        }
      }
      else {
        this.inputs[question] = inputValue;
      }
    },
    updateMethods: function(check) {
      var inputs = this.inputs;
      this.methods.forEach(function(method) {
        switch (check) {
          case 'produktstatus':
            if (method['produktstatus'].includes(inputs['produktstatus'].toString())) {
              method['active'] = true;
              method['position'] = 1;
            }
            else {
              method['active'] = false;
              method['position'] = 2;
            }
            break;

          case 'motivation':
            if (method['produktstatus'].includes(inputs['produktstatus'].toString()) &&
                method['motivation'].includes(inputs['motivation'].toString())) {
              method['active'] = true;
              method['position'] = 1;
            }
            else {
              method['active'] = false;
              method['position'] = 2;
            }
            break;

          case 'untersuchungsziel':
            if (method['produktstatus'].includes(inputs['produktstatus'].toString()) &&
                method['motivation'].includes(inputs['motivation'].toString()) &&
                method['untersuchungsziel'].includes(inputs['untersuchungsziel'].toString())) {
              method['active'] = true;
              method['position'] = 1;
            }
            else {
              method['active'] = false;
              method['position'] = 2;
            }
            break;

          case 'untersuchungsschwerpunkt':
            if (method['produktstatus'].includes(inputs['produktstatus'].toString()) &&
                method['motivation'].includes(inputs['motivation'].toString()) &&
                method['untersuchungsziel'].includes(inputs['untersuchungsziel'].toString()) &&
                inputs['untersuchungsschwerpunkt'].some(elem => method['untersuchungsschwerpunkt'].includes(elem.toString()))) {
              method['active'] = true;
              method['position'] = 1;
            }
            else {
              method['active'] = false;
              method['position'] = 2;
            }
            break;

          case 'zeit':
            if (method['produktstatus'].includes(inputs['produktstatus'].toString()) &&
                method['motivation'].includes(inputs['motivation'].toString()) &&
                method['untersuchungsziel'].includes(inputs['untersuchungsziel'].toString()) &&
                inputs['untersuchungsschwerpunkt'].some(elem => method['untersuchungsschwerpunkt'].includes(elem.toString())) &&
                method['zeit'].includes(inputs['zeit'].toString())) {
              method['active'] = true;
              method['position'] = 1;
            }
            else {
              method['active'] = false;
              method['position'] = 2;
            }
            break;

          case 'budget':
            if (method['produktstatus'].includes(inputs['produktstatus'].toString()) &&
                method['motivation'].includes(inputs['motivation'].toString()) &&
                method['untersuchungsziel'].includes(inputs['untersuchungsziel'].toString()) &&
                inputs['untersuchungsschwerpunkt'].some(elem => method['untersuchungsschwerpunkt'].includes(elem.toString())) &&
                method['zeit'].includes(inputs['zeit'].toString()) &&
                method['budget'].includes(inputs['budget'].toString())) {
              method['active'] = true;
              method['position'] = 1;
            }
            else {
              method['active'] = false;
              method['position'] = 2;
            }
            break;
        }
      }
    )},
    sortMethods: function() {
      this.methods.sort(function (a, b) {
        return a.position - b.position
      })
    },
    clearInputs: function() {
      this.inputs['produktstatus'] = 0;
      this.inputs['motivation'] = 0;
      this.inputs['untersuchungsziel'] = 0;
      this.inputs['untersuchungsschwerpunkt'] = [];
      this.inputs['zeit'] = 0;
      this.inputs['budget'] = 0;
      this.methodsActivated = true;
      this.subAnswerActivated = false;
    },
    clearMethods: function() {
      this.methods.forEach(function(method) {
        method['active'] = true;
        method['position'] = 1;
      })
    },
    changeMethodeActivated: function() {
      this.methodsActivated = !this.methodsActivated;
    },
    showNoResults: function() {
      var results = 0;
      this.methods.forEach(function(method) {
        if (method['active'] == true) {
          results += 1;
        }
      });
      if (results == 0) {
        return "Leider trifft keine Methode auf Ihre Eingaben zu. Sie können den Test nochmals durchführen oder sich hier durch die möglichen Methoden lesen."
      }
    },
    showSubAnwser: function(value) {
      if (value == 0) {
        this.subAnswerActivated = !this.subAnswerActivated;
      }
      else if (value == 1) {
        this.subAnswerActivated = false;
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
  display: flex;
  flex-wrap: wrap;
}
a {
  color: #42b983;
}
label {
  margin-top: 0;
}
.button {
  font-size: 1rem;
  padding: 10px 15px;
  color: #817e65;
  border: 1px solid #c0beb2;
  cursor: pointer;
  transition: all 0.25s;
  background: #ffffff;

}
.button:hover {
  background: #c0beb2;
  color: #ffffff;
}
.methodencheck-page {
  padding: 0 2rem;
  position: relative;
}
.methodencheck-processbar {
  display: flex;
  align-items: center;
  padding: 0rem 2rem 4rem 2rem;
}
.methodencheck-step {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 2px solid #817E65;
  background: #ffffff;
  transition: 0.3s linear;
}
.stepActive {
  background: #000000;
  border: 0;
}
.methodencheck-endstep {
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
  border: 2px solid #817E65;
  background: #ffffff;
  transition: 0.3s linear;
}
.endstepActive {
  background: #99C089;
  border: 2px solid #000000;
}
.endstepActive::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 3px;
  background-image: url("../assets/check.svg");
  background-repeat: no-repeat;
  background-size: 25px 25px;
  background-position: center;
  width: 25px;
  height: 25px;
  transform: rotate(-45deg);
}
.methodencheck-line {
  height: 2px;
  background: #817E65;
  width: calc((100% - 210px) / 6);
  transition: 0.3s linear;
}
.lineActive {
  background: #000000;
}
.methodencheck-buttons-start {
  display: flex;
  align-items: center;
}
.methodencheck-infobutton {
  position: relative;
  width: 30px;
  height: 30px;
  background: #817E65;
  border-radius: 100%;
  margin-left: 1rem;
}
.methodencheck-infobutton::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  background-image: url("../assets/info_icon.svg");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: center;
}
.methodencheck-titlecontainer {
  display: flex;
}
.methodencheck-questiontitle {
  width: 60%;
}
.methodencheck-methodentitle-wrapper {
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2rem;
}
.methodencheck-methodentitle {
  padding-left: 2rem;
}
.methodencheck-methodenswitch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
  margin-right: 1rem;
}
.methodencheck-methodenswitch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 1rem;
  width: 1rem;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #817E65;
}
input:focus + .slider {
  box-shadow: 0 0 1px #817E65;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.methodencheck-image {
  width: 100%;
  object-fit: cover;
  margin-bottom: 1rem;
}
.methodencheck-text {
  text-align: left;
  margin-bottom: 1.5rem;
}
.methodencheck-formcontainer {
  display: flex;
}
.methodencheck-buttonContainer {
  margin-top: 1rem;
  width: calc(100% - 2.5rem);
  display: flex;
  justify-content: flex-end;
}
.methodencheck-button {
  margin-left: 1rem;
}
.methodencheck-button-back {
  position: relative;
  width: 40px;
  height: 41px;
}
.methodencheck-button-forward {
  background: #817E65;
  color: #ffffff;
  margin-top: 0;
}
.methodencheck-button-forward:hover {
  color: #000000;
}
.methodencheck-button-back::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 8px;
  background: url("../assets/Arrow.svg");
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: center;
  width: 20px;
  height: 20px;
}
.methodencheck-form {
  width: 100%;
  transition: width 0.5s ease-in-out;
}
.fromSmall {
  width: 70%;
  border-right: 1px solid #817E65;
}
.methodencheck-questiontitle {
  text-align: left;
}
.methodencheck-question {
  margin-bottom: 2rem;
  text-align: left;
}
.methodencheck-methodentitle {
  opacity: 0;
  transition: 0.5s ease-in-out;
}
.methodentitleActive {
  opacity: 1;
}
.methodencheck-answers {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.methodencheck-answer {
  width: calc(50% - 2.5rem);
  margin-right: 2rem;
  margin-bottom: 2rem;
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
.methodencheck-levelanswers {
  width: calc(50% - 2.5rem);
  margin-right: 2rem;
  margin-bottom: 2rem;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.25s;
  display: flex;
  justify-content: center;
}
.methodencheck-levelanswers:hover {
  background: #408198;
  color: #ffffff;
}
.methodencheck-topanswer {
  width: 100%;
  border: 2px solid #408198;
  border-radius: 5px;
}
.methodencheck-subanswer {
  width: 100%;
  border: 2px solid #408198;
  border-radius: 5px;
  display: none;
}
.showSubAnwser {
  display: block;
}
.methodencheck-methodsContainer {
  position: relative;
  width: 0;
  padding: 0 1rem;
  opacity: 0;
  transition: 0.5s ease-in-out;
}
.methodsActive {
  width: 40%;
  opacity: 1;
}
.methodencheck-methods {
  width: 100%;
  padding: 0 1rem;
  overflow: auto;
  max-height: 500px;
  display: flex;
  flex-direction: column;
}
.methodencheck-methods::-webkit-scrollbar {
    width: 12px;
}
.methodencheck-methods::-webkit-scrollbar-track {
    background: #EBEBEB;
    border-radius: 10px;
}
.methodencheck-methods::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #C4C4C4;
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
.methodencheck-methodenblur {
  position: absolute;
  top: 425px;
  right: 0;
  width: 100%;
  height: 75px;
  background-image: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,1));
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
.activeTopAnswer {
  height: calc(100% - 2rem);
  padding: 1rem;
  background: #408198;
  color: #ffffff;
}
.inactiveTopAnswer {
  padding: 1rem;
}
.activeSubAnswer {
  padding: 0.4rem;
  background: #408198;
  color: #ffffff;
}
.inactiveSubAnswer {
  padding: 0.4rem;
}
.methodencheck-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
.methodencheck-resultbuttons {
  display: flex;
}
.methodencheck-results {
  text-align: left;
}
.methodencheck-result {
  padding: 2rem;
  background: #F1F1F1;
  border-radius: 10px;
  text-align: left;
  margin: 2rem 0;
  max-width: 700px;
}
.methodencheck-resulttitle {
  margin: 0;
}
@media only screen and (max-width: 900px) {
  .methodencheck-questiontitle {
    width: 100%;
  }
  .methodencheck-form {
    width: 100%;
    border-right: 0;
  }
  .methodencheck-answer {
    margin-right: 0;
    margin-bottom: 1rem;
    width: 100%;
  }
  .methodencheck-levelanswers {
    margin-right: 0;
    margin-bottom: 1rem;
    width: 100%;
  }
  .methodencheck-buttonContainer {
    width: calc(100% - 0.8rem);
  }
  .methodencheck-methodentitle-wrapper {
    display: none;
  }
  .methodencheck-methodsContainer {
    display: none;
  }
}
@media only screen and (max-width: 768px) {
  .methodencheck-line {
    display: none;
  }
  .methodencheck-step, .methodencheck-endstep {
    width: 10%;
    height: 4px;
    border-radius: 4px;
    border: 1.5px solid #000000;
    background: #ffffff;
    margin-right: 5%;
  }
  .methodencheck-endstep {
    transform: rotate(0deg);
    margin-right: 0;
  }
  .stepActive {
    background: #000000;
  }
  .endstepActive {
    background: #000000;
  }
  .endstepActive::before {
    background-image: none;
    width: 0;
    height: 0;
  }
}

</style>
