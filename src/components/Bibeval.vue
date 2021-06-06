<template>
    <div class="eval-content" id="bibeval-top">
        <!-- PAGE 0 / INFO PAGE -->
        <template v-if="page == 0">
          <img class="bib-header-img" src="/apps/stand1105/dist/img/bibeval_intro_image.2d5e403a.png" />
          <!-- LANGUAGE SWITCH -->
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
            <!-- ADDITIONAL INFOTEXT -->
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

          <!-- BUTTON TO START TOOL -->
          <div class="bibeval-buttons-start">
            <button class="bib-pagenav" v-on:click="page++;scrollToTop()">{{ textcomponents.start }}</button>
          </div>

        </template>
        <!-- PAGE 1 / AUSWAHL BEREICHE -->
        <template v-if="page == 1">
          <img v-if="showImg == true" class="bib-header-img" src="/apps/stand1105/dist/img/bibeval_intro_image.2d5e403a.png" />

            <h1>{{ textcomponents.page1h1_1 }}</h1>

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

                <label class="bib-optional">
                    <input type="checkbox" v-model="mandatory">
                    <span class="slider"></span>
                    {{ textcomponents.optional }}
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
																		:mandatory="mandatoryComponents"
                                    v-model="selectedComponents"
																		v-bind:class="{hide: !mandatoryComponents.includes(comp) && mandatory == false }"
                                    class="bib-select-small">
                            {{ comp }}
                        </select-button>

                    </div>

                </template>
                <p>{{ textcomponents.kataloggroesse1 }}{{ findHighest(toViewArray) }}{{ textcomponents.kataloggroesse2 }}</p>
                <p>
                    {{ textcomponents.severityinfo }}
                </p>
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
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                    <td class="input-cell"><input type="radio" name="dummy"></td>
                  </tr>
                </table>
                <button v-if="selectedComponents.length > 0" class="bib-pagenav" v-on:click="page += 1; scrollToTop()">{{ textcomponents.start }}</button>
            </template>
        </template>
        <!-- PAGE 2 / FRAGEN -->
        <template v-if="page == 2">
            <!-- Navigator, braucht noch Zustände: in Bearbeitung / fertig, inkl. Icons -->
            <!-- {{ progressItems }} -->
            <table class="navigator-table" cellspacing="0" cellpadding="0">
            <tr>
              <template v-for="(title,indexprogress) in progressItems">
                <td :key="title">
                <div :style="title==toViewArray[currentView].category_name?'background-color:#817e65':'background-color:#eee'" class="circle">
                  <!-- <svg v-if="todo" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                  </svg>
                  <svg v-if="todo" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                  </svg> -->
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
                <button class="btn btn-selection" @click="page = 1">{{ textcomponents.auswahl }}<br>{{ textcomponents.aendern }}</button>
            </div>

            <!-- {{ toViewArray }} -->
            <QuestionView
            :toView="toViewArray[currentView]"
            :key="currentView"
            :userAnswers="userAnswers"
            :textcomponents="textcomponents"
            ></QuestionView>
     
            <!-- Navigiere zwischen Views -->
            <div class="bibeval-buttonContainer">
              <!-- rueckwaerts -->
              <button v-if="currentView != 0" class="btn btn-back" @click="back();scrollToTop()"></button>
              <button v-if="currentView == 0" class="btn btn-back" @click="page -= 1; scrollToTop()"></button>
              <!-- vorwaerts -->
              <button v-if="currentView < toViewArray.length-1" class="btn btn-forward" @click="next();scrollToTop()">{{ textcomponents.weiter }}</button>
              <button v-if="currentView == toViewArray.length-1"
              class="btn btn-forward" @click="page += 1; scrollToTop(); auswerten()">{{ textcomponents.abschliessen }}</button>
            </div>
            <!-- {{ toExport }} -->
        </template>
        <template v-if="page == 3">
          <h1>{{ textcomponents.page3h1 }}</h1>
          <div class="report">
            <div class="legende">
              <div class="legende-item">
                <div class="legende-icon rating-severe">
                  X
                </div>
                <div class="legende-description">
                  <p>{{ textcomponents.legendedescription0 }}</p>
                </div>
              </div>
              <div class="legende-item">
                <div class="legende-icon rating-bad">
                  !!
                </div>
                <div class="legende-description">
                  <p>{{ textcomponents.legendedescription1 }}</p>
                </div>
              </div>
              <div class="legende-item">
                <div class="legende-icon rating-medium">
                  !
                </div>
                <div class="legende-description">
                  <p>{{ textcomponents.legendedescription2 }}</p>
                </div>
              </div>
              <div class="legende-item">
                <div class="legende-icon rating-good">
                  (Y)
                </div>
                <div class="legende-description">
                  <p>{{ textcomponents.legendedescription3 }}</p>
                </div>
              </div>
              <div class="legende-spacer"></div>
              <button class="bib-pagenav btn-legende"><download-csv
                :data = "toExport">
                {{ textcomponents.download }}
              </download-csv></button>
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

