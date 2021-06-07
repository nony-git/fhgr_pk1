<template>
    <div class="eval-content" id="bibeval-top">
        <!-- PAGE 0 / INFO PAGE -->
        <template v-if="page == 0">
          <img class="bib-header-img" src="/apps/stand1105/dist/img/bibeval_intro_image.2d5e403a.png" />
          <img class="bib-header-img" src="/apps/app_cheval/img/bibeval_intro_image.2d5e403a.png" />
          <!-- language switch -->
          <div class="eval-languageswitch">
              <button class="linkbutton" v-on:click="language = 'de'; loadLabels(); loadDefaultJson('de')" v-bind:class="{linkbuttonActive: language == 'de'}">
                Deutsch
              </button>
              <span>|</span>
              <button class="linkbutton" v-on:click="language = 'en'; loadLabels(); loadDefaultJson('en')" v-bind:class="{linkbuttonActive: language == 'en'}">
                English
              </button>
          </div>
            <p class="bibeval-text">
                {{ infotext.haupttext }}
            </p>
            <!-- read more -->
            <div class="bibeval-linkbuttons" v-if="!showInfoText">
              <button class="linkbutton linkbutton-more" v-on:click="showInfoText = true">{{ textcomponents.mehrErfahren }}</button>
            </div>
            <div class="bibeval-text" v-if="showInfoText">
              <p>{{ infotext.zusatztext.block0 }}></p>
              <h3>{{ infotext.zusatztext.block1.title }}</h3>
              <p v-for="text in infotext.zusatztext.block1.body" v-bind:key="text" v-html="text"></p>
              <h3>{{ infotext.zusatztext.block2.title }}</h3>
              <p v-for="text in infotext.zusatztext.block2.body" v-bind:key="text" v-html="text"></p>
            </div>
            <div class="bibeval-linkbuttons" v-if="showInfoText">
              <button class="linkbutton linkbutton-less" v-on:click="showInfoText = false">{{ textcomponents.weniger }}</button>
            </div>

          <!-- startbutton -->
          <div class="bibeval-buttons-start">
            <button class="bib-pagenav" v-on:click="page++;scrollToTop()">{{ textcomponents.start }}</button>
          </div>

        </template>
        <!-- PAGE 1 / SELECTION -->
        <template v-if="page == 1">
          <img v-if="showImg == true" class="bib-header-img" src="/apps/stand1105/dist/img/bibeval_intro_image.2d5e403a.png" />
            <h1>{{ textcomponents.page1h11 }}</h1>
						<!-- select bibeval or webeval -->
            <div class="bib-overview-bereiche">
              <button 
                class="bib-select-large"
                :value="website"
                @click="showImg = false; loadJson('webeval')"
                v-bind:class="{selected: wasUntersuchen == 'webeval'}">
                {{ textcomponents.bibselect1 }}
              </button>
              <button
                class="bib-select-large"
                :value="bibliotheksseite"
                @click="showImg = false; loadJson('bibeval')"
                v-bind:class="{selected: wasUntersuchen == 'bibeval'}">
                {{ textcomponents.bibselect2 }}
              </button>
            </div>
            <h1>{{ textcomponents.page1h12 }}</h1>
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
								<!-- hide/show optional components -->
                <label class="bib-optional">
                    <input type="checkbox" v-model="mandatory">
                    <span class="slider"></span>
                    {{ textcomponents.optional }}
                </label>
								<!-- displays components if subcatecory is selected -->
                <template v-if="selectedSubCategories.length > 0">
                    <div 
                      v-for="(subcategory, index3) in selectedSubCategories" 
                      :key="index3" 
                      class="bib-komponentenauswahl bib-overview-bereiche">
                        <h2>{{ subcategory }}</h2>
                        <select-button 
                          v-for="(comp, index4) in getComponents(subcategory)" 
                          :key="index4" 
                          :value="comp" 
                          :mandatory="mandatoryComponents"
                          v-model="selectedComponents"
                          v-bind:class="{hide: !mandatoryComponents.includes(comp) && mandatory == false}"
                          class="bib-select-small">
                          {{ comp }}
                        </select-button>
                    </div>
                </template>
                <p>{{ textcomponents.kataloggroesse1 }}{{ findHighest(toViewArray) }}{{ textcomponents.kataloggroesse2 }}</p>
                <p>{{ textcomponents.severityinfo }}</p>
                <table class="table-preview">
                  <tr>
                    <th class="severity-label">{{ textcomponents.severity0 }}</th>
                    <th class="severity-label">{{ textcomponents.severity1 }}</th>
                    <th class="severity-label">{{ textcomponents.severity2 }}</th>
                    <th class="severity-label">{{ textcomponents.severity3 }}</th>
                    <th class="severity-label">{{ textcomponents.severity4 }}</th>
                    <th class="severity-label">{{ textcomponents.severity5 }}</th>
                  </tr>
                  <tr>
                    <td v-for="(x, index) in 6" :key="index" class="input-cell">
                      <input type="radio" name="dummy">
                    </td>
                  </tr>
                </table>
                <button v-if="selectedComponents.length > 0" class="bib-pagenav" v-on:click="page += 1; scrollToTop()">{{ textcomponents.start }}</button>
            </template>
        </template>
        <!-- PAGE 2 / QUESTIONS -->
        <template v-if="page == 2">
            <!-- display progressbar -->
            <table class="navigator-table" cellspacing="0" cellpadding="0">
            <tr>
              <template v-for="(title,indexprogress) in progressItems">
                <td :key="title">
                <div :style="title==toViewArray[currentView].category_name?'background-color:#817e65':'background-color:#eee'" class="circle">
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
            <!-- go back to selection -->
            <div class="to-right">
                <button class="btn btn-selection" @click="page = 1">{{ textcomponents.auswahl }}<br>{{ textcomponents.aendern }}</button>
            </div>
            <!-- iterate over questionnaires and display them  -->
            <QuestionView
            :toView="toViewArray[currentView]"
            :key="currentView"
            :userAnswers="userAnswers"
            :textcomponents="textcomponents"
            ></QuestionView>
            <!-- navigate between questionnaires -->
            <div class="bibeval-buttonContainer">
              <!-- next questionnaire -->
              <button v-if="currentView != 0" class="btn btn-back" @click="back();scrollToTop()"></button>
              <button v-if="currentView == 0" class="btn btn-back" @click="page -= 1; scrollToTop()"></button>
              <!-- previous questionnaire -->
              <button v-if="currentView < toViewArray.length-1" class="btn btn-forward" @click="next();scrollToTop()">{{ textcomponents.weiter }}</button>
              <button v-if="currentView == toViewArray.length-1"
              class="btn btn-forward" @click="page += 1; scrollToTop(); auswerten()">{{ textcomponents.abschliessen }}</button>
            </div>
        </template>
        <!-- PAGE 3 / SCORE  -->
        <template v-if="page == 3">
          <h1>{{ textcomponents.page3h1 }}</h1>
          <div class="report">
            <div class="legende">
              <div class="legende-item">
                <div class="legende-icon rating-severe">
                </div>
                <div class="legende-description">
                  <p>{{ textcomponents.legendedescription0 }}</p>
                </div>
              </div>
              <div class="legende-item">
                <div class="legende-icon rating-bad">
                </div>
                <div class="legende-description">
                  <p>{{ textcomponents.legendedescription1 }}</p>
                </div>
              </div>
              <div class="legende-item">
                <div class="legende-icon rating-medium">
                </div>
                <div class="legende-description">
                  <p>{{ textcomponents.legendedescription2 }}</p>
                </div>
              </div>
              <div class="legende-item">
                <div class="legende-icon rating-good">
                </div>
                <div class="legende-description">
                  <p>{{ textcomponents.legendedescription3 }}</p>
                </div>
              </div>
              <div class="legende-spacer"></div>
              <!-- <button class="bib-pagenav btn-legende"><download-csv
                :data = "toExport">
                {{ textcomponents.download }}
              </download-csv></button> -->
             <download-csv
                class="bib-pagenav btn-legende"
                :data = "toExport">
                {{ textcomponents.download }}
              </download-csv>
            </div>
            <resultline
            v-for="(h,index,i) in auswertungArray"
                  :eingabe="h"
                  :textcomponents="textcomponents"
                  :key="index"
                  :counter="i+1"
                  :bereiche="Object.keys(auswertungArray)"
            ></resultline>
            <div class="bottom-nav">
              <button class="btn btn-back" @click="page -= 1;scrollToTop()"></button>
            </div>
          </div>
        </template>
    </div>
