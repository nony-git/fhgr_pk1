<template>
    <div class="eval-content" id="bibeval-top">
        <!-- hier kommt Simons Teil der Selektion -->

        Bereich: {{ selectedCategories }}<br>
        Teilbereich: {{ selectedSubCategories }}<br>
        Komponenten: {{ selectedComponents }}<br>
				{{bibeval_json}}
        <!-- PAGE 0 / INFO PAGE -->
        <template v-if="page == 0">
          <img class="bib-header-img" src="../assets/bibeval_intro_image.png" />
          
          <!-- dev-only -->
          <button class="btn btn-forward" @click="page =3">Jump to Report</button>
          <!-- -->

          <div class="language">
            <span>DE</span>
            <label class="eval-sprachswitch">
              <input type="checkbox" v-on:click="englishActivated()">
              <span class="toggleswitch"></span>
            </label>
            <span>EN</span>
          </div>
          <span v-if="language=='de' || language==undefined">
            <p class="bibeval-text">
                Mit BibEval stellt das Schweizerische Institut für Informationswissenschaft (SII) 
                eine modular verwendbare, hierarchisch strukturierte Liste von Evaluationskriterien 
                zur Verfügung, mit welcher Websiten auf Usabilty Schwachstellen überprüft werden können.
            </p>
            <!-- ADDITIONAL INFOTEXT -->
            <div class="bibeval-linkbuttons" v-if="!showInfoText">
              <button class="linkbutton linkbutton-more" v-on:click="showInfoText = true">mehr erfahren</button>
            </div>
            <p class="bibeval-text" v-if="showInfoText">
                Mithilfe eines Fragebogens kann das BibEval Tool Ihnen helfen,
                Schwachstellen ihres Webauftritts zu evaluieren. Der hierachisch struktutierte 
                Aufbau, erlaubt es spezifsche Bereiche einer Homepage zu untersuchen. Durch 
                Klicken auf das Info-Icon erhalten sie weiterführende Informationen zur Frage. 
                Pro Fragen können Sie zuästzlich Kommentare hinzufügen.
            </p>
            <div class="bibeval-linkbuttons" v-if="showInfoText">
              <button class="linkbutton linkbutton-less" v-on:click="showInfoText = false">weniger</button>
            </div>
          </span>
          <span v-if="language=='en'">
            <p class="bibeval-text">
                With the “Usability Evaluation”-tool, the Swiss Institute of Information Science
                (SII) provides a modularly usable, hierarchically structured list of evaluation criteria. 
                The tool is supposed to identify and evaluate usability issues of corporate or library websites.
            </p>
            <!-- ADDITIONAL INFOTEXT -->
            <div class="bibeval-linkbuttons" v-if="!showInfoText">
              <button class="linkbutton linkbutton-more" v-on:click="showInfoText = true">more</button>
            </div>
            <p class="bibeval-text" v-if="showInfoText">
                The hierarchical structure allows you to analyze specific parts of a homepage. 
                At the beginning you are asked if you want to analyze a corporate website or a library website. 
                Depending on your selection, different sectors to be evaluated are available to choose.
                The matching components appear automatically when you select the sectors to be evaluated. 
                Suggested components are selected by default, but you are free to choose which sectors or components you want to evaluate. 
                You can revoke your selection at any time and select new sectors or components to your question catalog.
            </p>
            <div class="bibeval-linkbuttons" v-if="showInfoText">
              <button class="linkbutton linkbutton-less" v-on:click="showInfoText = false">less</button>
            </div>
          </span>
          <!-- BUTTON TO START TOOL -->
          <div class="bibeval-buttons-start">
            <button class="bib-pagenav" v-on:click="page++;scrollToTop()">Start</button>
          </div>

        </template>

        <!-- PAGE 1 / AUSWAHL BEREICHE -->
        <template v-if="page == 1">
          <img v-if="showImg == true" class="bib-header-img" src="../assets/bibeval_intro_image.png" />

            <h1>Was möchten Sie untersuchen?</h1>

            <div class="bib-overview-bereiche">

                <button 
                    class="bib-select-large"
                    :value="website"
                    @click="showImg = false; loadJson('webeval')"
										v-bind:class="{selected: wasUntersuchen == 'webeval'}">
                    Website <br> (Web-Eval)
                </button>

                <button
                    class="bib-select-large"
                    :value="bibliotheksseite"
                    @click="showImg = false; loadJson('bibeval')"
										v-bind:class="{selected: wasUntersuchen == 'bibeval'}">
                    Bibliotheksseite <br> (Bib-Eval)
                </button>

            </div>

            <h1>Untersuchungsbereich?</h1>

            <div class="bib-overview-bereiche">

                <!-- Loop over category level one. -->
                <div v-for="(cat1, index) in categories" :key="index">

                    <select-button 
                        class="bib-select-large"
                        v-model="selectedCategories" 
                        :value="cat1[0]">
                        {{ cat1[0] }} 
                    </select-button>

                    <!-- Loop over category level two. -->
                    <template v-if="selectedCategories.includes(cat1[0])">
                        <div v-for="(cat2, index2) in cat1[1]" :key="index2">

                            <select-button 
                                class="bib-select-small"
                                v-model="selectedSubCategories" 
                                :value="cat2">
                                {{ cat2 }} 
                            </select-button>

                        </div>
                    </template>

                </div>

                <!-- Back Button -->
                <div class="bibeval-buttonContainer">
                  <button class="bibeval-button btn-back btn button-primary-bg" v-on:click="page--;scrollToTop()"></button>
                </div>

            </div>

            <template v-if="selectedSubCategories.length > 0">

                <div class="line"></div>

                <!-- TODO: abklaeren was dieser button genau machen soll... -->
                <label class="bib-optional">
                    <input type="checkbox" v-model="mandatory">
                    <span class="slider"></span>
                    optionale Bereiche
                </label>

                <template v-if="selectedSubCategories.length > 0">

                    <div 
                            v-for="(subcategory, index3) in selectedSubCategories" 
                            :key="index3" 
                            class="bib-komponentenauswahl bib-overview-bereiche"
                        >
                        <h2>{{ subcategory }}</h2>

                        <select-button 
                                    v-for="(comp, index4) in getComponents(subcategory)" 
                                    :key="index4" 
                                    :value="comp" 
                                    v-model="selectedComponents"
                                    class="bib-select-small">
                            {{ comp }}
                        </select-button>

                    </div>

                </template>
                <p>Ihr Fragenkatalog enthält {{findHighest(toViewArray)}} Fragen.</p>
                <p>
                    In der folgenden Evaulation bewerten Sie verschiedene Komponenten 
                    wie gut  dies umgesetzt ist.
                </p>
                <table class="table-preview">
                  <tr>
                    <th class="severity-label">kein Usability-Problem</th>
                    <th class="severity-label">kleines Usability-Problem</th>
                    <th class="severity-label">mittleres Usability-Problem</th>
                    <th class="severity-label">schweres Usability-Problem</th>
                    <th class="severity-label">nicht umgesetzt, obwohl notwendig</th>
                    <th class="severity-label">keine Antwort</th>
                  </tr>
                  <tr>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                  </tr>
                </table>
                <button class="bib-pagenav" v-on:click="page += 1; scrollToTop()">Start</button>
            </template>
        </template>
        <!-- PAGE 2 / FRAGEN -->
        <template v-if="page == 2">
            <!-- Navigator, braucht noch Zustände: in Bearbeitung / fertig, inkl. Icons -->
            {{ progressItems }}
            <table class="navigator-table" cellspacing="0" cellpadding="0">
            <tr>
              <template v-for="(title,indexprogress) in progressItems">
                <td :key="title">
                <div :style="title==toViewArray[currentView].category_name?'background-color:#817e65':'background-color:#eee'" class="circle">
                  <svg v-if="todo" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                  </svg>
                  <svg v-if="todo" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                  </svg>
                </div>
                </td>
                <td :key="title">
                <div v-if="indexprogress < progressItems.length-1"
                  class="line-box"></div>
                </td>
              </template>
            </tr>
            <tr>
              <template v-for="title in progressItems">
                <td class="title-box" :key="title">
                <div class="navigator-title">{{ title }}</div>
                </td>
                <td :key="title"></td>
              </template>
            </tr>
            </table>
            <!-- Hier kommt der Button um in die Selektion zurück zu kommen-->
            <div class="to-right">
                <button class="btn btn-selection" @click="page = 1">Auswahl<br>ändern</button>
            </div>

            <!-- {{ toViewArray }} -->
            <QuestionView
            :toView="toViewArray[currentView]"
            :key="currentView"
            :userAnswers="userAnswers"
            :userComments="userComments"
            ></QuestionView>

            <!-- Navigiere zwischen Views -->
            <div class="bibeval-buttonContainer">
              <!-- rueckwaerts -->
              <button v-if="currentView != 0" class="btn btn-back" @click="back();scrollToTop()"></button>
              <button v-if="currentView == 0" class="btn btn-back" @click="page -= 1; scrollToTop()"></button>
              <!-- vorwaerts -->
              <button v-if="currentView < toViewArray.length-1" class="btn btn-forward" @click="next();scrollToTop()">Weiter</button>
              <button v-if="currentView == toViewArray.length-1"
              class="btn btn-forward" @click="page += 1; scrollToTop()">Abschliessen</button>
            </div>
            {{ userAnswers }}
        </template>
        <template v-if="page == 3">
          <h1>Auswertung</h1>
          <div class="report">
            <div class="legende">
              <div class="legende-item">
                <div class="legende-icon">
                  X
                </div>
                <div class="legende-description">
                  <p>Unbedingt zu beheben</p>
                </div>
              </div>
              <div class="legende-item">
                <div class="legende-icon">
                  !!
                </div>
                <div class="legende-description">
                  <p>Dringend zu beheben</p>
                </div>
              </div>
              <div class="legende-item">
                <div class="legende-icon">
                  !
                </div>
                <div class="legende-description">
                  <p>Empfohlen zu beheben</p>
                </div>
              </div>
              <div class="legende-item">
                <div class="legende-icon">
                  (Y)
                </div>
                <div class="legende-description">
                  <p>Nichts zu beheben</p>
                </div>
              </div>
              <div class="legende-spacer"></div>
              <button class="bib-pagenav btn-legende">Download</button>
            </div>

            <resultline
            v-for="(h,index) in testArray"
                  :eingabe="h"
                  :key= index
            ></resultline>

            <div class="bottom-nav">
              <button class="btn btn-back" @click="page -= 1;scrollToTop()"></button>
            </div>
          </div>
        </template>
    </div>
