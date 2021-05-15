<template>
  <div class="hello">

    <question></question>

		<div v-for="item in categories" :key="item">

			<select-button 
				v-model="selectedCategories" 
				:value="item[0]"
			>{{ item[0] }} 
			</select-button>


			<template v-if="selectedCategories.includes(item[0])">
				<div v-for="temp in item[1]" :key="temp">

					<select-button 
						v-model="selectedSubCategories" 
						:value="temp"
					>{{ temp }} 
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
{{ selectedSubCategories }}

  </div>
</template>

<script>
import question from "./question.vue";
import selectButton from "./SelectButton.vue";

import data_bibeval from './json/data_bibeval.json';

export default {
  name: "Bibeval",
  data () {
    return {
      selectedCategories: [],
      selectedSubCategories: [],
			categories: [],
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

	created() {
			var categories = [];
			for(var i = 0; i < data_bibeval.categories_levelone.length; i++) {
				categories.push([data_bibeval.categories_levelone[i].name]);
				for(var x = 0; x < data_bibeval.categories_levelone[i].categories_leveltwo.length; x++) {
					categories[i].push([data_bibeval.categories_levelone[i].categories_leveltwo[x].name]);
				}
			}
			this.categories = categories;
	}
};
</script>

<style scoped>

</style>
