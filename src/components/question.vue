<template>
  <tr class="single-question">
    <!-- auf Details einer Fragee zugreifen -->
    <td class="question-col">{{ question.name_de }}</td>
    <td>
      <input
      type="radio"
      id="zero"
      value="0"
      :name="question.uid"
      v-model="picked"
    />
    <!-- <label for="one">One</label> -->
    </td>
    <td>
      <input
        type="radio"
        id="one"
        value="1"
        :name="question.uid"
        v-model="picked"
      />
    
    <!-- <label for="two">Two</label> -->
    </td>
    <td>
      <input
        type="radio"
        id="two"
        value="2"
        :name="question.uid"
        v-model="picked"
      />
    </td>
    <td>
      <input
        type="radio"
        id="three"
        value="3"
        :name="question.uid"
        v-model="picked"
      />
    </td>
    <td>
      <input
        type="radio"
        id="four"
        value="4"
        :name="question.uid"
        v-model="picked"
      />
    </td>
    <td>
      <input
        type="radio"
        id="five"
        value="5"
        :name="question.uid"
        v-model="picked"
      />
    </td>
    <td>
      <span>Picked: {{ picked }}</span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "question",
  // als Prop: JSON einer einzelnen Frage wird übergeben
  props: ["question", "value"],
  data: function () {
    return {
      picked: this.value,
    };
  },
  watch: {
    picked: function (neuerWert) {
      this.$emit("input", neuerWert);
    },

    /*updateValue: function (value) {
      this.$emit("input", value);
    },*/
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
td{
  padding: 1em 0em;
  text-align:center;
  border:1px solid black;
}
</style>
