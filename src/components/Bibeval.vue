<template>
  <div class="bibeval-container">

    <question></question>

		<h1>Was möchten Sie untersuchen?</h1>
		<div class="bib-overview-bereiche">

			<!-- TODO: sollten hier unteschiedliche json fragenkataloge geladen werden? -->
			<button 
				class="bib-select-large"
				:value="website">
				Website 
			</button>

			<button
				class="bib-select-large"
				:value="bibliotheksseite">
				Bibliotheksseite
			</button>

		</div>

		<h1>Untersuchungsbereich?</h1>

		<div class="bib-overview-bereiche">

			<!-- Loop over category level one. -->
			<div v-for="cat1 in categories" :key="cat1">

				<select-button 
					class="bib-select-large"
					v-model="selectedCategories" 
					:value="cat1[0]">
					{{ cat1[0] }} 
				</select-button>

				<!-- Loop over category level two. -->
				<template v-if="selectedCategories.includes(cat1[0])">
					<div v-for="cat2 in cat1[1]" :key="cat2">

						<select-button 
							class="bib-select-small"
							v-model="selectedSubCategories" 
							:value="cat2">
							{{ cat2 }} 
						</select-button>

					</div>
				</template>

			</div>

		</div>

		<template v-if="selectedCategories.length > 0">

			<div class="line"></div>

			<label class="">
				<input type="checkbox" v-model="mandatory">
				<span class="slider"></span>
				optionale Bereiche
			</label>


		<template v-if="selectedSubCategories.length > 0">

    <div 
			v-for="subcategory in selectedSubCategories" 
			:key="subcategory" 
			class="bib-komponentenauswahl bib-overview-bereiche"
		>
      <h2>{{ subcategory }}</h2>

      <select-button 
				v-for="comp in getComponents(subcategory)" 
				:key="comp" 
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
				auf einer Skala von 5 (voll und ganz) bis 0 (überhaupt nicht) wie gut  dies umgesetzt ist.
			</p>
			<p>[ Beispiel Skala... ]</p>
		</template>

  </div>
</template>

<script>
import question from "./question.vue";
import selectButton from "./SelectButton.vue";

import bibeval_json from "./json/data_bibeval.json";

export default {
  name: "Bibeval",

  data () {
    return {
			wasUntersuchen: [],
      selectedCategories: [],
      selectedSubCategories: [],
      selectedComponents: [],
			categories: [],
			subcategories: [],
			mandatory: false,
			mandatoryComponents: [],
			data_bibeval: bibeval_json,
    };
  },

  components: {
    question,
    selectButton,
  },

  methods: {
    getComponents(subcategory) {
			for(var i = 0; i < this.subcategories.length; i++) {
				if( this.subcategories[i][0] === subcategory ){
					return this.subcategories[i][1];
				}
			}
    },
  },

	mounted() {

		// Load categories as a nested array.
		var categories = [];
		for(var i = 0; i < this.data_bibeval.categories_levelone.length; i++) {
			categories.push([this.data_bibeval.categories_levelone[i].name, []]);
			for(var x = 0; x < this.data_bibeval.categories_levelone[i].categories_leveltwo.length; x++) {
				categories[i][1].push(this.data_bibeval.categories_levelone[i].categories_leveltwo[x].name);
			}
		}
		this.categories = categories;


		// Load subcategories (Komponenten) as a nested array.
		var subcategories = [];
		for(var y = 0; y < this.data_bibeval.categories_levelone.length; y++) {
			for(var z = 0; z < this.data_bibeval.categories_levelone[y].categories_leveltwo.length; z++) {
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

	}
};
</script>

<style scoped>

h1 {
	margin-bottom: 30px;
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

.bib-select-large.selected,
.bib-select-small.selected {
	background: #408198;
	color: #ffffff;
	border: 2px solid #408198;
}

.bib-select-small {
	width: 100%;
	height: 30px;
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

button:focus {
	outline: none;
}

</style>