<script>
import QuestionView from "./QuestionView.vue";
import selectButton from "./SelectButton.vue";
import resultline from './resultline.vue';
import bibeval_json from "./json/data_bibeval.json";
import bibeval_json_en from "./json/data_bibeval_en.json";
import webeval_json from "./json/data_webeval.json";
import webeval_json_en from "./json/data_webeval_en.json";
import labels from './json/labels_eval_de.json';
import labelsEn from './json/labels_eval_en.json';

export default {
  name: "Bibeval",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    QuestionView,
    selectButton,
    resultline,
  },
  data: function () {
    return {
      currentView: 0,
      // userdata: bibeval_json,
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
      toExportWork:[],
      // dev-only
      auswertungArrayMuster:[
        {
          "Information & Kommunikation":[
              {
                "name":"Kontakt und Zugang",
                "schnitt":"4"
              },
              {
                "name":"Seitenüberblick",
                "schnitt":"3"
              }
          ],
          "Recherche im Bestand":[
            {
              "name":"Suchen und Erkunden",
              "schnitt":"1"
            },
            {
              "name":"Präsentation und Zugriff",
              "schnitt":"2"
            }
          ]
        }
      ],
      //---//
      auswertungArray: this.auswertungArray
      };
  },
  computed: {
    
    toViewArray: function(){
      let ergebnis = [];
      // let selectedComponents= ["Kontaktinformationen","Kontaktformular","Personalisierte Suchmasken"];
      // nimm fragen von komponente, teilbereich und bereich darüber
      // einzelne komponente
      for (let category of bibeval_json.categories_levelone){
        for (let subcategory of category.categories_leveltwo){
          for (let component of subcategory.categories_levelthree){
            // Wenn Name der Komponente in array gefunden 
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
              // bestimme Bereich für Nav & verschiebe ins array
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
		},

		subcategoriesFlat: function() {
			var subcategoriesFlat = [];
			for(var i = 0; i < this.subcategories.length; i++){
				subcategoriesFlat.push(this.subcategories[i][0]);
			}
			return subcategoriesFlat;
		},

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
    
    next: function () {
      if (this.currentView < this.toViewArray.length - 1) this.currentView++;
    },
    back: function () {
      if (this.currentView > 0) this.currentView--;
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

		loadDefaultJson(lang) {
			if(lang == 'de') {
				this.data_tool = bibeval_json;
			} else {
				this.data_tool = bibeval_json_en;
			}
		},

		// Loads json for webeval or bibeval.
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
    // LOAD DATA IN SELECTED LANGUAGE
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
    // aktualisiere die Export Datei, sobald neue Antwort / Kommentar
    userAnswers: {
      // watcher muss auch nested watchen, sonst wird answer / comment änderung nicht updated
      //deep: true
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

		selectedCategories: function() {
			// Removes selected subcategory if category is unchecked.
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

			// Creates an array containing all displayed components.
			var displayedComponents = [];
			for(var i = 0; i < this.selectedSubCategories.length; i++){
				var index = this.subcategoriesFlat.indexOf(this.selectedSubCategories[i]);
				// console.log(index);
				console.log(this.selectedSubCategories[i]);
				console.log(this.subcategoriesFlat.indexOf(this.selectedSubCategories[i]));
				displayedComponents.push(...this.subcategories[index][1])
			}
			this.displayedComponents = [...new Set(displayedComponents)];

			// Removes selected components if subcategory is unchecked.
			for(var x =0; x < this.subcategories.length; x++) {
				if(this.selectedSubCategories.indexOf(this.subcategories[x][0]) === -1) {
					for(var n = 0; n < this.subcategories[x][1].length; n++){
						this.selectedComponents.splice(this.selectedComponents.indexOf(this.subcategories[x][1][n]), 1);
					}
				}
			}
		},

		displayedComponents: function() {
			// Selects mandatory components if displayed.
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
  font-size: 1.5rem;
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
.severity-label{
  font-size:0.7rem;
  font-weight: normal;
  background-color: lightgray;
}
.rating-severe{
  color:red;
}
.rating-bad{
  color:orange;
}
.rating-medium{
  color:orange;
}
.rating-good{
  color:green;
}
</style>
