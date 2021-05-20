<template>
  <div class="bibeval-container">

    <question></question>

		<h1>Untersuchungsbereich?</h1>

		<!-- Loop over category level one. -->
		<div v-for="cat1 in categories" :key="cat1">

			<select-button 
				class="bib-select-large"
				v-model="selectedCategories" 
				:value="cat1[0]"
			>{{ cat1[0] }} 
			</select-button>

			<!-- Loop over category level two. -->
			<template v-if="selectedCategories.includes(cat1[0])">
				<div v-for="cat2 in cat1[1]" :key="cat2">

					<select-button 
						class="bib-select-small"
						v-model="selectedSubCategories" 
						:value="cat2"
					>{{ cat2 }} 
					</select-button><br />

				</div>
			</template>

	</div>

    <div v-for="subcategory in selectedSubCategories" :key="subcategory">
      <h2>{{ subcategory }}</h2>

      <select-button v-for="comp in getComponents(subcategory)" :key="comp" :value="comp" v-model="selectedComponents">
        {{ comp }}
      </select-button>

    </div>

		<!-- DEV -->
		Bereiche: {{ selectedCategories }}<br>
		Teilbereiche: {{ selectedSubCategories }}<br>
		Komponenten: {{ selectedComponents }}<br>
		{{ categories }}<br>
		{{ subcategories }}
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
      selectedCategories: [],
      selectedSubCategories: [],
      selectedComponents: [],
			categories: [],
			subcategories: [],
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
				}
			}
		}
		this.subcategories = subcategories; 

	}
};
</script>

<style scoped>
.bib-select-large {
	height: 50px;
}
</style>
