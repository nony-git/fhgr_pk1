<template>
  <div class="methodencheck" id="methodencheck-top">
    <!-- START: PROCESSBAR -->
    <div class="methodencheck-processbar" v-if="page > 0">
      <div class="methodencheck-stepwrapper" v-for="question in questions" v-bind:key="question['id']" v-bind:style="{'width': 'calc((100% - 30px) / ' + Object.keys(questions).length + ')'}">
        <div class="methodencheck-step" v-bind:class="{stepActive: page > question['id'] - 1, stepDone: page > question['id']}">{{ question['id'] }}</div>
        <div class="methodencheck-line" v-bind:class="{lineActive: page > question['id']}"></div>
      </div>
      <div class="methodencheck-endstep" v-bind:class="{endstepActive: page > Object.keys(questions).length}"></div>
    </div>
    <!-- END: PROCESSBAR -->

    <!-- START: WELCOME-PAGE -->
    <div class="methodencheck-page" v-if="page == 0">
      <!-- INTRO IMAGE -->
      <img src="/apps/app_cheval/img/methodencheck_intro_image.141a1948.png" class="methodencheck-introImage" alt="Methodencheck Intro Image">

      <!-- LANGUAGE SWITCH -->
      <div class="methodencheck-languageswitch">
          <button class="linkbutton" v-on:click="language = 'de'; loadData()" v-bind:class="{linkbuttonActive: language == 'de'}">
            Deutsch
          </button>
          <span>|</span>
          <button class="linkbutton" v-on:click="language = 'en'; loadData()" v-bind:class="{linkbuttonActive: language == 'en'}">
            English
          </button>
      </div>

      <!-- INOFTEXT -->
      <div class="methodencheck-text">
        <p v-for="text in infotext.haupttext" v-bind:key="text" v-html="text"></p>
      </div>

      <!-- ADDITIONAL INFOTEXT -->
      <div class="methodencheck-linkbuttons" v-if="!showInfoText">
        <button class="linkbutton linkbutton-more" v-on:click="showInfoText = true">{{ textcomponents.mehrErfahren }}</button>
      </div>
      <div class="methodencheck-text" v-if="showInfoText">
      <p v-for="text in infotext.zusatztext" v-bind:key="text" v-html="text"></p>
      </div>
      <div class="methodencheck-linkbuttons" v-if="showInfoText">
        <button class="linkbutton linkbutton-less" v-on:click="showInfoText = false">{{ textcomponents.weniger }}</button>
      </div>

      <!-- BUTTON TO START TOOL -->
      <div class="methodencheck-buttons-start">
        <button class="button button-primary-bg" v-on:click="page++;scrollToTop('methodencheck-top', 60)">{{ textcomponents.start }}</button>
      </div>
    </div>
    <!-- END: WELCOME-PAGE -->

    <!-- START: QUESTION-PAGES -->
    <div v-for="question in questions" v-bind:key="question['id']">
      <div class="methodencheck-page" v-if="page == question['id']">

        <!-- HEADER QUESTION-PAGE -->
        <div class="methodencheck-titlecontainer">
          <h2 class="methodencheck-questiontitle">{{ textcomponents.frage }} {{ question['id'] }}</h2>
          <div class="methodencheck-methodentitle-wrapper">
            <h2 class="methodencheck-methodentitle" v-bind:class="{methodentitleActive: methodsActivated}">{{ textcomponents.methoden }}</h2>
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
                  <div class="methodencheck-levelanswers" v-for="(name, value, index) in question['antworten']" v-bind:key="index" v-on:click="updateInputs(question, value);updateMethods(); sortMethods()">
                    <div class="methodencheck-topanswer" v-if="name['level'] == 1" v-on:click="showSubAnwser(question, value)" v-bind:class="{activeAnswer: (question['input']) ? question['input'].includes(parseInt(value)) : false}">
                      {{ name['antwort'] }}
                    </div>
                    <div class="methodencheck-subanswer" v-if="name['level'] == 2" v-bind:class="{showSubAnwser: subAnswerActivated, activeAnswer: (question['input']) ? question['input'].includes(parseInt(value)) : false}">
                      {{ name['antwort'] }}
                    </div>
                  </div>
              </div>

              <!-- SINGLECHOICE ANSWER -->
              <div  class="methodencheck-answers" v-else>
                <div class="methodencheck-answer" v-for="(name, value, index) in question['antworten']" v-bind:key="index" v-on:click="updateInputs(question, value);updateMethods(); sortMethods()" v-bind:class="{activeAnswer: question['input'] == value}">
                  {{ name }}
                </div>
              </div>
            </div>

            <!-- BUTTONS -->
            <div class="methodencheck-buttonContainer">
              <button class="methodencheck-button methodencheck-button-back button button-primary-bg" v-on:click="page--;scrollToTop('methodencheck-top', 60)"></button>
              <button class="methodencheck-button methodencheck-button-forward button button-primary-bg" v-on:click="page++;scrollToTop('methodencheck-top', 60)" v-if="question['input'] && page < Object.keys(questions).length">{{ textcomponents.weiter }}</button>
              <button class="methodencheck-button methodencheck-button-forward button button-primary-bg" v-on:click="page++;scrollToTop('methodencheck-top', 60)" v-if="question['input'] && page == Object.keys(questions).length">{{ textcomponents.fertig }}</button>
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
      <h2 class="methodencheck-questiontitle">{{ textcomponents.empfohleneMethoden }}</h2>

      <!-- CARDS WITH METHODS-DESCRIPTION -->
      <div class="methodencheck-results">
        <div v-for="method in methods" v-bind:key="method['id']">
          <div class="methodencheck-result" v-if="method['active'] === true">
            <h3 class="methodencheck-resulttitle">{{ method['bezeichnung'] }}</h3>
            <div class="methodencheck-resultWrapper">
              <div class="methodencheck-result-leftside" v-bind:class="{wide: method['dauer'] == '' && method['anzahl'] == ''}">
                <div class="methodencheck-result-link" v-if="method['link'] != ''">
                  <a v-bind:href=" method['link'] " target="_blank">{{ textcomponents.mehrErfahren}}</a>
                </div>
                <div class="methodencheck-result-beschreibung">
                  {{ method['beschreibung'] }}
                </div>
              </div>
              <div class="methodencheck-result-rightside" v-if="method['dauer'] != '' || method['anzahl'] != ''">
                <div class="methodencheck-result-dauer" v-if="method['dauer'] != ''">
                  {{ method['dauer'] }}
                </div>
                <div class="methodencheck-result-anzahl" v-if="method['anzahl'] != ''">
                  {{ method['anzahl'] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-html="showNoResults()"></div>
      </div>

      <div class="methodencheck-controls">
        <div class="methodencheck-resultbuttons">
          <button class="button button-primary-bg methodencheck-button-back" v-on:click="page--;scrollToTop('methodencheck-top', 60)"></button>
          <button class="button button-primary-bg methodencheck-button methodencheck-button-forward" v-on:click="page = 0; clearInputs(); clearMethods();scrollToTop('methodencheck-top', 60)">{{ textcomponents.zurückZumStart }}</button>
        </div>
      </div>
    </div>
    <!-- END: RESULT-PAGE -->
  </div>
</template>

<script>
import dataset from './json/data_methodencheck.json'
import datasetEn from './json/data_methodencheck_eng.json'

export default {
  name: 'Methodencheck',
  data: function() {
    return {
      page: 0,
      questions: dataset.fragen,
      methods: dataset.methoden,
      infotext: dataset.infotext,
      textcomponents: dataset.textkomponenten,
      methodsActivated: true,
      subAnswerActivated: false,
      showInfoText: false,
      language: 'de'
    }
  },
  methods: {
    // UPDATE USERINPUTS (MC AND SC QUESTIONS HAVE TO BE HANDELED DIFFERENTLY)
    // VALUES HAVE TO BE CONVERTED INTO STRINGS BECAUSE THEY'RE STRINGS IN THE JSON-FILE
    updateInputs: function(question, inputValue) {
      inputValue = parseInt(inputValue);

      // CHECK IF MC-QUESTION OR SC-QUESTION. INPUTS HAVE TO BE HANDLED DIFFERENTLY
      if (question['multiplechoice'] == true) {
        // CHECK IF CLICKED ANSWER HAS SUBANWSERS. IF NOT ADD INPUT AND DON'T SHOW ANY SUBANSWERS
        if (question['antworten'][inputValue]['level'] == 1 && !question['antworten'][inputValue]['ausklappen']) {
          question['input'] = [inputValue];
        }
        // IF THERE ARE SUBANSWERS - ADD VALUE TO ARRAY FOR TOPLEVEL ANSWER AND SUBANSWERS
        else {
          // IF TOPLEVEL-ANWSER WITH SUBANSWERS IS CLICKED, CHECK IF AN ARRAY EXISTS
          // IF NOT CREATE ARRAY WITH VALUE ELSE PUSH VALUE TO ARRAY
          if (question['antworten'][inputValue]['level'] == 1) {
            if (question['input'] && question['input'].includes(inputValue)) {
              question['input'].push(inputValue);
            }
            else {
              question['input'] = [inputValue];
            }
          }
          else {
            // CHECK IF INPUT HAS ALREADY BEEN ADDED TO INPUT ARRAY
            // IF SO, DELETE THIS INPUT FROM THE ARRAY ELSE PUSH VALUE TO ARRAY (SO USER CAN CHANGE HIS INPUTS)
            if (question['input'].includes(inputValue)) {
              var j = question['input'].indexOf(inputValue);
              question['input'].splice(j, 1);
            }
            else {
              question['input'].push(inputValue);
            }
          }
        }
      }
      // SC-QUESTION - ADD INPUT
      else {
        question['input'] = inputValue;
      }
    },
    // UPDATE METHOD-OBJECT - METHOD IS ACTIVE WHEN EVERY GIVEN ANSWERS MATCHES TO THE METHOD
    // IF ANY ANSWER DOES NOT MATCH, METHOD IN INACTIVE
    // SINCE MC AND SC INPUTS HAVE DIFFERENT DATE-TYPES, THEY NEED TO BE HANDELED DIFFERENTLY
    // BECAUSE USER CAN GO BACK AND FORTH IN TOOL AND CHANGE INPUTS THIS HAS ALWAYS TO BE EXECUTED FOR EVERY METHOD AND EVERY ANSWERS
    // ACITVE --> WHEN METHOD IS STILL POSSIBLE WITH USERS SELECTION
    // POISITON --> TO ENSURE ACTIVE METHODES ARE SHOWN FIRST IN RIGHT COLUMN WHERE ALL THE METHODS ARE DISPLAYED IN THE TOOL
    updateMethods: function() {
      var questions = Object.values(this.questions);

      this.methods.forEach(function(method) {
        method['activeQuestion'] = [];
        questions.forEach(function(question) {
          if (question['input']) {
            if (question['multiplechoice']) {
              if (question['input'].some(elem => method[question['name']].includes(elem.toString()))) {
                method['activeQuestion'].push(true)
              }
              else {
                method['activeQuestion'].push(false)
              }
            }
            else {
              if (method[question['name']].includes(question['input'].toString())) {
                method['activeQuestion'].push(true)
              }
              else {
                method['activeQuestion'].push(false)
              }
            }
          }
        })
        if (method['activeQuestion'].includes(false)) {
          method['active'] = false;
          method['position'] = 2;
        }
        else {
          method['active'] = true;
          method['position'] = 1;
        }
      }
    )},
    // SORT METHODS SO THE ONE WITH POSITION 1 ARE LISTED BEFORE POSITION 2
    sortMethods: function() {
      this.methods.sort(function (a, b) {
        return a.position - b.position
      })
    },
    // CHANGE ALL INPUTS-VALUES TO DEFAULT
    clearInputs: function() {
      var questions = Object.values(this.questions);
      questions.forEach(function(question) {
        delete question['input']
      });
      this.methodsActivated = true;
      this.subAnswerActivated = false;
    },
    // CHANGE METHOD-VALUES TO DEFAULT
    clearMethods: function() {
      this.methods.forEach(function(method) {
        method['active'] = true;
        method['position'] = 1;
      })
    },
    // CHANGE VALUE OF METHODSACTIVATED IN ORDER TO DISPLAY OR HIDE METHODS IN THE RIGHT COLUMN OF TOOL
    changeMethodeActivated: function() {
      this.methodsActivated = !this.methodsActivated;
    },
    // CHECK ALL METHODS IF THERE ARE SOME ANY ACITVE METHODS. IF NOT SHOW DEFAULT TEXT.
    showNoResults: function() {
      var results = 0;
      this.methods.forEach(function(method) {
        if (method['active'] == true) {
          results += 1;
        }
      });
      if (results == 0) {
        if (this.language == 'de') {
          return "Leider trifft keine Methode auf Ihre Eingaben zu. Sie können den UX-Methodencheck nochmals durchführen oder sich <a href='https://blog.fhgr.ch/cheval/usability-methoden/' target='_blank'>hier</a> durch die möglichen Methoden lesen."
        }
        else {
          return "Unfortunately, no method matches your input. You can run the UX-Methodencheck again or read through the possible methods <a href='https://blog.fhgr.ch/cheval/usability-methoden/' target='_blank'>here</a>."
        }
      }
    },
    // SHOW SUBANSWERES IN MC-QUESTION WHEN PARENT-QUESTION IS SELECTED
    showSubAnwser: function(question, value) {
      if (question['antworten'][value]['ausklappen']) {
        this.subAnswerActivated = !this.subAnswerActivated;
      }
      else {
        this.subAnswerActivated = false;
      }
    },
    // SCROLL TO SECTION
    scrollToTop: function(scrollSection, offset) {
      var element = document.getElementById(scrollSection);
      var top = element.offsetTop - offset;
      window.scrollTo(0, top);
    },
    // LOAD DATA IN SELECTED LANGUAGE
    loadData: function() {
      if (this.language == 'de') {
        this.questions = dataset.fragen;
        this.methods = dataset.methoden;
        this.infotext = dataset.infotext;
        this.textcomponents = dataset.textkomponenten;
      }
      else {
        this.questions = datasetEn.fragen;
        this.methods = datasetEn.methoden;
        this.infotext = datasetEn.infotext;
        this.textcomponents = datasetEn.textkomponenten;
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
  color: #817e65;
  outline: none;
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
  background: transparent;
  outline:none;
}
.button:hover {
  background: #c0beb2;
  color: #ffffff;
}
.methodencheck-page {
  position: relative;
}
.methodencheck-introImage {
  width: 100%;
  max-width: 900px;
  object-fit: cover;
  margin: 0 auto 1rem auto;
}
.methodencheck-processbar {
  display: flex;
  align-items: center;
  padding: 0 1rem 4rem 0;
}
.methodencheck-stepwrapper {
  display: flex;
  align-items: center;
  transition: 0.3s linear;
}
.methodencheck-step {
  width: 30px;
  height: 30px;
  margin: 0 15px 0 0;
  border-radius: 100%;
  background: #C4C4C4;
  color: #8D8D8D;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s linear;
}
.stepActive {
  background: #817E65;
  border: 0;
  color: #ffffff;
}
.stepDone {
  font-size: 0;
  color: #817E65;
  position: relative;
}
.stepDone::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 8px;
  background-image: url("../assets/check_white.svg");
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: center;
  width: 15px;
  height: 15px;
}
.methodencheck-endstep {
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
  background: #C4C4C4;
  transition: 0.3s linear;
  margin-left: 5px;
}
.endstepActive {
  background: #817E65;
}
.methodencheck-endstep::before {
  content: "";
  position: absolute;
  top: 6px;
  left: 8px;
  background-image: url("../assets/check.svg");
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: center;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
}
.endstepActive::before {
  content: "";
  position: absolute;
  top: 6px;
  left: 8px;
  background-image: url("../assets/check_white.svg");
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: center;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
}
.methodencheck-line {
  height: 2px;
  background: #D0D0D0;
  width: calc(100% - 60px);
  transition: 0.3s linear;
}
.lineActive {
  background: #817E65;
}
.methodencheck-buttons-start {
  display: flex;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
}
.methodencheck-linkbuttons {
  display: flex;
  align-items: center;
  max-width: 900px;
  margin: 0 auto 2rem auto;
}
.linkbutton {
  border: 0;
  padding: 0;
  cursor: pointer;
  color: #817e65;
  position: relative;
  font-size: 1rem;
  background: transparent;
  outline:none;
}
.linkbutton:hover {
  text-decoration: underline;
}
.linkbutton-more::after {
  content: "";
  position: absolute;
  top: 0.2rem;
  right: -1.2rem;
  transform: rotate(270deg);
  background: url("../assets/Arrow.svg");
  background-repeat: no-repeat;
  background-size: 0.9rem 0.9rem;
  background-position: center;
  width: 0.9rem;
  height: 0.9rem;
}
.linkbutton-less::after {
  content: "";
  position: absolute;
  top: 0.3rem;
  right: -1.2rem;
  transform: rotate(90deg);
  background: url("../assets/Arrow.svg");
  background-repeat: no-repeat;
  background-size: 0.9rem 0.9rem;
  background-position: center;
  width: 0.9rem;
  height: 0.9rem;
}
.linkbuttonActive {
  text-decoration: underline;
}
.methodencheck-languageswitch {
  display: flex;
  align-items: center;
  max-width: 900px;
  margin: 0 auto 2rem auto;
}
.methodencheck-languageswitch > span {
  margin: 0 0.2rem;
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
  max-width: 900px;
  margin: 0 auto 1.5rem auto;
}
.methodencheck-formcontainer {
  display: flex;
}
.methodencheck-buttonContainer {
  margin-top: 1rem;
  width: calc(100% - 2rem);
  display: flex;
  justify-content: flex-end;
}
.methodencheck-button {
  margin-left: 1rem;
}
.methodencheck-button-back {
  position: relative;
  width: 40px;
  height: 44px;
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
  top: 12px;
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
  width: calc(50% - 2rem);
  margin-right: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
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
  width: calc(50% - 2rem);
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
  padding: 1rem;
}
.methodencheck-subanswer {
  width: 100%;
  border: 2px solid #408198;
  border-radius: 5px;
  display: none;
  padding: 0.4rem;
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
  border: 2px solid #C4C4C4;
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
  left: 0;
  width: calc(100% - 2rem);
  height: 75px;
  background-image: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,1));
}
.activeAnswer {
  background: #408198;
  color: #ffffff;
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
  margin: 0 0 1rem 0;
}
.methodencheck-resultWrapper {
  display: flex;
}
.methodencheck-result-leftside {
  width: 70%;
  padding-right: 1rem;
  order: 1;
}
.wide {
  width: 100%;
}
.methodencheck-result-rightside {
  width: 30%;
  padding-left: 1rem;
  order: 2;
}
.methodencheck-result-link {
  margin-bottom: 1rem;
}
.methodencheck-result-dauer {
  position: relative;
  padding-left: 1.5rem;
  color: #6E798C;
}
.methodencheck-result-dauer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/dauer.svg");
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
  background-position: center;
  width: 1rem;
  height: 1rem;
}
.methodencheck-result-anzahl {
  position: relative;
  padding-left: 1.5rem;
  margin-top: 1rem;
  color: #6E798C;
}
.methodencheck-result-anzahl::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/anzahl.svg");
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
  background-position: center;
  width: 1rem;
  height: 1rem;
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
  .methodencheck-processbar {
    padding: 0 0 4rem 0;
    justify-content: space-between
  }
  .methodencheck-stepwrapper {
    width: 10% !important;
  }
  .methodencheck-line {
    display: none;
  }
  .methodencheck-step {
    width: 100%;
  }
  .methodencheck-endstep {
    width: 10%;
  }
  .methodencheck-step, .methodencheck-endstep {
    height: 5px;
    border-radius: 4px;
    background: #C4C4C4;
    margin-right: 5%;
    color: #000000;
    font-size: 0;
    margin-left: 0;
  }
  .methodencheck-step:first-child {
    margin-right: 5%;
  }
  .methodencheck-endstep {
    transform: rotate(0deg);
    margin-right: 0;
    margin-left: 0;
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
  .methodencheck-endstep::before {
    background-image: none;
    width: 0;
    height: 0;
  }
  .methodencheck-resultWrapper {
    flex-wrap: wrap;
  }
  .methodencheck-result-leftside {
    width: 100%;
    order: 2;
    padding: 0;
    margin-top: 1rem;
  }
  .methodencheck-result-rightside {
    width: 100%;
    order: 1;
    padding: 0;
  }
}
@media only screen and (max-width: 450px) {
  .methodencheck-answer:hover {
    background: #ffffff;
    color: #000000;
  }
  .methodencheck-levelanswers:hover {
    background: #ffffff;
    color: #000000;
  }
  .activeAnswer {
    background: #408198 !important;
    color: #ffffff !important;
  }
}

</style>
