<template>
  <div class="bibeval-container">

    <question></question>

		<h2>Untersuchungsbereich?</h2>

		<div v-for="cat1 in categories" :key="cat1">

			<select-button 
				class="bib-select-large"
				v-model="selectedCategories" 
				:value="cat1[0]"
			>{{ cat1[0] }} 
			</select-button>


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

<!-- 

    <div v-for="subcategory in selectedSubCategories" :key="subcategory">
      <h1>{{ subcategory }}</h1>

      <button v-for="comp in getComponents(subcategory)" :key="comp">
        {{ comp }}
      </button>
    </div>
		-->

{{ selectedCategories }}<br>
{{ selectedSubCategories }}<br>
{{ data_bibeval}}

  </div>
</template>

<script>
import question from "./question.vue";
import selectButton from "./SelectButton.vue";

import bibeval_json from './json/data_bibeval.json';

export default {
  name: "Bibeval",
  data () {
    return {
      selectedCategories: [],
      selectedSubCategories: [],
			categories: [],
			data_bibeval: bibeval_json,
    };
  },

  components: {
    question,
    selectButton,
  },

  methods: {
    getComponents(subcategory) {
      console.log(subcategory);
      return ["a", "b", "c"];
    },
  },
	mounted() {
			var categories = [];
			for(var i = 0; i < this.data_bibeval.categories_levelone.length; i++) {
				categories.push([this.data_bibeval.categories_levelone[i].name]);
				for(var x = 0; x < this.data_bibeval.categories_levelone[i].categories_leveltwo.length; x++) {
					categories[i].push([this.data_bibeval.categories_levelone[i].categories_leveltwo[x].name]);
				}
			}
			this.categories = categories;
	}
};
</script>

<style scoped>
.bib-select-large {
	height: 50px;
}
</style>