</template>

<script>
import QuestionView from "./QuestionView.vue";
import selectButton from "./SelectButton.vue";
import bibeval_json from "./json/data_bibeval.json";
import resultline from './resultline.vue';
import webeval_json from "./json/data_webeval.json";

// let toView;
export default {
  name: "Bibeval",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    QuestionView,
    selectButton,
    resultline,
  },
  data: function () {
    // toView
    return {
      // toViewArray: toViewArray,
      currentView: 0,
      userdata: bibeval_json,
      page: 0,
      wasUntersuchen: '',
      selectedCategories: [],
      selectedSubCategories: [],
      selectedComponents: [],
      mandatory: false,
      mandatoryComponents: [],
      data_tool: bibeval_json,
      bibliotheksseite: this.bibliotheksseite,
      website: this.website,
      userAnswers: {},
      userComments: {},
      showImg: true,
      answersComplete:{},
      language: this.language,
      showInfoText: false,
      testArray:{
        "Information & Kommunikation":
          {
            "Kontakt und Zugang":"4",
            "Seitenüberblick":"3"
          },
        "Recherche im Bestand":
          {
            "Suchen und Erkunden":"1",
            "Präsentation und Zugriff":"2"
          },
      }
    };
  },
  computed: {
    
    toViewArray: function(){
      let ergebnis = [];
      let selectedComponents= ["Kontaktinformationen","Kontaktformular","Personalisierte Suchmasken"];
      // nimm fragen von komponente, teilbereich und bereich darüber
      // einzelne komponente
      for (let category of bibeval_json.categories_levelone){
        for (let subcategory of category.categories_leveltwo){
          for (let component of subcategory.categories_levelthree){
            // Wenn Name der Komponente in array gefunden
            // wenn selection fertig + this. 
            if(selectedComponents.includes(component.name)){
              // add Bereich
              if(!ergebnis.includes(category)){
                category.category_name = category.name
                ergebnis.push(category);
              }
              // add Teilbereich
              if(!ergebnis.includes(subcategory)){
                subcategory.category_name = category.name
                ergebnis.push(subcategory);
              }
              // bestimme Bereich für Nav & verschiebe ins array
              component.category_name = category.name;
              ergebnis.push(component);
            }
          }
        }
      }
      let i = 1;
      for (let page of ergebnis) {
        for (let question of page.questions) {
          question.number = i;
          i++;
        }
      }
      return ergebnis;
    },

    progressItems:function(){
      let categories = this.toViewArray.map(c=>c.category_name);
      let categoriesuniq = [...new Set(categories)];
      return categoriesuniq;
    },

		categories: function() {
			let categories = [];
			for(var i = 0; i < this.data_tool.categories_levelone.length; i++) {
				categories.push([this.data_tool.categories_levelone[i].name, []]);
				for(var x = 0; x < this.data_tool.categories_levelone[i].categories_leveltwo.length; x++){
					categories[i][1].push(this.data_tool.categories_levelone[i].categories_leveltwo[x].name);
				}
			}
			return categories;
		},

		subcategories: function() {
			let subcategories = [];
			let components = [];
			for(var i = 0; i < this.data_tool.categories_levelone.length; i++) {
				for(var x = 0; x < this.data_tool.categories_levelone[i].categories_leveltwo.length; x++){
					subcategories.push([this.data_tool.categories_levelone[i].categories_leveltwo[x].name]);
					var subtemp = [];
					for(var y = 0; y < this.data_tool.categories_levelone[i].categories_leveltwo[x].categories_levelthree.length; y++){
						subtemp.push(this.data_tool.categories_levelone[i].categories_leveltwo[x].categories_levelthree[y].name);
					}
						components.push(subtemp);
				}
			}
			for(var n = 0; n < subcategories.length; n++) {
				subcategories[n].push(components[n]);
			}
			return subcategories;
		}

  },
  methods: {
    
    next: function () {
      if (this.currentView < this.toViewArray.length - 1) this.currentView++;
      console.log("currentView is "+this.currentView);
    },
    back: function () {
      if (this.currentView > 0) this.currentView--;
      console.log("currentView is "+this.currentView);
    },
    scrollToTop: function() {
      var top = document.getElementById("bibeval-top");
      top.scrollIntoView();
    },

    // Loads components based on subcategory.
    getComponents(subcategory) {
			for(var i = 0; i < this.subcategories.length; i++) {
				if( this.subcategories[i][0] === subcategory ){
					return this.subcategories[i][1];
				}
			}
    },

		// Loads json for webeval or bibeval.
		loadJson(tool){
			this.wasUntersuchen = tool;
			if(this.wasUntersuchen == 'webeval') {
				this.data_tool = webeval_json;
				this.selectedComponents = [];
				this.selectedCategories = [];
				this.selectedSubCategories = [];
			} else {
				this.data_tool= bibeval_json;
				this.selectedComponents = [];
				this.selectedCategories = [];
				this.selectedSubCategories = [];
			}
		},

    englishActivated: function(){
      if(this.language == "de" || this.language == undefined)this.language = "en";
      else this.language = "de";
      // TODO 
      //nimm englisches JSON
    },
    findHighest: function(quest){
      let highest = 0;
      for (let page of quest) {
        for (let question of page.questions) {
          if (question.number> highest){
            highest = question.number;
          }
        }
      }
      return highest;
    },

  },
  watch: {

		// Removes selected subcategory if category is unchecked.
		selectedCategories: function() {
			var notselected = [];
			for(var i = 0; i < this.categories.length; i++){
				if(!this.selectedCategories.includes(this.categories[i][0])) {
					notselected.push(...this.categories[i][1]);
				}
			}
			for(var j = 0; j < notselected.length; j++) {
				var index = this.selectedSubCategories.indexOf(notselected[j]);
				if (index !== -1) {
					this.selectedSubCategories.splice(index, 1);
				}
			}
		}

	},
}
</script>

