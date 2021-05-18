<template>
  <div class="" id="views">
    <!-- <QuestionView v-bind:toView="toView"></QuestionView> -->
     <QuestionView
          v-for="(view,index) in toViewArray"
          :toView="view"
          :key="index"
      ></QuestionView>
  </div>
</template>

<script>
import QuestionView from "./QuestionView.vue";

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
    // Zugriff auf erstes Listenelement, da in Liste
    let teildata = data[0];

// Filter bringt sowas
let bereich = [];//["Information und Kommunikation"];
let teilbereich = [];//["Kontakt und Zugang"];
let komponente = ["Einfache Suche"]; //["Kontaktinformationen","Einfache Suche"];

// finde raus welche Fragen angezeigt werden müssen und wirf sie ins Array
let toViewArray = [];
function chooseViews(){
  let arrayIndex = 0;
  let addView;
  // case: Komponente ist gewählt
  if(komponente.length > 0){
    // nimm fragen von komponente, teilbereich und bereich darüber

    // einzelne komponente
    for (let f=0; f < teildata.categories_levelone.length; f++){
      for (let g=0; g < teildata.categories_levelone[f].categories_leveltwo.length; g++){
        for (let h=0; h < teildata.categories_levelone[f].categories_leveltwo[g].categories_levelthree.length; h++){
          // Wenn Name der Komponente in Filter array gefunden
          if(komponente.indexOf(teildata.categories_levelone[f].categories_leveltwo[g].categories_levelthree[h].name) !=-1){
            
            // füge einzelne view in view-Array ein mit index ein
            addView = teildata.categories_levelone[f].categories_leveltwo[g].categories_levelthree[h];
            // toViewArray[f+"."+g+"."+h]=toView;
            toViewArray[arrayIndex]=addView;
            arrayIndex++;

            // add Teilbereich
            addView = teildata.categories_levelone[f].categories_leveltwo[g];
            // toViewArray[f+"."+g]=toViewTBereich;
            toViewArray[arrayIndex]=addView;
            arrayIndex++;
    
            // add Bereich
            addView = teildata.categories_levelone[f];
            // toViewArray[f]=toViewBereich;
            toViewArray[arrayIndex]=addView;
            arrayIndex++;
          }
        }
      }
    }
  }
  // case: Teilbereich ist gewählt
  else if(teilbereich.length > 0){
    // nimm nur fragen von teilbereich und bereich darüber
    for (let f=0; f < teildata.categories_levelone.length; f++){
      for (let g=0; g < teildata.categories_levelone[f].categories_leveltwo.length; g++){
        // Wenn Name der Komponente in Filter array gefunden
        if(teilbereich.indexOf(teildata.categories_levelone[f].categories_leveltwo[g].name) !=-1){
          
          // füge einzelne view in view-Array mit index ein
          addView = teildata.categories_levelone[f].categories_leveltwo[g];
          // toViewArray[f+"."+g]=toViewTBereich;
          toViewArray[arrayIndex]=addView;
          arrayIndex++;

          // add Bereich
          addView = teildata.categories_levelone[f];
          // toViewArray[f]=toViewBereich;
          toViewArray[arrayIndex]=addView;
          arrayIndex++;
        }
      }
    }
  }
  // case: bring nur Fragen des Bereichs
  else{
    //nimm nur fragen von bereich
    for (let f=0; f < teildata.categories_levelone.length; f++){
      // Wenn Name der Komponente in Filter array gefunden
      if(bereich.indexOf(teildata.categories_levelone[f].name) !=-1){
        
        // füge einzelne view in view-Array mit index ein
        addView = teildata.categories_levelone[f];
        // toViewArray[f+"."+g]=toViewTBereich;
        toViewArray[arrayIndex]=addView;
        arrayIndex++;
      }
    }
  }
}
chooseViews();

// let toView;
export default {
  name: "Bibeval",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    QuestionView,
  },
  data:function(){
    // toView
    return{
      // toView:toView,
      toViewArray:toViewArray
    }
  }
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

</style>
