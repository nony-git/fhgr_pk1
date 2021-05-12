<template>
  <div class="">
    <!-- Beispiel: mehrere Question-Komponenten anzeigen -->
    <table>
      <tr>
        <th class="question-col">Frage</th>
        <th>gar nicht</th>
        <th></th>
        <th></th>
        <th></th>
        <th>absolut</th>
        <th>k.A.</th>
      </tr>
      <question
      v-for="(q, index) in questions"
      :question="q"
      :key="q.uid"
      v-model="answers[index]"
    ></question>
    </table>

    {{ answers }}
  </div>
</template>

<script>
import question from "./question.vue";

let data = [
  {
    uid: "1",
    pid: "754",
    tstamp: "1353072831",
    lmuser_id: "103",
    crdate: "1345708532",
    cruser_id: "103",
    deleted: "0",
    hidden: "0",
    category_id: "2",
    name_de: '"Sind die Informationsseiten klar und deutlich strukturiert',
    '"name_en"': ' um die Anwender bei der Orientierung zu unterstützen?"',
    '"desc_de"':
      '"Is the information section well-structured assisting the user in his orientation?"',
    '"desc_en"': '"Es wird bspw. mit Überschriften unterschiedlichen Grades',
    is_mandatory: " Listen",
    order_number:
      ' etc. gearbeitet. Bei längeren Texten bieten sich Textmarken (\\"Anker\\") an',
  },
  {
    uid: "2",
    pid: "754",
    tstamp: "1353073026",
    lmuser_id: "103",
    crdate: "1345708532",
    cruser_id: "103",
    deleted: "0",
    hidden: "0",
    category_id: "2",
    name_de:
      '"Beschränken sich die Informationstexte auf das Wesentliche und wird für diese eine leicht verständliche Sprache sowie ein einfacher Satzbau verwendet?"',
    '"name_en"':
      '"Does the information provided confine itself to the essentials and are the documents easy to follow (e.g. a simple writing style should be used)?"',
    '"desc_de"':
      '"Überflüssige Informationen und Fachwörter werden vermieden."',
    '"desc_en"': '"Unnecessary information and technical terms are avoided."',
    is_mandatory: "1",
    order_number: "2",
  },
  {
    uid: "3",
    pid: "754",
    tstamp: "1353073026",
    lmuser_id: "103",
    crdate: "1345708532",
    cruser_id: "103",
    deleted: "0",
    hidden: "0",
    category_id: "2",
    '"name_de"':
      '"Beschränken sich die Informationstexte auf das Wesentliche und wird für diese eine leicht verständliche Sprache sowie ein einfacher Satzbau verwendet?"',
    '"name_en"':
      '"Does the information provided confine itself to the essentials and are the documents easy to follow (e.g. a simple writing style should be used)?"',
    '"desc_de"':
      '"Überflüssige Informationen und Fachwörter werden vermieden."',
    '"desc_en"': '"Unnecessary information and technical terms are avoided."',
    is_mandatory: "1",
    order_number: "2",
  },
];

export default {
  name: "Bibeval",
  data: function () {
    let answers = [];

    for (let i = 0; i < data.length; i++) {
      answers.push(0);
    }

    return {
      answers: answers,
      // Zum Testen mal zwei Beispielfragen, TODO aktuelles JSON-Format verwenden
      questions: data,
    };
  },
  components: {
    question,
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
}
td, th{
  width:100px;
  padding: 1em 0em;
  border:1px solid black;
}
.question-col{
  width:500px;
}
</style>
