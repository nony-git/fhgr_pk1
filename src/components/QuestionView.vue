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
        <th class="severity-label">keine Antwort</th>
      </tr>
      <question
        v-for="q in questions.questions"
        :question="q"
        :key="q.name"
        v-model="userAnswers[q.name]"
        >
      </question>
    </table>
  </div>
</template>

<script>
import question from './question.vue';

export default {
  components: { question },
  name: "QuestionView",
  props:["toView","userAnswers"],
  data: function () {
    return {
      questions: this.toView,
    };
  },
  watch: {
    answers: function () {
      this.$emit("update", this.answers);
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
}
</style>
