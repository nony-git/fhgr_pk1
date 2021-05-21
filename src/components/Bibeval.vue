<template>
  <div class="" id="views">
    <!-- Navigator: noch nicht ideal -->
    <table class="navigator-table" cellspacing="0" cellpadding="0">
      <tr class="full-box">
        <td>
          <div class="circle" id="navcircle1"></div>
        </td>
        <td>
          <div class="line-box" id="line1"></div>
        </td>
        <td>
          <div class="circle" id="navcircle2"></div>
        </td>
        <td>
          <div class="line-box" id="line2"></div>
        </td>
        <td>
          <div class="circle" id="navcircle3"></div>
        </td>
        <td>
          <div class="line-box" id="line3"></div>
        </td>
        <td>
          <div class="circle" id="navcircle4"></div>
        </td>
      </tr>
      <tr>
        <td class="title-box">
          <div class="navigator-title" id="navtitle1">Information und Kommunikation</div>
        </td>
        <td></td>
        <td class="title-box">
          <div class="navigator-title" id="navtitle2">Recherche im Bestand</div>
        </td>
        <td></td>
        <td class="title-box">
          <div class="navigator-title" id="navtitle3">Personalisierung</div>
        </td>
        <td></td>
        <td class="title-box">
          <div class="navigator-title" id="navtitle4">Nutzerpartizipation</div>
        </td>
      </tr>
    </table>
    <!-- <QuestionView v-bind:toView="toView"></QuestionView> -->
    <QuestionView
      :toView="toViewArray[currentView]"
      :key="currentView"
      @update="newAnswer(currentView, $event)"
    ></QuestionView>

    <!-- <div class="test"> {{ toViewArray[currentView] }} </div> -->
    {{ userdata }}

    <!-- Navigiere zwischen Views -->
    <div class="bottom-nav to-left">
      <button class="btn btn-back" @click="back(); checkNav(toViewArray[currentView]['bereich'])"></button>
      <button class="btn btn-forward" @click="next(); checkNav(toViewArray[currentView]['bereich'])">Weiter</button>
    </div>
  </div>
</template>

<script>
import QuestionView from "./QuestionView.vue";

