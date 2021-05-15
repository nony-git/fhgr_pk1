<template>
  <div class="">
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
          v-for="(q, index) in questions.categories_levelone[0].questions"
          :question="q"
          :key="q.name"
          v-model="answers[index]"
      ></question>
    </table>

    {{ answers }}
  </div>
</template>

<script>
import question from "./question.vue";
// Snippet von Ellen, Datenimport todo
let data =[
  {
    "categories_levelone": [
        {
            "name": "Information und Kommunikation",
            "is_mandatory": false,
            "questions": [
                {
                    "name": "Sind die Informationsseiten klar und deutlich strukturiert, um die Anwender bei der Orientierung zu unterstützen?",
                    "is_mandatory": true 
                },
                {
                    "name": "Beschränken sich die Informationstexte auf das Wesentliche und wird für diese eine leicht verständliche Sprache sowie ein einfacher Satzbau verwendet?",
                    "is_mandatory": true 
                },
                {
                    "name": "Sind die Inhalte in allen für das jeweilige Zielpublikum relevanten Sprachen vorhanden?",
                    "is_mandatory": true 
                },
                {
                    "name": "Sind alle angebotenen Informationstexte entsprechend für das Lesen am Bildschirm aufbereitet?",
                    "is_mandatory": true 
                }
            ],
            "categories_leveltwo": [
                {
                    "name": "Kontakt und Zugang",
                    "is_mandatory": true,
                    "questions": [
                        {
                            "name": "Ist deutlich erkennbar, wer bzw. welche Institution für den Webauftritt verantwortlich ist?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Ist klar ersichtlich, unter welchen Bedingungen die Ressourcen der Bibliothek nutzbar sind (z.B. nur für Studenten oder die gesamte Bevölkerung) und welche Gebühren (z.B. Mitgliedsbeiträge) gegebenenfalls anfallen?",
                            "is_mandatory": true 
                        }
                    ],
                    "categories_levelthree": [
                        {
                            "name": "Kontaktinformationen",
                            "is_mandatory": true,
                            "questions": [
                                {
                                    "name": "Sind direkte Kontaktmöglichkeiten (z.B. per Email oder Telefon) angegeben?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist die (Post)adresse angegeben?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind die Öffnungs- und Ausleihzeiten der Bibliothek angegeben?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist angegeben, ob es einen Informationsschalter gibt, und zu welchen Zeiten dieser bedient wird?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sofern ausserhalb der Öffnungszeiten eine Selbstausleihe möglich ist, ist ersichtlich, dass dieser Dienst zur Verfügung steht, wie er funktioniert und steht eine Anleitung zur Verfügung?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind die Kontaktinformationen in allen notwendigen Sprachen verfügbar?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Wird, sofern mehrere Ansprechpartner benannt sind,  deutlich aufgeführt, für welche Belange welcher Ansprechpartner zuständig ist und gibt es eine allgemeine Adresse, an die man sich bei Unklarheiten wenden kann?",
                                    "is_mandatory": true 
                                }
                            ]
                        }

                    ]
                }
            ]
        },
        {
            "name": "Recherche im Bestand",
            "is_mandatory": false,
            "questions": [
                {
                    "name": "Ist es möglich im Kontext einer Recherche bei Problemen den jeweils zuständigen Ansprechpartner zu kontaktieren?",
                    "is_mandatory": true 
                },
                {
                    "name": "Stehen dem Anwender jederzeit angemessene Extraktionsmechanismen (z.B. Email, Print, Speichern, etc.) zur weiteren Verwertung seiner Recherchen und Treffer zur Verfügung?",
                    "is_mandatory": true 
                }
            ],        
            "categories_leveltwo": [
                {
                    "name": "Suchen & Erkunden",
                    "is_mandatory": true,
                    "questions": [
                        {
                            "name": "Ermöglichen die angebotenen Rechercheoptionen die Unterstützung unterschiedlicher Suchstrategien?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Ist während einer Recherche jederzeit ein Wechsel zwischen den unterschiedlichen Suchstrategien möglich?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Gibt es für fortgeschrittene Anwender eine Möglichkeit, über die Eingabe zusätzlicher Suchparameter gezielt in bestimmten Feldern zu suchen?",
                            "is_mandatory": false 
                        }
                    ],
                    "categories_levelthree": [
                        {
                            "name": "Einfache Suche",
                            "is_mandatory": true,
                            "questions": [
                                {
                                    "name": "Kann die Suche sowohl durch das Drücken eines dedizierten Buttons als auch per \"Enter\" gestartet werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Beherrscht die Suche eine unterschiedliche Anzahl an Suchbegriffen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist das Eingabefeld breit genug, um mehrere Suchbegriffe gleichzeitig anzeigen zu können?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es für den Nutzer ersichtlich, wie mehrere Suchbegriffe miteinander verknüpft werden (welche Operator wird per default verwendet)?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es möglich, direkt zur erweiterten Suche zu wechseln, ohne dass die getätigte Eingabe in das Suchformular hierbei verlorengeht?",
                                    "is_mandatory": true 
                                }
                            ]
                        }

                    ]
                }
            ]
        }
    ]
  }
];
    // Zugriff auf erstes Listenelement
    let teildata = data[0];

// Filter bringt sowas
let bereich = ["Information und Kommunikation"];
let teilbereich = ["Kontakt und Zugang"];
let komponente = ["Kontaktinformationen"];

// erstelle view für anzeige der fragen
let view;
if(komponente.length == 0){
  // nimm fragen von komponente, teilbereich und bereich darüber
}
else if(teilbereich.length == 0){
  // nimm nur fragen von teilbereich und bereich darüber
}
else{
  //nimm nur fragen von bereich
  for (let i=0; i < teildata.categories_levelone.length; i++){
    if(bereich.indexOf(teildata.categories_levelone[i].name)){
      view = teildata.categories_levelone[i];
    }
    else{
      //nothing
    }
    console.log(view);
    // Bereich wurde ausgewählt
    // Hier muss etwas passieren wenn mehrere Bereiche ausgewählt?
  }
}

export default {
  name: "Bibeval",
  data: function () {

    let answers = [];
    // eslint-disable-next-line
    for (var i in teildata.categories_levelone[0].questions) {
      answers.push("NaN");
    }

    return {
      answers: answers,
      questions: teildata,
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
