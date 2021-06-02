<template>
  <tbody>
  <tr class="single-question">
    <!-- auf Details einer Frage zugreifen -->
    <td  rowspan="2" class="left-align question">
      <strong>{{ question.number}}</strong> {{ question.name }}
    </td>

    <td class="input-cell">
      <label class="radio-container">
        <input
          type="radio"
          checked="checked"
          id="four"
          value="4"
          :name="question.name"
          v-model="picked"
        >
        <span class="checkmark"></span>
      </label>
    </td>
    <td class="input-cell">
      <label class="radio-container">
        <input
          type="radio"
          checked="checked"
          id="three"
          value="3"
          :name="question.name"
          v-model="picked"
        >
        <span class="checkmark"></span>
      </label>
    </td>
    <td class="input-cell">
      <label class="radio-container">
        <input
          type="radio"
          checked="checked"
          id="two"
          value="2"
          :name="question.name"
          v-model="picked"
        >
        <span class="checkmark"></span>
      </label>
    </td>
    <td class="input-cell">
      <label class="radio-container">
        <input
          type="radio"
          checked="checked"
          id="one"
          value="1"
          :name="question.name"
          v-model="picked"
        >
        <span class="checkmark"></span>
      </label>
    </td>
    <td class="input-cell">
      <label class="radio-container">
        <input
          type="radio"
          checked="checked"
          id="zero"
          value="0"
          :name="question.name"
          v-model="picked"
        >
        <span class="checkmark"></span>
      </label>
    </td>
    <td class="input-cell">
      <label class="radio-container">
        <input
          type="radio"
          checked="checked"
          id="NaN"
          value="NaN"
          :name="question.name"
          v-model="picked"
        >
        <span class="checkmark"></span>
      </label>
    </td>
  </tr>
  <tr>
    <td colspan="8" class="left-align add-comment">
      <button class="btn-mini" :id='question.name+"btn"' @click="showCommentField(question.name);focus(question.name)">+ {{ textcomponents.kommentar }}</button>
      <textarea v-model="comment" name="" :ref="question.name" class="comment" :id="question.name" cols="1" rows="1" :placeholder="[[textcomponents.kommentar]]"></textarea>
    </td>
  </tr>
  </tbody>
</template>

<script>

export default {
  name: "question",
  // als Prop: JSON einer einzelnen Frage wird übergeben
  props: {
      question: Object,
      value: {
          type: Object,
          default: function() {
              return { picked: Number.NaN, comment:"" }
          },
      },
      textcomponents: Object
  },

  data: function () {
    return {
      picked: this.value.picked,
      comment: this.value.comment
    };
  },
  methods:{
    showCommentField: function(id){
      // todo: schöner lösen?
      var field = document.getElementById(id);
      field.style.display = "block";
      var button = document.getElementById(id+"btn");
      button.style.display = "none";
    },
    focus: function(id){
      this.$refs[id].focus()
    }
  },
  watch: {
    picked: function () {
      this.$emit("input", {picked:this.picked,comment:this.comment,category:4});
    },
    comment: function(){
      this.$emit("input", {picked:this.picked,comment:this.comment});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.radio-container{
  display: block;
  position: relative;
  padding:0;
  margin:0;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  /* top: 0;
  left: 0; */
  height: 25px;
  width: 25px;
  background-color: #eee;
  border:1px solid black;
  border-radius: 50%;
}
/* On mouse-over, add a grey background color */
.radio-container:hover input ~ .checkmark {
  background-color: #ccc;
  border:1px solid black;
}

/* When the checkbox is checked, add a blue background */
.radio-container input:checked ~ .checkmark {
  background-color: #408198;
  border:1px solid black;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.radio-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
/* .radio-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
} */

/*---------*/
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
  padding:0.5em;
  margin-top:1em;
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

</style>
