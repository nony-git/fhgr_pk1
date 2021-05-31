<template>
  <div>
    <table>
      <tr>
        <th class="question-col">Frage</th>
        <th class="severity-label">kein Usability-Problem</th>
        <th class="severity-label">kleines Usability-Problem</th>
        <th class="severity-label">mittleres Usability-Problem</th>
        <th class="severity-label">schweres Usability-Problem</th>
        <th class="severity-label">nicht umgesetzt, obwohl notwendig</th>
        <th class="severity-label">keine Antwort <span class="tooltip" @click="toggleTip()"></span></th>
      </tr>
      <question
        v-for="q in questions.questions"
        :question="q"
        :key="q.name"
        :textcomponents ="textcomponents"
        v-model="userAnswers[q.name]"
        >
      </question>
    </table>
    <div class="tooltiptext" v-if="showTooltip==true" @click="showTooltip=false">
        <h4>{{ textcomponents.severity0 }}:</h4>
        <p>{{ textcomponents.severity0tip }}</p>
        <h4>{{ textcomponents.severity1 }}:</h4>
        <p>{{ textcomponents.severity1tip }}</p>
        <h4>{{ textcomponents.severity2 }}</h4>
        <p>{{ textcomponents.severity2tip }}</p>
        <h4>{{ textcomponents.severity3 }}:</h4>
        <p>{{ textcomponents.severity3tip }}</p>
        <h4>{{ textcomponents.severity4 }}:</h4>
        <p>{{ textcomponents.severity4tip }} </p>
        <h4>{{ textcomponents.severity5 }}</h4>
        <p>{{ textcomponents.severity4tip }}</p>
      </div>
  </div>
</template>

<script>
import question from './question.vue';


export default {
  components: { question },
  name: "QuestionView",
  props:["toView","userAnswers","userComments", "textcomponents"],
  data: function () {
    return {
      questions: this.toView,
      showTooltip: this.showTooltip,
    };
  },
  methods:{
    toggleTip: function(){
      if (this.showTooltip == true) this.showTooltip = false;
      else this.showTooltip = true;
    }
  },
  watch: {
    answers: function () {
      this.$emit("update", this.answers);
    },
    comments: function () {
      this.$emit("update", this.comments);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{
  margin-bottom: 1em;
}
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
table{
  text-align: left;
  border-collapse: collapse;
  /* border:1px solid black; */
  width:100%;
}
td, th{
  width:100px;
  padding: 1em;
  /* border:1px solid black; */
}
.question-col{
  width:50%;
}
.centered{
  text-align: center;
}
.to-left{
  text-align:left;
}
.to-right{
  text-align:right;
}
.flex{
  display:flex !important;
}
.flexed{
  flex:50%;
}
.btn{
  padding:0.25em;
}
.btn:hover{
  cursor: pointer;
}
.btn-back{
  background: url(../assets/Arrow.svg) no-repeat;
  padding: 1em;
  border:1px solid #817e65;
  /* absoluter pfad für live version */
  /* background: url(https://blog.fhgr.ch/apps/img/Arrow.77733ac5.svg); */
}
.btn-forward{
  background: #817e65;
  color: #fff;
  padding:0.25em 0.5em;
}
.bottom-nav{
  padding:0em 4em;
}
.severity-label{
  font-size:0.7rem;
  font-weight: normal;
  background-color: lightgray;
  position: relative;
}
.tooltip {
  position: absolute;
  margin: 0 5px;
  cursor: context-menu;
  padding: 0 4px;
  height: 100%;
  width: 20px;
  top:-2.5em;
  right:0;
}
.tooltip:hover{
  cursor: pointer;
}
.tooltip::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 15px;
  height: 15px;
  margin-top: -8px;
  background-image: url("../assets/info_icon_black.svg");
  background-repeat: no-repeat;
  background-size: 12px 12px;
  background-position: center;
}
.tooltip:hover > .tooltiptext {
  display: block;
}
.tooltiptext {
  position: absolute;
  background: #B7B6A4;
  padding: 5px 8px;
  right: 0;
  z-index: 10;
  font-size: 0.8rem;
  width: 15%;
  text-align: left;
  top: 35em;
}
</style>
