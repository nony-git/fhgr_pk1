<template>
    <div class="eval-content">
        <!-- hier kommt Simons Teil der Selektion -->

        Bereich: {{ selectedCategories }}<br>
        Teilbereich: {{ selectedSubCategories }}<br>
        Komponenten: {{ selectedComponents }}<br>
        <!-- PAGE 0 / INFO PAGE -->
        <template v-if="page == 0">

            <img class="bib-header-img" src="../assets/bibeval_intro_image.png" />

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

          <!-- BUTTON TO START TOOL -->
          <div class="bibeval-buttons-start">
            <button class="bib-pagenav" v-on:click="page += 1">Start</button>
          </div>

        </template>

        <!-- PAGE 1 / AUSWAHL BEREICHE -->
        <template v-if="page == 1">
          <img v-if="showImg == true" class="bib-header-img" src="../assets/bibeval_intro_image.png" />

            <h1>Was möchten Sie untersuchen?</h1>

            <div class="bib-overview-bereiche">

                <!-- TODO: unteschiedliche json fragenkataloge laden? -->
                <button 
                    class="bib-select-large"
                    :value="website"
                    @click="showImg = false">
                    Website <br> (Web-Eval)
                </button>

                <button
                    class="bib-select-large"
                    :value="bibliotheksseite"
                    @click="showImg = false">
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
                <p>Ihr Fragenkatalog enthält [TODO] Fragen.</p>
                <p>
                    In der folgenden Evulation bewerten Sie verschiedene Komponenten 
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
                <button class="bib-pagenav" v-on:click="page += 1">Start</button>
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
                <div :style="title==toViewArray[currentView].category_name?'background-color:#817e65':'background-color:#eee'" class="circle"></div>
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
                <button class="btn btn-selection" @click="page = 1">Auswahl ändern</button>
            </div>

            <!-- {{ toViewArray }} -->
            <QuestionView
            :toView="toViewArray[currentView]"
            :key="currentView"
            :userAnswers="userAnswers"
            ></QuestionView>

            <!-- Navigiere zwischen Views -->
            <div class="bottom-nav to-left">
              <!-- rueckwaerts -->
              <button v-if="currentView != 0" class="btn btn-back" @click="back()"></button>
              <button v-if="currentView == 0" class="btn btn-back" @click="page -= 1"></button>
              <!-- vorwaerts -->
              <button v-if="currentView < toViewArray.length-1" class="btn btn-forward" @click="next()">Weiter</button>
              <button v-if="currentView == toViewArray.length-1"
              class="btn btn-forward" @click="page += 1">Abschliessen</button>
            </div>
            {{ userAnswers }}
        </template>
        <template v-if="page == 3">
          <h1>Auswertung</h1>
          TODO
          <button class="bib-pagenav">Export</button>
          <div class="bottom-nav to-left">
            <button class="btn btn-back" @click="page -= 1"></button>
          </div>
        </template>
    </div>
</template>

<script>
import QuestionView from "./QuestionView.vue";
import selectButton from "./SelectButton.vue";
import bibeval_json from "./json/data_bibeval.json";

// let toView;
export default {
  name: "Bibeval",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    QuestionView,
    selectButton,
  },
  data: function () {
    // toView
    return {
      // toViewArray: toViewArray,
      currentView: 0,
      userdata: bibeval_json,
      page: 0,
      wasUntersuchen: [],
      selectedCategories: [],
      selectedSubCategories: [],
      selectedComponents: [],
      categories: [],
      subcategories: [],
      mandatory: false,
      mandatoryComponents: [],
      data_bibeval: bibeval_json,
      bibliotheksseite: this.bibliotheksseite,
      website: this.website,
      userAnswers: {},
      showImg: true,
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
    // Loads components based on subcategory.
    getComponents(subcategory) {
			for(var i = 0; i < this.subcategories.length; i++) {
				if( this.subcategories[i][0] === subcategory ){
					return this.subcategories[i][1];
				}
			}
    },
  },
  mounted:function(){
    // Loads categories and subcategories (Komponenten) as a nested arrays.
		var subcategories = [];
		var categories = [];

		for(var y = 0; y < this.data_bibeval.categories_levelone.length; y++) {
			categories.push([this.data_bibeval.categories_levelone[y].name, []]);
			for(var z = 0; z < this.data_bibeval.categories_levelone[y].categories_leveltwo.length; z++) {
				categories[y][1].push(this.data_bibeval.categories_levelone[y].categories_leveltwo[z].name);
				subcategories.push([this.data_bibeval.categories_levelone[y].categories_leveltwo[z].name, []]);
				for(var a = 0; a < this.data_bibeval.categories_levelone[y].categories_leveltwo[z].categories_levelthree.length; a++) {
					subcategories[y][1].push(this.data_bibeval.categories_levelone[y].categories_leveltwo[z].categories_levelthree[a].name)
					if ( this.data_bibeval.categories_levelone[y].categories_leveltwo[z].categories_levelthree[a].is_mandatory ) {
						this.mandatoryComponents.push(this.data_bibeval.categories_levelone[y].categories_leveltwo[z].categories_levelthree[a].name);
					}
				}
			}
		}

		this.subcategories = subcategories; 
		this.categories = categories;
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

.bibeval-buttonContainer {
  margin-top: 1rem;
  width: calc(100% - 2rem);
  display: flex;
  justify-content: flex-end;
}

.btn {
  font-size: 1rem;
  padding: 10px 15px;
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
  background: url(../assets/Arrow.svg) no-repeat;
  position: relative;
  width: 40px;
  height: 44px;
}

.btn-forward {
  background: #817E65;
  color: #ffffff;
  margin-top: 0;
}

.btn-forward:hover {
  color: #000000;
}

button:focus {
	outline: none;
}

.btn-selection{
    background: #817e65;
    color: #fff;
    font-size: 0.8rem;
}

.bibeval-linkbuttons {
  display: flex;
  align-items: center;
  max-width: 760px;
  margin: 0 auto 2rem auto;
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

.linkbutton {
  border: 0;
  padding: 0;
  cursor: pointer;
  color: #817e65;
  position: relative;
  font-size: 1rem;
  background: #ffffff;
}

.bibeval-buttons-start {
  display: flex;
  align-items: center;
  max-width: 760px;
  margin: 0 auto;
}

.bottom-nav {
  padding: 0em 4em;
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
</style>
