<template>
  <tbody>
  <tr class="single-question">
    <!-- auf Details einer Frage zugreifen -->
    <td  rowspan="2">
      {{ question.name }}
      <!-- <span class="tooltip">
        &#8505;
        <span class="tooltiptext">{{ question.desc_de }}</span>
      </span> -->
    </td>
    <td>
      <input
        type="radio"
        id="five"
        value="5"
        :name="question.name"
        v-model="picked"
      />
    </td>
    <td>
      <input
        type="radio"
        id="four"
        value="4"
        :name="question.name"
        v-model="picked"
      />
    </td>
    <td>
      <input
        type="radio"
        id="three"
        value="3"
        :name="question.name"
        v-model="picked"
      />
    </td>
    <td>
      <input
        type="radio"
        id="two"
        value="2"
        :name="question.name"
        v-model="picked"
      />
    </td>
    <td>
      <input
        type="radio"
        id="one"
        value="1"
        :name="question.name"
        v-model="picked"
      />
    </td>
    <td>
      <input
        type="radio"
        id="zero"
        value="0"
        :name="question.name"
        v-model="picked"
      />
    </td>
    <!-- Spacer -->
    <!-- <td></td> -->
    <!-- keine Antwort -->
    <td>
      <input
      type="radio"
      id="NaN"
      value="NaN"
      :name="question.name"
      v-model="picked"
    />
    </td>
  <!-- <td>
    <span>Picked: {{ picked }}</span>
  </td> -->
  </tr>
  <tr>
    <td colspan="8" class="right-align add-comment"><textarea v-model="comment" name="" id="" cols="1" rows="1" placeholder="+ Kommentar hinzufügen"></textarea></td>
  </tr>
        <!-- dev only: um zu zeigen, dass Kommentar in comment gespeichert wird -->
        <tr v-if="comment!=''">Kommentar: {{ comment }}</tr>
        <!---->
  </tbody>
</template>

<script>
export default {
  name: "question",
  // als Prop: JSON einer einzelnen Frage wird übergeben
  props: ["question", "value"],
  data: function () {
    return {
      picked: this.value,
      comment: this.comment
    };
  },
  watch: {
    picked: function (neuerWert) {
      this.$emit("input", neuerWert);
    },

    /*updateValue: function (comment) {
      this.$emit("input", comment);
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
  padding: 1em;
  text-align:center;
  border:1px solid black;
}
.tooltip {
  position: relative;
  margin-left: 5px;
  cursor: context-menu;
  padding: 0 4px;
}
.tooltip:hover > .tooltiptext {
  display: block;
}
.tooltiptext {
  display: none;
  position: absolute;
  background: #B7B6A4;
  padding: 3px 5px;
  left: 0;
  z-index: 10;
  min-width: 90px;
}
.right-align{
  text-align:right;
}
.add-comment a{
  color:lightgray;
}
.add-comment a:hover{
  color:gray;
  text-decoration: none;
}
textarea{
  resize:none;
  font-size:0.8rem;
}
</style>
