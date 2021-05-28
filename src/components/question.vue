<template>
  <tbody>
  <tr class="single-question">
    <!-- auf Details einer Frage zugreifen -->
    <td  rowspan="2" class="left-align question">
      {{ question.number}} {{ question.name }}
    </td>
    <td class="input-cell">
      <input
        type="radio"
        checked="checked"
        id="four"
        value="4"
        :name="question.name"
        v-model="picked"
      >
      <span class="checkmark"></span>
    </td>
    <td class="input-cell">
      <input
        type="radio"
        checked="checked"
        id="three"
        
        value="3"
        :name="question.name"
        v-model="picked"
      >
      <span class="checkmark"></span>
    </td>
    <td class="input-cell">
      <input
        type="radio"
        checked="checked"
        id="two"
        
        value="2"
        :name="question.name"
        v-model="picked"
      >
      <span class="checkmark"></span>
    </td>
    <td class="input-cell">
      <input
        type="radio"
        checked="checked"
        id="one"
        
        value="1"
        :name="question.name"
        v-model="picked"
      >
      <span class="checkmark"></span>
    </td>
    <td class="input-cell">
      <input
        type="radio"
        id="zero"
        
        value="0"
        :name="question.name"
        v-model="picked"
      >
      <span class="checkmark"></span>
    </td>
    <td class="input-cell">
      <input
      type="radio"
      id="NaN"
      
      value="NaN"
      :name="question.name"
      v-model="picked"
      >
      <span class="checkmark"></span>
    </td>
  </tr>
  <tr>
    <td colspan="8" class="left-align add-comment">
      <button class="btn-mini" :id='question.name+"btn"' @click="showCommentField(question.name)">+ Kommentar hinzufügen</button>
      <textarea v-model="comment" name="" class="comment" :id="question.name" cols="1" rows="1" placeholder="Kommentar hinzufügen"></textarea>
    </td>
  </tr>
        <!-- dev only: um zu zeigen, dass Kommentar in comment gespeichert wird -->
        <tr>{{ comment }}</tr>
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
  methods:{
    showCommentField: function(id){
      console.log("it works");
      var field = document.getElementById(id);
      field.style.display = "block";
      var button = document.getElementById(id+"btn");
      button.style.display = "none";
    }
  },
  watch: {
    picked: function (neuerWert) {
      this.$emit("input", neuerWert);
    },
    // Wohin muss Kommentar?
    comment: function(kommentar){
      this.$emit("input", kommentar);
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
  /* border:1px solid black; */
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
  border:1px solid;
  border-radius: 5px;
}
.comment{
  display:none;
}
.left-align{
  text-align: left;
}
.btn-mini{
  font-size:0.6rem;
  background-color:transparent;
  border:0px;
}
.btn-mini:hover{
  cursor: pointer;
}
.question{
  vertical-align: top;
}


/*https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_radio*/
/*Checkboxen in Bearbeitung*/

.input-cell{
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


/* Hide the browser's default radio button 
.input-cell input {
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}*/

.checkmark {
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.input-cell:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.input-cell input:checked ~ .checkmark {
  background-color: #2196F3;
}


</style>