// Biblio-Snippet von Ellen, Datenimport todo
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
                        },
                        {
                            "name": "Kontaktformular",
                            "is_mandatory": false,
                            "questions": [
                                {
                                    "name": "Ist das Formular übersichtlich gestaltet und sind alle  Felder vorhanden, die zur Kontaktaufnahme notwendig sind?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind alle Formularfelder korrekt beschriftet?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Steht in allen Formularfeldern ausreichend Platz zur Eingabe zur Verfügung?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sofern Eingaben in bestimmten Formaten notwendig sind, bekommt der Anwender eine Rückmeldung, wie die Eingabe zu tätigen ist?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind Felder, die zwingend ausgefüllt werden müssen, entsprechend gekennzeichnet?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Enthält das Formular ausschliesslich solche Felder, die für die Beantwortung einer Anfrage notwendig sind?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Wird nach dem Absenden des Formulars eine Rückmeldung gegeben?",
                                    "is_mandatory": true 
                                }
                            ]
                        }

                    ]
                },
                {
                    "name": "Seitenüberblick",
                    "is_mandatory": true,
                    "questions": [
                        {
                            "name": "Sind die Navigationselemente als solche klar erkennbar?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Ermöglichen die verwendeten Navigationselemente einen schnellen Überblick über die der Seite zugrundeliegende Struktur und die zur Verfügung stehenden Funktionalitäten?",
                            "is_mandatory": true 
                        }
                    ],
                    "categories_levelthree": [
                        {
                            "name": "Sitemap",
                            "is_mandatory": false,
                            "questions": [
                                {
                                    "name": "Sind die einzelnen Hierarchieebenen optisch klar voneinander getrennt, so dass die Darstellung übersichtlich wirkt?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Bietet die Sitemap einen direkten Zugriff auf die angeführten Seiten?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind die einzelnen Menüpunkte inhaltlich gut voneinander unterscheidbar?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Wird der Link zur Sitemap auf jeder Seite der Website angezeigt und ist er konsistent positioniert?",
                                    "is_mandatory": true 
                                }
                            ]
                        },
                        {
                            "name": "Seitensuche",
                            "is_mandatory": false,
                            "questions": [
                                {
                                    "name": "Ist die Sitesearch optisch klar von der Suche im Bibliotheksbestand abgegrenzt?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Wird die Sitesearch auf jeder Seite der Website angezeigt und wird sie konsistent in der Seite platziert?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann die Suche sowohl durch einen entsprechenden Button sowie durch das Drücken der \"Enter\"-Taste gestartet werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Erlaubt die Suche Anfragen mit einer unterschiedlichen Anzahl an Suchbegriffen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist transparent, wie die unterschiedlichen Suchbegriffe miteinander verknüpft werden, sofern der Anwender keine Operatoren und Klammern eingibt?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es möglich, unterschiedliche Operatoren miteinander zu verknüpfen, und ist klar, in welcher Reihenfolge diese abgearbeitet werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Können die Booleschen Operatoren AND, OR und NOT eingesetzt werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Werden unterschiedliche Schreibweisen für die Eingabe der Booleschen Operatoren unterstützt?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es möglich, Wildcards und Trunkierungen zu verwenden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist die initiale Sortierung (z.B. nach Relevanz) der Ergebnisse für den Anwender transparent?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es transparent, in wie weit und weshalb die einzelnen Treffer der Suchanfrage entsprechen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Gibt es eine Hilfefunktion für die Seitensuche?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist die Suchanfrage, die zur Ergebnisliste geführt hat, weiterhin vollständig sichtbar und kann sie direkt editiert werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist die Anzahl der Treffer gut sichtbar und in der Nähe der Ergebnisliste platziert?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist die Trefferliste klar strukturiert und werden Suchbegriffe in der Trefferliste optisch hervorgehoben?",
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
                        },
                        {
                            "name": "Erweiterte Suche",
                            "is_mandatory": true,
                            "questions": [
                                {
                                    "name": "Sind alle Formularfelder korrekt und sichtbar beschriftet?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind alle Formularfelder breit genug, um die jeweilige Information vollständig anzuzeigen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist die Sortierung innerhalb von Drop-Down-Menüs intuitiv verständlich (alphabetisch, nach Relevanz)?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Erlauben die Formularfelder, bei denen dies entsprechend dem Suchkontext sinnvoll ist, eine Mehrfachauswahl?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Beinhaltet die erweiterte Suche ein spezifisches Feld zur Freitextsuche?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es möglich, die Suche mindestens auf Autor, Titel, Schlagwort, Signatur oder Jahr einzuschränken?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es möglich, die Suche entsprechend der Zugriffsrechte oder nach Bibliotheken einzuschränken?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es möglich, die Suche auf bestimmte Medientypen und Sprachen einzuschränken?",
                                    "is_mandatory": false 
                                }
                            ]
                        }

                    ]
                },
                {
                    "name": "Präsentation & Zugriff",
                    "is_mandatory": false,
                    "questions": [
                        {
                            "name": "Unterstützt die Dialoggestaltung (z.B. die verwendeten Navigationselemente) einen einfachen Wechsel zwischen Suche, Trefferlisten und Detailanzeigen?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Werden für die unterschiedlichen, vorhanden Objekte jeweils angepasste Interaktionsmöglichkeiten zur weiteren Verwendung angeboten?",
                            "is_mandatory": true 
                        }
                    ],
                    "categories_levelthree": [
                        {
                            "name": "Darstellung der Trefferliste",
                            "is_mandatory": true,
                            "questions": [
                                {
                                    "name": "Ist die Suchanfrage, die zur Ergebnisliste geführt hat, weiterhin vollständig sichtbar und kann sie direkt editiert werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist die Anzahl der Treffer gut sichtbar und in der Nähe der Ergebnisliste platziert?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Werden alle relevanten Informationen angezeigt oder besteht ein direkter Zugriff (z.B. per Mouseover-Effekt) auf diese Informationen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist klar ersichtlich, ob es detailliertere Informationen zu den einzelnen Treffern gibt und wie auf diese Detailinformationen zugegriffen werden kann?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist die anfängliche Sortierung der Treffer (Ranking) für den Anwender transparent?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Ist es transparent, in wie weit und weshalb die einzelnen Treffer der Suchanfrage entsprechen?",
                                    "is_mandatory": true 
                                }
                            ]
                        },
                        {
                            "name": "Darstellung der Detailansicht",
                            "is_mandatory": true,
                            "questions": [
                                {
                                    "name": "Werden alle relevanten Informationen der Trefferliste ebenso angezeigt, wie zusätzliche Informationen, die hilfreich sind?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Wird zusätzlich eine Kurzzusammenfassung/ein Abstract oder ein Inhaltsverzeichnis angeboten?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Ist der direkte Zugriff auf das Trefferobjekt gewährleistet (bei phyischen Objekten die Ausleihe, bei elektronischen Dokumenten der Dateizugriff)?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es möglich, direkt zwischen den Detailansichten der einzelnen Treffer zu navigieren?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist es möglich, die Zitation des jeweiligen Treffers in unterschiedlichen Formaten zu extrahieren?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Werden Extraktionsmechnismen wie Email, Bookmark und Drucken angeboten?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Gibt es zusätzliche Schnittstellen zur herkömmlicher Literaturverwaltungssoftware wie Endnote, Bibsonomy, delicio.us usw.?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Werden zusätzliche Informationen angeboten (sogenanntes Content Enrichment von anderen Webseiten wie Amazon.com) und bieten diese Inhalte einen informativen Mehrwert?",
                                    "is_mandatory": false 
                                }
                            ]
                        }

                    ]
                }
            ]
        },
        {
            "name": "Personalisierung",
            "is_mandatory": false,
            "questions": [
                {
                    "name": "Hat der Anwender einen Überblick, welche Möglichkeiten er insgesamt zur Personalisierung nutzen kann?",
                    "is_mandatory": true 
                },
                {
                    "name": "Werden Änderungen an den Nutzereinstellungen korrekt gespeichert und bei jedem Neustart des Systems entsprechend berücksichtigt?",
                    "is_mandatory": true 
                }
            ],        
            "categories_leveltwo": [
                {
                    "name": "Nutzerkonto & -einstellungen",
                    "is_mandatory": true,
                    "questions": [
                        {
                            "name": "Bietet das System einen ausreichenden Schutz persönlicher Daten (z.B. verschlüsselte Datenübertragung, etc.)?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Stehen dem Anwender Informationen bzgl. der Speicherung seiner persönlichen Daten und dem Umgang mit diesen zur Verfügung?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Hat der Anwender jederzeit die Möglichkeit, die in seinem Profil hinterlegten Einstellungen und persönliche Angaben zu editieren bzw. seinen Account nachhaltig und vollständig zu löschen?",
                            "is_mandatory": true 
                        }
                    ],
                    "categories_levelthree": [
                        {
                            "name": "Nutzerkonto",
                            "is_mandatory": true,
                            "questions": [
                                {
                                    "name": "Ist für den Anwender ersichtlich, wie er ein Nutzerkonto erstellen kann?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind die Anmeldebedingungen klar ersichtlich und verständlich formuliert und wird auf allfällige Gebühren hingewiesen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist für den Anwender ersichtlich, wie er sich in sein Nutzerkonto einloggen kann und steht diese Möglichkeit dem Anwender jederzeit zur Verfügung?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Stehen dem Anwender beim Login unterschiedliche Optionen zur Verfügung (z.B. Single-Sign-On, Passwortspeicherung)?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Kann der Anwender personenbezogene Einstellungen des Nutzerkontos selbst anpassen und sein Passwort ändern?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Steht eine Funktion zum erneuten Zusenden des Passworts zur Verfügung und wird zusätzlich eine Kontaktadresse im Fall von Problemen angeboten?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann der Anwender sich anzeigen lassen, welche Ausleihen er in der Vergangenheit getätigt hat?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Kann der Anwender den Ausleihstatus seiner aktuellen Reservationen einsehen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann der Anwender das Rückgabedatum seiner aktuellen Ausleihen abrufen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann der Anwender sein Gebührenkonto einsehen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Hat der Anwender die Möglichkeit, eine Auswahl zu treffen , in welcher Sprache die Webseite dargestellt wird und diese zu speichern?",
                                    "is_mandatory": true 
                                }
                            ]
                        },
                        {
                            "name": "Personalisierbare Einstiegsseiten oder Portallösung",
                            "is_mandatory": false,
                            "questions": [
                                {
                                    "name": "Kann der Anwender einstellen, welche Elemente und Funktionen auf seiner individuellen Startseite angezeigt werden sollen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann er die Reihenfolge/ Platzierung der einzelnen Elemente manipulieren?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann die Darstellung  der einzelnen Elemente beeinflusst werden?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Kann der Anwender das Layout (verwendete Schriftgrösse, Farben, etc.) selbst einstellen?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Werden vorgefertigte Templates zur Auswahl angeboten?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Kann der Anwender die Anpassungen bei Bedarf mit wenig Aufwand wieder zurücksetzen oder kann er alternativ bereits vor dem Speichern seine Einstellungen überprüfen (Vorschau)?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind alle Funktionen zur Einstellung einzelner Parameter ausreichend und klar beschriftet?",
                                    "is_mandatory": true 
                                }
                            ]
                        }

                    ]
                },
                {
                    "name": "personalisierte Recherchetools",
                    "is_mandatory": true,
                    "questions": [
                        {
                            "name": "Sind alle Funktionen zur Einstellung einzelner Parameter ausreichend und klar beschriftet?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Wirken die Anpassungsmöglichkeiten der Default-Settings zur Personalisierung sinnvoll und angemessen?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Kann der Anwender getroffene Einstellungen jederzeit ohne (grossen) Aufwand rückgängig machen oder auf das vorgegebene Schema zurücksetzen?",
                            "is_mandatory": true 
                        }
                    ],
                    "categories_levelthree": [
                        {
                            "name": "Personalisierte Suchmasken",
                            "is_mandatory": false,
                            "questions": [
                                {
                                    "name": "Kann der Anwender die Reihenfolge der einzelnen Eingabefelder selbst einstellen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Stehen dem Anwender Vorlagen zur Gestaltung seiner individuellen Suchmasken zur Verfügung?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Können die individualisierten Suchmasken auch während eines Recherchevorgangs noch schnell und einfach angepasst werden, ohne dass bereits getätigte Eingaben verloren gehen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann der Anwender getroffene Einstellungen jederzeit ohne (grossen) Aufwand rückgängig machen oder auf das vorgegebene Schema zurücksetzen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind alle Funktionen zur Einstellung einzelner Parameter ausreichend und klar beschriftet?",
                                    "is_mandatory": true 
                                }
                            ]
                        },
                        {
                            "name": "Personalisierte Sucheinstellungen und Trefferlisten",
                            "is_mandatory": false,
                            "questions": [
                                {
                                    "name": "Kann der Anwender festlegen, nach welchem Kriterium die Trefferliste standardmässig sortiert wird?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann der Anwender die Anzeige der Metainformationen sinnvoll einschränken bzw. anpassen?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Kann der Anwender einzelne Filtereinstellungen bei der Recherche als Default setzen?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Erhält der Anwender, sofern er Filtereinstellungen per Default in seinem Profil gesetzt hat, den Hinweis, welche Einstellungen bei seiner Sucheingabe wirken und kann er diese bei Bedarf auch während des Recherchevorgangs wieder entfernen?",
                                    "is_mandatory": true 
                                }
                            ]
                        }

                    ]
                }
            ]
        },
        {
            "name": "Nutzerpartizipation",
            "is_mandatory": false,
            "questions": [
                {
                    "name": "Steht für die Anwender eine Dokumentation der Verhaltensregeln (\"Netiquette\") zur Verfügung?",
                    "is_mandatory": true 
                },
                {
                    "name": "Sofern in diesem Bereich mehrere Komponenten angeboten werden, können diese alle mit demselben Login/Benutzerkonto (single-sign-on) verwendet werden?",
                    "is_mandatory": true 
                },
                {
                    "name": "Basieren alle in diesem Bereich verwendeten Editoren, soweit dies möglich ist, auf einem möglichst ähnlichen Interaktionskonzept?",
                    "is_mandatory": true 
                },
                {
                    "name": "Ist bei allen Inhalten angegeben von wem und wann diese verfasst wurden bzw. wann die entsprechenden Inhalte zum letzten Mal geändert wurden?",
                    "is_mandatory": true 
                },
                {
                    "name": "Stehen dem Anwender Informationen bzgl. der Speicherung seiner persönlichen Daten und dem Umgang mit diesen zur Verfügung?",
                    "is_mandatory": true 
                }
            ],        
            "categories_leveltwo": [
                {
                    "name": "Bestandsbezogene Nutzerpartizipation",
                    "is_mandatory": true,
                    "questions": [
                        {
                            "name": "Hat der Anwender jederzeit die Möglichkeit, von ihm verfasste Beiträge zu editieren bzw. nachträglich zu kommentieren?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Kann sich der Anwender schnell einen Überblick über alle von ihm verfassten Beiträge verschaffen?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Ist bei Beiträgen, die unter einem mittlerweile gelöschten Nutzerprofil verfasst wurden, ein entsprechender Vermerk angebracht?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Ist deutlich angegeben, wer auf die von den Anwendern verfassten Beiträge Zugriff hat und bei wem die Urheber- bzw. Verwertungsrechte liegen?",
                            "is_mandatory": true 
                        }
                    ],
                    "categories_levelthree": [
                        {
                            "name": "Recommender-Dienste",
                            "is_mandatory": false,
                            "questions": [
                                {
                                    "name": "Sind die Empfehlungen konsistent und an geeigneter Stelle in die Website integriert?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist für den Nutzer ersichtlich, auf welcher Basis die bereitgestellten Empfehlungen beruhen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ermöglicht die gewählte Darstellung einen schnellen Überblick über die  angebotenen Empfehlungen?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Können zu den empfohlenen Objekten unmittelbar weitere Informationen aufgerufen werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist, sofern das System dies erlaubt, die Eingabe von Bewertungen durch die Benutzer schnell und intuitiv möglich?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist, sofern Nutzerbewertungen möglich sind, die verwendete Bewertungsskala erläutert und intuitiv?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Werden die Empfehlungen dynamisch aufgrund des Nutzerverhaltens bzw. vorgenommenen Bewertungen zeitnah angepasst oder können sie aktiv aktualisiert werden?",
                                    "is_mandatory": true 
                                }
                            ]
                        },
                        {
                            "name": "Kommentare und Rezensionen",
                            "is_mandatory": true,
                            "questions": [
                                {
                                    "name": "Ist die Funktion zum Erstellen von Kommentaren bzw. Rezensionen in der Nähe des zu beschreibenden Objektes platziert?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist das Eingabefeld für das Verfassen von Kommentaren ausreichend gross, so dass die vom Nutzer getätigten Eingaben während des Vorgangs jederzeit sichtbar sind?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist eine Vorschaufunktion für die erstellten Kommentare verfügbar?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann der Kommentar als Entwurf abgespeichert werden, um diesen zu einem späteren Zeitpunkt zu bearbeiten bzw. zu veröffentlichen?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Ist ersichtlich, von wem und wann ein Kommentar erstellt wurde?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Können Kommentare nachträglich vom Anwender noch editiert werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Können unsachgemässe Inhalte von anderen Nutzern schnell und einfach einer Kontrollinstanz gemeldet werden?",
                                    "is_mandatory": true 
                                }
                            ]
                        }

                    ]
                },
                {
                    "name": "Globale Partizipationsmöglichkeiten",
                    "is_mandatory": true,
                    "questions": [
                        {
                            "name": "Sind die vorhandenen Kollaborationstools (z.B. Wiki, Blog) angemessen in den Webauftritt integriert?",
                            "is_mandatory": true 
                        },
                        {
                            "name": "Kann, sofern nicht für alle Angebote der selbe Login verwendet werden kann, eine Registrierung einfach vorgenommen werden oder können ggf. sogar bestehende Accounts von anderen Diensten genutzt werden (z.B. Facebook)?",
                            "is_mandatory": false 
                        }
                    ],
                    "categories_levelthree": [
                        {
                            "name": "Wiki",
                            "is_mandatory": false,
                            "questions": [
                                {
                                    "name": "Wird der Anwender beim Verfassen von Artikeln angemessen unterstützt?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann nach den einzelnen Wiki-Artikeln gesucht werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Wird eine Sitemap mit einem Überblick über die einzelnen Wiki-Artikel angeboten?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind die Wiki-Artikel ausreichend durch Links miteinander verknüpft?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist transparent, welcher Autor welchen Artikel oder Abschnitt verfasst hat und in wie weit diese Abschnitte als \"seriös\" oder zuverlässig zu bewerten sind und ist der Stand (Datum) der Artikel mitangegeben?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind die Inhalte innerhalb der einzelnen Seiten übersichtlich gegliedert?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Sind ausreichend Artikel vorhanden bzw. sind umgekehrt keine \"brachliegenden\", unbefüllten oder überflüssigen Seiten vorhanden?",
                                    "is_mandatory": true 
                                }
                            ]
                        },
                        {
                            "name": "Forum",
                            "is_mandatory": false,
                            "questions": [
                                {
                                    "name": "Ist das Forum übersichtlich gestaltet und unterstützt das verwendete Layout eine gute Lesbarkeit der Beiträge?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Kann der Anwender seine persönlichen Angaben und sein Passwort nachträglich noch selbst editieren?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist das Eingabefeld für das Verfassen von Beiträgen ausreichend gross, so dass die vom Nutzer getätigten Eingaben während des Vorgangs jederzeit sichtbar sind?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Ist eine Vorschaufunktion für die erstellten Beiträge verfügbar?",
                                    "is_mandatory": false 
                                },
                                {
                                    "name": "Sind die Funktionen des Editors respektive die spezifische Syntax zur Eingabe und Formatierung von Inhalten einfach und intuitiv zu handhaben?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Können Beiträge nachträglich vom Anwender noch editiert werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Können unsachgemässe Inhalte von anderen Nutzern schnell und einfach einer Kontrollinstanz gemeldet werden?",
                                    "is_mandatory": true 
                                },
                                {
                                    "name": "Reagiert ein Moderator regelmässig auf bislang unbeantwortete Fragen aus dem Forum?",
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
// erstelle Kopie für User Input
let userData = teildata;
// Filter bringt sowas
let bereich = [];//["Information und Kommunikation"];
let teilbereich = [];//["Kontakt und Zugang"];
let komponente = ["Einfache Suche","Kontaktinformationen","Recommender-Dienste","Nutzerkonto"]; //["Einfache Suche","Kontaktinformationen","Recommender-Dienste","Nutzerkonto"];

// finde raus welche Fragen angezeigt werden müssen und wirf sie ins Array
let toViewArray = [];
function chooseViews(){
  // case: Komponente ist gewählt
  if(komponente.length > 0){
    // nimm fragen von komponente, teilbereich und bereich darüber

    // einzelne komponente
    for (let f=0; f < teildata.categories_levelone.length; f++){
      for (let g=0; g < teildata.categories_levelone[f].categories_leveltwo.length; g++){
        for (let h=0; h < teildata.categories_levelone[f].categories_leveltwo[g].categories_levelthree.length; h++){
          // Wenn Name der Komponente in Filter array gefunden
          // if(komponente.indexOf(teildata.categories_levelone[f].categories_leveltwo[g].categories_levelthree[h].name) !=-1){
         if(komponente.includes(teildata.categories_levelone[f].categories_leveltwo[g].categories_levelthree[h].name)){
            // bestimme Bereich für Nav & verschiebe ins array
            teildata.categories_levelone[f].categories_leveltwo[g].categories_levelthree[h]["bereich"] =  teildata.categories_levelone[f].name;
            teildata.categories_levelone[f].categories_leveltwo[g].categories_levelthree[h]["teilbereich"] =  teildata.categories_levelone[f].categories_leveltwo[g].name;
            toViewArray.push(teildata.categories_levelone[f].categories_leveltwo[g].categories_levelthree[h]);
            // add Teilbereich
            teildata.categories_levelone[f].categories_leveltwo[g]["bereich"] =  teildata.categories_levelone[f].name;
            toViewArray.push(teildata.categories_levelone[f].categories_leveltwo[g]);
            // add Bereich
            teildata.categories_levelone[f]["bereich"] =  teildata.categories_levelone[f].name;
            toViewArray.push(teildata.categories_levelone[f]);
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
        if(teilbereich.includes(teildata.categories_levelone[f].categories_leveltwo[g].name)){
          
          // füge einzelne view in view-Array mit index ein
            // add Teilbereich
            toViewArray.push(teildata.categories_levelone[f].categories_leveltwo[g]);
            // add Bereich
            toViewArray.push(teildata.categories_levelone[f]);
        }
      }
    }
  }
  // case: bring nur Fragen des Bereichs
  else{
    //nimm nur fragen von bereich
    for (let f=0; f < teildata.categories_levelone.length; f++){
      // Wenn Name der Komponente in Filter array gefunden
      if(bereich.includes(teildata.categories_levelone[f].name)){
        // add Bereich
          toViewArray.push(teildata.categories_levelone[f]);
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
  data: function () {
    // toView
    return {
      // toView:toView,
      toViewArray: toViewArray,
      currentView: 0,
      userdata: userData,
    };
  },
  methods: {
    next: function () {
      if (this.currentView < this.toViewArray.length - 1) this.currentView++;
      console.log("currentView is "+this.currentView);
    },
    back: function () {
      if (this.currentView > 0) this.currentView--;
      console.log("currentView is "+this.currentView);
    },
    newAnswer: function (page, answers) {
      console.log("User is on page " + page);
      console.log(answers);
      console.log(userData);

      // Antworten an der richtigen Stelle in userData schreiben
      function walkJSON(obj, ans, quest){
        for(var prop in obj){
          if(typeof obj[prop]=='object'){
            walkJSON(obj[prop],ans, quest);
          }
          else{
             if(obj["name"] == quest){
               //hier wird noch an die falsche Stelle geschrieben, vgl. Konsole
              obj.value = ans;
              var previewData = JSON.stringify(obj, null, 2);
              console.log(previewData);
             }
          }
        }
      }
      // let ViewBereich = toViewArray[page]['bereich'];
      // console.log(ViewBereich);
      // let ViewTeilbereich = toViewArray[page]['teilbereich'];
      // console.log(ViewTeilbereich);

      let ViewKomponente = toViewArray[page].name;
      console.log(ViewKomponente);

      for(let i=0;i<answers.length;i++){
        walkJSON(userData, answers[i],ViewKomponente);
        // console.log(userData.categories_levelone["Information und Kommunikation"].categories_leveltwo["Kontakt und Zugang"].categories_levelthree["Kontaktinformationen"].questions["Sind direkte Kontaktmöglichkeiten (z.B. per Email oder Telefon) angegeben?"].value);
      }
      // var previewData = JSON.stringify(userData, null, 2);
      // console.log(previewData);
    },
    checkNav: function(bereichStr) {
      let navposition = 0;
      if(bereichStr == "Information und Kommunikation"){navposition=1}
      if(bereichStr == "Recherche im Bestand" || bereichStr == "Suchfunktion"){navposition=2}
      if(bereichStr == "Personalisierung"){navposition=3}
      if(bereichStr == "Nutzerpartizipation"){navposition=4}
      // mach alle weiss
      for(let i=1; i<5;i++){
        document.querySelector("#navcircle"+i).style.backgroundColor = "#FFF";
      }
      // highlight aktiven bereich
      switch(navposition) {
        case 1:
          document.querySelector("#navcircle1").style.backgroundColor = "#817e65";
          break;
        case 2:
          document.querySelector("#navcircle2").style.backgroundColor = "#817e65";
          break;
        case 3:
          document.querySelector("#navcircle3").style.backgroundColor = "#817e65";
          break;
        case 4:
          document.querySelector("#navcircle4").style.backgroundColor = "#817e65";
          break;
        default:
      } 
    },
  },
  mounted:function(){
  // muss später wahrscheinlich erst bei Klick auf "Start" laufen
    console.log("fired");
    // Zeige Navelement nur, wenn in Selektion: toViewArray
    for(let i=1; i<5; i++){
      let part = document.querySelector("#navtitle"+i);
      for (let y=0; y<toViewArray.length; y++){
        // ausblenden wenn Titel nicht als "bereich" in toViewArray
        if(!(part.innerHTML == toViewArray[y]['bereich'])){
          part.style.display = "none";
          if(i != 5) {document.querySelector("#navcircle"+i).style.display = "none";}
          if(i != 4 && i != 5) {document.querySelector("#line"+i).style.display = "none";}
        }
        else{
          part.style.display = "block";
          if(i != 5) {document.querySelector("#navcircle"+i).style.display = "block";}
          if(i != 4 && i != 5) {document.querySelector("#line"+i).style.display = "block";}
          break;
        }
      }
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
.navigator{
  display:flex;
  padding:0em 5em;
  justify-content: center;
  margin-bottom: 2em;
}
.col{
  text-align: center;
  display:flex;
  flex-direction: column;
  width:4em;
}
.col-line{
  width:6em;
}
.circle{
  border:1px solid black;
  border-radius:100%;
  height:4em;
  width:4em;
}
.line{
  border:1px solid black;
  margin:0;
  margin-top: 50%;
}
.navigator-title{
  font-size: 0.7rem;
  text-align: center;
}
.fullbox td {
  width: 100%;
  height: 100%;
  margin: 0;
}
.fullbox {
  width: 100%;
}
.line-box {
  height: 1px;
  width: 5em;
  border: 1px solid black;
  margin: 0;
}
.navigator-table {
  border: none;
  margin: 0 auto 2em auto;
}
.title-box {
  width: 3em;
  max-width: 2em;
}
.btn {
  padding: 0.25em;
}
.btn:hover {
  cursor: pointer;
}
.btn-back {
  background: url(../assets/Arrow.svg) no-repeat;
  padding: 1em;
  border: 1px solid #817e65;
  /* absoluter pfad für live version */
  /* background: url(https://blog.fhgr.ch/apps/img/Arrow.77733ac5.svg); */
}
.btn-forward {
  background: #817e65;
  color: #fff;
  padding: 0.25em 0.5em;
}
.bottom-nav {
  padding: 0em 4em;
}
.to-left {
  text-align: left;
}
.to-right {
  text-align: right;
}
</style>