<style scoped>
.bibeval-container {
	background: white;
	padding: 120px 100px;
}
.bib-pagenav {
	font-size: 1em;
	padding: 10px 15px;
	color: #817e65;
	border: 1px solid #c0beb2;
	cursor: pointer;
	transition: all .25s;
	background: #fff;
}

.bib-pagenav:hover {
	background: #c0beb2;
	text-decoration: none;
	color: #fff;
}

.bibeval-text {
  text-align: left;
  max-width: 760px;
  margin: 0 auto 1.5rem auto;
}

.bib-txt-left {
	text-align: left;
}
h1 {
	margin-bottom: 30px;
}

.bib-header-img {
	margin: 0 auto 50px auto;
}
.bib-select-large {
	width: 100%;
	height: 60px;
	margin-bottom: 5px;
	border: 2px solid #408198;
	border-radius: 5px;
	color: #245b6f;
	transition: 0.25s;
}
.navigator{
  display:flex;
  padding:0em 5em;
  justify-content: center;
  margin-bottom: 2em;
}
.col{
  text-align: center;
  display:flex;
  flex-direction: column;
  width:4em;
}
.col-line{
  width:6em;
}
.circle{
  border:1px solid black;
  border-radius:100%;
  height:4em;
  width:4em;
}
.circle svg{
  width: 100%;
  margin: auto;
  display: block;
}
.line{
  border:1px solid black;
  margin:0;
  margin-top: 50%;
}
.navigator-title{
  font-size: 0.7rem;
  text-align: center;
}
.fullbox td {
  width: 100%;
  height: 100%;
  margin: 0;
}
.fullbox {
  width: 100%;
}
.line-box {
  height: 1px;
  width: 5em;
  border: 1px solid black;
  margin: 0;
}
.navigator-table {
  border: none;
  margin: 0 auto 2em auto;
}
.title-box {
  width: 3em;
  max-width: 2em;
}
/* language */
.language{
  font-size:1.3em;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: end;
  max-width: 760px;
}
.eval-sprachswitch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
  margin: 0 0.5em 0.5em 0.5em;
}
.eval-sprachswitch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggleswitch {
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
.toggleswitch:before {
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
input:checked + .toggleswitch {
  background-color: #817E65;
}
input:focus + .toggleswitch {
  box-shadow: 0 0 1px #817E65;
}
input:checked + .toggleswitch:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.bibeval-buttonContainer {
  margin-top: 1rem;
  width: calc(100% - 2rem);
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
.btn {
  font-size: 1rem;
  padding: .5em 1em;
  color: #817e65;
  border: 1px solid #c0beb2;
  cursor: pointer;
  transition: all 0.25s;
  background: #ffffff;
}
.btn:hover {
  cursor: pointer;
}
.btn-back {
  position: relative;
  width: 40px;
  height: 44px;
  margin-right:1em;
}
.btn-forward {
  background: #817E65;
  color: #ffffff;
  margin-top: 0;
}
.btn-forward:hover {
  color: #000000;
}
.btn-back::before {
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
.btn-selection{
    background: #817e65;
    color: #fff;
    /* font-size: 0.8rem; */
}
.btn-selection:hover{
  color:black;
}
button:focus {
	outline: none;
}
.bibeval-linkbuttons {
  display: flex;
  align-items: center;
  max-width: 760px;
  margin: 0 auto 2rem auto;
}
.linkbutton {
  border: 0;
  padding: 0;
  cursor: pointer;
  color: #817e65;
  position: relative;
  font-size: 1rem;
  background: #ffffff;
}
.linkbutton:hover {
  text-decoration: underline;
}
.linkbutton-more::after {
  content: "";
  position: absolute;
  top: 0.3rem;
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
.bibeval-buttons-start {
  display: flex;
  align-items: center;
  max-width: 760px;
  margin: 0 auto;
}
.bottom-nav {
  margin-top: 1rem;
  width: calc(100% - 2rem);
  display: flex;
  justify-content: flex-end;
}
.to-left {
  text-align: left;
}
.to-right {
  text-align: right;
}
.bib-select-large.selected,
.bib-select-small.selected {
	background: #408198;
	color: #ffffff;
	border: 2px solid #408198;
}
.bib-select-small {
	width: 100%;
	min-height: 30px;
	margin-bottom: 5px;
	border: 2px solid #408198;
	border-radius: 5px;
	color: #245b6f;
}
.bib-overview-bereiche {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px 10px;
	max-width: 500px;
	margin: 30px auto;
}
.bib-komponentenauswahl {
	margin: 55px auto;
}
.bib-komponentenauswahl.bib-overview-bereiche {
	gap: 0px 10px;
}
.bib-komponentenauswahl h2 {
	margin-bottom: 20px;
	grid-column: 1/-1;
}
.line {
	height: 1px;
	width: 80%;
	margin: 20px auto;
	background: black;
}
.table-preview{
  width: 60%;
  margin: 1.5em auto 1.5em auto;
  text-align: left;
  border-collapse: collapse;
}
.table-preview td{
  width:100px;
  padding: 1em;
  text-align:center;
}
.table-preview th{
  width:100px;
  padding: 1em;
  text-align:left;
}
.question-col{
  width:50%;
}
.severity-label{
  font-size:0.7rem;
  font-weight: normal;
  background-color: lightgray;
}
.report{
  background-color:white;
  height:100%;
  padding:1em;
}
.report{
  background-color:white;
  height:100%;
  padding:1em;
}
.legende{
  display:flex;
}
.legende-item{
  flex:15%;
  display:flex;
}
.legende-icon{
  flex:10%;
  color:red;
}
.legende-description{
    flex: 90;
    text-align: left;
    padding-left: 1em;
    font-size: .9rem;
}
.legende-spacer{
  flex:20%;
}
.btn-legende{
  flex:20%;
  background-color: #408198;
  color:white;
  border:1px solid black;
}
.btn-legende:hover{
  color: black;
  background-color: #5c9ab1;
}
</style>
