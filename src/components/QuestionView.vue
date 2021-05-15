<template>
  <div>
    <h1>View</h1>
    <table>
      <tr>
        <th class="question-col">Frage</th>
        <th colspan="6">
          <div class="flex">
            <p class="align-left flexed">Voll und ganz</p>
            <p class="align-right">Überhaupt nicht</p>
          </div>
        </th>
        <th class="centered">keine Antwort</th>
      </tr>
        <question
          v-for="(q, index) in questions.questions"
          :question="q"
          :key="q.name"
          v-model="answers[index]"
      ></question>
    </table>

    {{ answers }}
  </div>
</template>

<script>
import question from './question.vue';

export default {
  components: { question },
  name: "QuestionView",
  props:["toView"],
   data: function () {
    let answers = [];
    //eslint-disable-next-line
    for (var i in this.toView.questions) {
      answers.push("NaN");
    }
    return {
      answers: answers,
      questions: this.toView,
    };
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
table{
  text-align: left;
  border-collapse: collapse;
  border:1px solid black;
  width:100%;
}
td, th{
  width:100px;
  padding: 1em;
  border:1px solid black;
}
.question-col{
  width:50%;
}
.centered{
  text-align: center;
}
.align-left{
  text-align:left;
}
.align-right{
  text-align:right;
}
.flex{
  display:flex !important;
}
.flexed{
  flex:50%;
}
</style>