</template>

<!----/ Script /---->

<script>
// import components
import QuestionView from "./QuestionView.vue";
import selectButton from "./SelectButton.vue";
import resultline from './resultline.vue';

// import data files
import bibeval_json from "./json/data_bibeval.json";
import bibeval_json_en from "./json/data_bibeval_en.json";
import webeval_json from "./json/data_webeval.json";
import webeval_json_en from "./json/data_webeval_en.json";

// import language files
import labels from './json/labels_eval_de.json';
import labelsEn from './json/labels_eval_en.json';

export default {
  name: "Bibeval",
  components: {
    QuestionView,
    selectButton,
    resultline,
  },
  data: function () {
    return {
      currentView: 0,
      page: 0,
      wasUntersuchen: '',
      selectedCategories: [],
      selectedSubCategories: [],
      selectedComponents: [],
      displayedComponents: [],
      mandatory: false,
      data_tool: bibeval_json,
      bibliotheksseite: this.bibliotheksseite,
      website: this.website,
      userAnswers: {},
      userComments: {},
      showImg: true,
      answersComplete:{},
      language: 'de',
      infotext: labels.infotext,
      textcomponents: labels.textkomponenten,
      showInfoText: false,
      toExport:[],
      auswertungArray: this.auswertungArray
      };
  },
  computed: {
    // generates questionnaires
    toViewArray: function(){
      let ergebnis = [];
      // take questions of component, teilbereich & bereich overhead
      // single componente
      for (let category of bibeval_json.categories_levelone){
        for (let subcategory of category.categories_leveltwo){
          for (let component of subcategory.categories_levelthree){
            // when name of component found in array 
            if(this.selectedComponents.includes(component.name)){
              // add Bereich
              if(!ergebnis.includes(category)){
                category.category_name = category.name
                ergebnis.push(category);
              }
              // add Teilbereich
              if(!ergebnis.includes(subcategory)){
                subcategory.category_name = category.name
                subcategory.subcategory_name = subcategory.name;
                ergebnis.push(subcategory);
              }
              // set Bereich for nav & push to array
              component.category_name = category.name;
              component.subcategory_name = subcategory.name;
              component.component_name = component.name;
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
    // creates array with names of Bereich for the progressbar
    progressItems:function(){
      let categories = this.toViewArray.map(c=>c.category_name);
      let categoriesuniq = [...new Set(categories)];
      return categoriesuniq;
    },

    // loads categories and associated subcategories as a nested array
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

    // loads subcategories and associated components as a nested array
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
		},

		// loads subcategories as array
		subcategoriesFlat: function() {
			var subcategoriesFlat = [];
			for(var i = 0; i < this.subcategories.length; i++){
				subcategoriesFlat.push(this.subcategories[i][0]);
			}
			return subcategoriesFlat;
		},

    // load mandatory components as array
		mandatoryComponents: function() {
			var mandatoryComponents = [];
			for(var i = 0; i < this.data_tool.categories_levelone.length; i++) {
				for(var x = 0; x < this.data_tool.categories_levelone[i].categories_leveltwo.length; x++){
					for(var y = 0; y < this.data_tool.categories_levelone[i].categories_leveltwo[x].categories_levelthree.length; y++){
						if( this.data_tool.categories_levelone[i].categories_leveltwo[x].categories_levelthree[y].is_mandatory) {
							mandatoryComponents.push(this.data_tool.categories_levelone[i].categories_leveltwo[x].categories_levelthree[y].name);
						}
					}
				}
			}
			return mandatoryComponents;
		}
  },
  methods: {
    // jump to next questionnaire
    next: function () {
      if (this.currentView < this.toViewArray.length - 1) this.currentView++;
    },
    // jump to previous questionnaire
    back: function () {
      if (this.currentView > 0) this.currentView--;
    },
    // scrolls to top when new "page" or "currentview" is reached
    scrollToTop: function() {
      var top = document.getElementById("bibeval-top");
      top.scrollIntoView();
    },
    // loads component depending on teilbereich.
    getComponents(subcategory) {
			for(var i = 0; i < this.subcategories.length; i++) {
				if( this.subcategories[i][0] === subcategory ){
					return this.subcategories[i][1];
				}
			}
    },

		// loads bibeval as default data at start
		loadDefaultJson(lang) {
			if(lang == 'de') {
				this.data_tool = bibeval_json;
				this.selectedComponents = [];
				this.selectedCategories = [];
				this.selectedSubCategories = [];
			} else {
				this.data_tool = bibeval_json_en;
				this.selectedComponents = [];
				this.selectedCategories = [];
				this.selectedSubCategories = [];
			}
		},

		// loads JSON for webeval or bibeval based on selection
		loadJson(tool){
			this.wasUntersuchen = tool;
			if(this.language == 'de') {
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
			} else {
				if(this.wasUntersuchen == 'webeval') {
					this.data_tool = webeval_json_en;
					this.selectedComponents = [];
					this.selectedCategories = [];
					this.selectedSubCategories = [];
				} else {
					this.data_tool= bibeval_json_en;
					this.selectedComponents = [];
					this.selectedCategories = [];
					this.selectedSubCategories = [];
				}
			}
		},
    // load data in selected language
    loadLabels: function() {
      if (this.language == 'de') {
        this.infotext = labels.infotext;
        this.textcomponents = labels.textkomponenten;
      }
      else {
        this.infotext = labelsEn.infotext;
        this.textcomponents = labelsEn.textkomponenten;
      }
    },
    // find highest question number
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
    // updates the ausswertungArray
    auswerten:function(){
      let auswertung = {};
      function pushOrUpdate(arr, obj) {
        const index = arr.findIndex((e) => e.name === obj.name);
        if (index === -1) arr.push(obj);
        else {
          if(obj.schnitt < arr[index].schnitt) arr[index] = obj;
        }
      }
      for (let item of this.toExport){
        if(!(item.category_name in auswertung)){ auswertung[item.category_name] = []; }
        let current = {"name": item.subcategory_name,"schnitt": item.picked};
        if( current.name != undefined){
          pushOrUpdate(auswertung[item.category_name], current);
        }
      }
      this.auswertungArray = [];
      this.auswertungArray= auswertung;
    }
  },
  watch: {
    // updates toExport, everytime answers or comments get submitted
    userAnswers: {
      handler:function(){
        this.toExport = [];
        for(let block of this.toViewArray){
          for(let question of block.questions){
            let picked = this.userAnswers[question.name]?this.userAnswers[question.name].picked:"";
            let comment = this.userAnswers[question.name]?this.userAnswers[question.name].comment:"";
            this.toExport.push({
              category_name:block.category_name,
              subcategory_name:block.subcategory_name,
              component_name:block.component_name,
              question:question.name,
              picked:picked,
              comment:comment
            });
          }
        }
      },
    deep: true
    },

		// removes selected subcategory if category is unchecked
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
		},

		selectedSubCategories: function() {

			// creates an array containing all displayed components
			var displayedComponents = [];
			for(var i = 0; i < this.selectedSubCategories.length; i++){
				var index = this.subcategoriesFlat.indexOf(this.selectedSubCategories[i]);
				displayedComponents.push(...this.subcategories[index][1])
			}
			this.displayedComponents = [...new Set(displayedComponents)];

			// removes selected components if subcategory is unchecked
			for(var x =0; x < this.subcategories.length; x++) {
				if(this.selectedSubCategories.indexOf(this.subcategories[x][0]) === -1) {
					for(var n = 0; n < this.subcategories[x][1].length; n++){
						this.selectedComponents.splice(this.selectedComponents.indexOf(this.subcategories[x][1][n]), 1);
					}
				}
			}

		},

		// selects mandatory components if component is displayed
		displayedComponents: function() {
			for(var i = 0; i < this.displayedComponents.length; i++) {
				if(this.mandatoryComponents.includes(this.displayedComponents[i])) {
					this.selectedComponents.push(this.displayedComponents[i]);
				}
			}
			this.selectedComponents = [...new Set(this.selectedComponents)];
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
.hide {
	display: none;
}
h1 {
	margin-bottom: 30px;
}
.bib-header-img {
	margin: 0 auto 50px auto;
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
.linkbuttonActive {
  text-decoration: underline;
}
.eval-languageswitch {
  display: flex;
  align-items: center;
  max-width: 760px;
  margin: 0 auto 2rem auto;
}
.eval-languageswitch > span {
  margin: 0 0.2rem;
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
  height: 44px;
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
.bib-select-large {
	width: 100%;
	height: 60px;
	margin-bottom: 5px;
	border: 2px solid #408198;
	border-radius: 5px;
	color: #245b6f;
	transition: 0.25s;
	cursor: pointer;
}
.bib-select-large:hover,
.bib-select-small:hover {
	background: #408198;
	color: #ffffff;
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
	transition: 0.25s;
	cursor: pointer;
}
.bib-overview-bereiche {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px 10px;
	max-width: 500px;
	margin: 30px auto;
}
@media screen and (max-width: 360px) {
	.bib-overview-bereiche {
		grid-template-columns: 1fr;
	}
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
  flex: 15%;
}
.legende-description{
    flex: 95%;
    text-align: left;
    padding-left: 0em;
    font-size: 0.85rem;
    padding-left: 0.5em;
    padding-top: 0.2em;
}
.legende-spacer{
  flex:20%;
}
.btn-legende{
  flex:10%;
  background-color: #408198;
  color:white;
  border:1px solid black;
  font-size: 0.9rem;
}
.btn-legende:hover{
  color: black;
  background-color: #5c9ab1;
}
.severity-label{
  font-size:0.7rem;
  font-weight: normal;
  background-color: lightgray;
}
.rating-severe{
  background-image: url("../assets/cross.png");
  background-repeat: no-repeat;
  background-size: 25px 25px;
}
.rating-bad{
  background-image: url("../assets/doubleExclamation.png");
  background-repeat: no-repeat;
  background-size: 25px 25px;
}
.rating-medium{
  background-image: url("../assets/exclamation.png");
  background-repeat: no-repeat;
  background-size: 25px 25px;
}
.rating-good{
  background-image: url("../assets/tick.png");
  background-repeat: no-repeat;
  background-size: 25px 25px;
}
</style>
