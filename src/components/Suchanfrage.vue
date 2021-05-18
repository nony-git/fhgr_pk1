<template>
<div>
    <!-- <h1 class="titleBig">Suchanfragen überprüfen</h1> -->
    <div class="text">
      Als professionelle Informationsdienstleister heben sich Bibliotheken durch einen hohen Qualitätsanspruch und fachlich überprüfte
      Inhalte von herkömmlichen Webanbietern ab. Dem entsprechend ist es besonders wichtig, dass Grundlagen der Recherche korrekt und
      nachvollziehbar erfolgen. Dies ist jedoch dann nicht mehr der Fall, wenn Suchtechnologien falsch konfiguriert wurden, und
      Suchanfragen in Konsequenz nur noch scheinbar korrekt abgearbeitet werden. Um Ihnen bei der Überprüfung Ihres Webangebots zu
      assistieren, haben wir hier eine Liste an Suchanfragen zusammengestellt, die Ihnen hierbei behilflich sein soll.
    </div>

    <h2 class="titleMedium">Boolesche Operatoren</h2>
    <button class="button button-primary-bg" @click="emptyCells(1)">Eingaben leeren</button>
    <div class="table">
        <div class="column firstColumn">
          <div class="cell cellTitle emptyCell">&nbsp;</div>
          <div class="cell firstColumnCell">A</div>
          <div class="cell firstColumnCell">B</div>
          <div class="cell firstColumnCell">C</div>
          <div class="cell firstColumnCell">D</div>
          <div class="cell firstColumnCell">E</div>
          <div class="cell firstColumnCell">F</div>
          <div class="cell firstColumnCell">G</div>
          <div class="cell firstColumnCell">H</div>
          <div class="cell firstColumnCell">I</div>
          <div class="cell firstColumnCell">J</div>
        </div>
        <div class="column secondColumn">
          <div class="cell cellTitle">Suchanfrage</div>
          <div class="cell cellInput"><input type="text" v-model="query1" placeholder="Hier Suchanfrage eingeben z.B. Schweiz"></div>
          <div class="cell cellInput"><input type="text" v-model="query2" placeholder="Hier Suchanfrage eingeben z.B. Zürich"></div>
          <div class="cell cellInput"><input type="text" v-model="query3" placeholder="Hier Suchanfrage eingeben z.B. Johannes"></div>
          <div class="cell">{{ query1 ? query1 : 'Schweiz' }} AND {{ query2 ? query2 : 'Zürich' }}</div>
          <div class="cell">{{ query1 ? query1 : 'Schweiz' }} AND {{ query3 ? query3 : 'Johannes' }}</div>
          <div class="cell">{{ query2 ? query2 : 'Zürich' }} AND {{ query3 ? query3 : 'Johannes' }}</div>
          <div class="cell">{{ query1 ? query1 : 'Schweiz' }} OR {{ query2 ? query2 : 'Zürich' }}</div>
          <div class="cell">({{ query1 ? query1 : 'Schweiz' }} AND {{ query2 ? query2 : 'Zürich' }}) OR {{ query3 ? query3 : 'Johannes' }}</div>
          <div class="cell">{{ query1 ? query1 : 'Schweiz' }} AND {{ query2 ? query2 : 'Zürich' }} OR {{ query3 ? query3 : 'Johannes' }}</div>
          <div class="cell">{{ query1 ? query1 : 'Schweiz' }} AND ({{ query2 ? query2 : 'Zürich' }} OR {{ query3 ? query3 : 'Johannes' }})</div>
        </div>
        <div class="column thirdColumn">
          <div class="cell cellTitle">Anzahl Treffer</div>
          <div class="cell cellInput">
            <input type="number" v-model.number="result1" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
          <div class="cell cellInput">
            <input type="number" v-model.number="result2" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
          <div class="cell cellInput">
            <input type="number" v-model.number="result3" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
          <div class="cell cellInput" v-on:keyup="validateNumber(1)" v-bind:class="{ redBorder: error1 }">
            <input type="number" v-model.number="result4" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
          <div class="cell cellInput" v-on:keyup="validateNumber(2)" v-bind:class="{ redBorder: error2 }">
            <input type="number" v-model.number="result5" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
          <div class="cell cellInput" v-on:keyup="validateNumber(3)" v-bind:class="{ redBorder: error3 }">
            <input type="number" v-model.number="result6" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
          <div class="cell cellInput" v-on:keyup="validateNumber(4)" v-bind:class="{ redBorder: error4 }">
            <input type="number" v-model.number="result7" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
          <div class="cell cellInput" v-on:keyup="validateNumber(5)" v-bind:class="{ redBorder: error5 }">
            <input type="number" v-model.number="result8" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
          <div class="cell cellInput" v-on:keyup="validateNumber(6)" v-bind:class="{ redBorder: error6 }">
            <input type="number" v-model.number="result9" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
          <div class="cell cellInput" v-on:keyup="validateNumber(7)" v-bind:class="{ redBorder: error7 }">
            <input type="number" v-model.number="result10" v-on:keyup="getAmount()" placeholder="Hier Anzahl Treffer eingeben">
          </div>
        </div>
        <div class="column fourthColumn">
          <div class="cell cellTitle">Korrekte Anzahl</div>
          <div class="cell">-</div>
          <div class="cell">-</div>
          <div class="cell">-</div>
          <div class="cell">
            ≤ {{ count1 }}
            <span class="tooltip">&#8505;<span class="tooltiptext">Kleinster Wert von A oder B</span></span>
          </div>
          <div class="cell">
            ≤ {{ count2 }}
            <span class="tooltip">&#8505;<span class="tooltiptext">Kleinster Wert von A oder C</span></span>
          </div>
          <div class="cell">
            ≤ {{ count3 }}
            <span class="tooltip">&#8505;<span class="tooltiptext">Kleinster Wert von B oder C</span></span>
          </div>
          <div class="cell">
            = {{ count4 }}
            <span class="tooltip">&#8505;<span class="tooltiptext">Anzahl A + Anzahl B - Anzahl D</span></span>
          </div>
          <div class="cell">
            = {{ count5 }}
            <span class="tooltip">&#8505;<span class="tooltiptext">Anzahl D + Anzahl C - Anzahl E - Anzahl F</span></span>
          </div>
          <div class="cell">
            = {{ count6 }}
            <span class="tooltip">&#8505;<span class="tooltiptext">Überlicherweise = Anzahl H</span></span>
          </div>
          <div class="cell">
            = {{ count7 }}
            <span class="tooltip">&#8505;<span class="tooltiptext">Anzahl D + Anzahl E - Anzahl F</span></span>
          </div>
        </div>
    </div>

    <h2 class="titleMedium">Trunkierungen und Wildcards</h2>
    <button class="button button-primary-bg" @click="emptyCells(2)">Eingaben leeren</button>
    <div class="table">
      <div class="column firstColumn">
        <div class="cell cellTitle emptyCell">&nbsp;</div>
        <div class="cell firstColumnCell">A</div>
        <div class="cell firstColumnCell">B</div>
        <div class="cell firstColumnCell">C</div>
        <div class="cell firstColumnCell">D</div>
        <div class="cell firstColumnCell">E</div>
        <div class="cell firstColumnCell">F</div>
        <div class="cell firstColumnCell">G</div>
        <div class="cell firstColumnCell">H</div>
        <div class="cell firstColumnCell">I</div>
      </div>
      <div class="column secondColumn">
        <div class="cell cellTitle">Suchanfrage</div>
        <div class="cell cellInput"><input type="text" v-model="query4" placeholder="Hier Suchanfrage eingeben z.B. Johan"></div>
        <div class="cell cellInput"><input type="text" v-model="query5" placeholder="Hier Suchanfrage eingeben z.B. Johann"></div>
        <div class="cell cellInput"><input type="text" v-model="query6" placeholder="Hier Suchanfrage eingeben z.B. Johanna"></div>
        <div class="cell cellInput"><input type="text" v-model="query7" placeholder="Hier Suchanfrage eingeben z.B. Johannes"></div>
        <div class="cell">{{ query4 ? query4.slice(0,2) : "Jo" }}*</div>
        <div class="cell">{{ query5 ? query5.slice(0,5) : "Johan" }}*</div>
        <div class="cell">{{ query6 ? query6.slice(0,6) : "Johann" }}*</div>
        <div class="cell cellInput"><input type="text" v-model="query8" placeholder="Hier Suchanfrage eingeben z.B. Müller-Jacquier"></div>
        <div class="cell">{{ query8 ? query8.slice(0,10) : "Müller-Jac" }}*</div>
      </div>
      <div class="column thirdColumn">
        <div class="cell cellTitle">Anzahl Treffer</div>
        <div class="cell cellInput">
          <input type="number" v-model.number="result11" v-on:keyup="getCounts()" placeholder="Hier Anzahl Treffer eingeben">
        </div>
        <div class="cell cellInput">
          <input type="number" v-model.number="result12" v-on:keyup="getCounts()" placeholder="Hier Anzahl Treffer eingeben">
        </div>
        <div class="cell cellInput">
          <input type="number" v-model.number="result13" v-on:keyup="getCounts()" placeholder="Hier Anzahl Treffer eingeben">
        </div>
        <div class="cell cellInput">
          <input type="number" v-model.number="result14" v-on:keyup="getCounts()" placeholder="Hier Anzahl Treffer eingeben">
        </div>
        <div class="cell cellInput" v-on:keyup="validateNumber(8)" v-bind:class="{ redBorder: error8 }">
          <input type="number" v-model.number="result15" v-on:keyup="getCounts()" placeholder="Hier Anzahl Treffer eingeben">
        </div>
        <div class="cell cellInput" v-on:keyup="validateNumber(9)" v-bind:class="{ redBorder: error9 }">
          <input type="number" v-model.number="result16" v-on:keyup="getCounts()" placeholder="Hier Anzahl Treffer eingeben">
        </div>
        <div class="cell cellInput" v-on:keyup="validateNumber(10)" v-bind:class="{ redBorder: error10 }">
          <input type="number" v-model.number="result17" v-on:keyup="getCounts()" placeholder="Hier Anzahl Treffer eingeben">
        </div>
        <div class="cell cellInput">
          <input type="number" v-model.number="result18" v-on:keyup="getCounts()" placeholder="Hier Anzahl Treffer eingeben">
        </div>
        <div class="cell cellInput" v-on:keyup="validateNumber(11)" v-bind:class="{ redBorder: error11 }">
          <input type="number" v-model.number="result19" v-on:keyup="getCounts()" placeholder="Hier Anzahl Treffer eingeben">
        </div>
      </div>
      <div class="column fourthColumn">
        <div class="cell cellTitle">Korrekte Anzahl</div>
        <div class="cell">-</div>
        <div class="cell">-</div>
        <div class="cell">-</div>
        <div class="cell">-</div>
        <div class="cell">
          ≥ {{ count8 }}
          <span class="tooltip">&#8505;<span class="tooltiptext">Anzahl A + Anzahl B + Anzahl C + Anzahl D</span></span>
        </div>
        <div class="cell">
          ≥ {{ count8 }}
          <span class="tooltip">&#8505;<span class="tooltiptext">Anzahl A + Anzahl B + Anzahl C + Anzahl D</span></span>
          ; &lt; {{ count9 ? count9 : 0 }}
          <span class="tooltip">&#8505;<span class="tooltiptext">Anzahl E</span></span>
        </div>
        <div class="cell">
          ≥ {{ count10 }}
          <span class="tooltip">&#8505;<span class="tooltiptext">Anzahl B + Anzahl C + Anzahl D</span></span>
          ; &lt; {{ count11 ? count11 : 0  }}
          <span class="tooltip">&#8505;<span class="tooltiptext">Anzahl F</span></span>
        </div>
        <div class="cell">-</div>
        <div class="cell">
          ≥ {{ count12 }}
          <span class="tooltip">&#8505;<span class="tooltiptext">Anzahl H</span></span>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
          name: 'App',
          data: function(){
            return {
            query1: '',
            query2: '',
            query3: '',
            query4: '',
            query5: '',
            query6: '',
            query7: '',
            query8: '',
            result1: null,
            result2: null,
            result3: null,
            result4: null,
            result5: null,
            result6: null,
            result7: null,
            result8: null,
            result9: null,
            result10: null,
            result11: null,
            result12: null,
            result13: null,
            result14: null,
            result15: null,
            result16: null,
            result17: null,
            result18: null,
            result19: null,
            count1: 0,
            count2: 0,
            count3: 0,
            count4: 0,
            count5: 0,
            count6: 0,
            count7: 0,
            count8: 0,
            count9: 0,
            count10: 0,
            count11: 0,
            count12: 0,
            error1: false,
            error2: false,
            error3: false,
            error4: false,
            error5: false,
            error6: false,
            error7: false,
            error8: false,
            error9: false,
            error10: false,
            error11: false
            }
          },
          methods: {
              getAmount: function() {
                // save min value of result1 and result2 into count1
                if (this.result1 <= this.result2) {
                  this.count1 = this.result1;
                }
                else {
                  this.count1 = this.result2;
                }
                // save min value of result1 and result3 into count2
                if (this.result1 <= this.result3) {
                  this.count2 = this.result1;
                }
                else {
                  this.count2 = this.result3;
                }
                // save min value of result2 and result3 into count2
                if (this.result2 <= this.result3) {
                  this.count3 = this.result2;
                }
                else {
                  this.count3 = this.result3;
                }
                // save result1 + result2 - result4 into count4
                this.count4 = this.result1 + this.result2 - this.result4;
                // save result4 + result3 - result5 - result6 into count5
                this.count5 = this.result4 + this.result3 - this.result5 - this.result6;
                // save result8 into count6
                this.count6 = this.result8;
                // save result4 + result5 - result6 into count4
                this.count7 = this.result4 + this.result5 - this.result6;
              },
              getCounts: function() {
                // save result11 + result12 + result13 + result 14 into count8
                this.count8 = this.result11 + this.result12 + this.result13 + this.result14;
                // save result15 into count9
                this.count9 = this.result15;
                // save result12 + result13 + result 14 into count10
                this.count10 = this.result12 + this.result13 + this.result14;
                // save result16 into count11
                this.count11 = this.result16;
                // save result18 into count12
                this.count12 = this.result18;
              },
              validateNumber: function(id) {
                switch (id) {
                  // result4 is too high
                  case 1:
                    if (this.result4 > this.count1) {
                      this.error1 = true;
                    }
                    else {
                      this.error1 = false;
                    }
                    break;
                  // result5 is too high
                  case 2:
                    if (this.result5 > this.count2) {
                      this.error2 = true;
                    }
                    else {
                      this.error2 = false;
                    }
                    break;
                  // result6 is too high
                  case 3:
                    if (this.result6 > this.count3) {
                      this.error3 = true;
                    }
                    else {
                      this.error3 = false;
                    }
                    break;
                  // result4 is not equal count4
                  case 4:
                    if (this.result7 != this.count4) {
                      this.error4 = true;
                    }
                    else {
                      this.error4 = false;
                    }
                    break;
                  // result5 is not equal count5
                  case 5:
                    if (this.result8 != this.count5) {
                      this.error5 = true;
                    }
                    else {
                      this.error5 = false;
                    }
                    break;
                  // result9 is not equal count6
                  case 6:
                    if (this.result9 != this.count6) {
                      this.error6 = true;
                    }
                    else {
                      this.error6 = false;
                    }
                    break;
                  // result10 is not equal count7
                  case 7:
                    if (this.result10 != this.count7) {
                      this.error7 = true;
                    }
                    else {
                      this.error7 = false;
                    }
                    break;
                  case 8:
                    if (this.result15 < this.count8 && this.result15 != '') {
                      this.error8 = true;
                    }
                    else {
                      this.error8 = false;
                    }
                    break;
                  case 9:
                    if ((this.result16 < this.count8 && this.result16 != '') || this.result16 >= this.count9) {
                      this.error9 = true;
                    }
                    else {
                      this.error9 = false;
                    }
                    break;
                  case 10:
                    if ((this.result17 < this.count10 && this.result17 != '') || this.result17 >= this.count11) {
                      this.error10 = true;
                    }
                    else {
                      this.error10 = false;
                    }
                    break;
                  case 11:
                    if (this.result19 < this.count12 && this.result19 != '') {
                      this.error11 = true;
                    }
                    else {
                      this.error11 = false;
                    }
                    break;
                }
              },
              emptyCells: function(id) {
                switch (id) {
                  case 1:
                    // reseting all the query-variables to empty strings
                    this.query1 = '';
                    this.query2 = '';
                    this.query3 = '';
                    // reseting all the result-variables to null
                    this.result1 = null;
                    this.result2 = null;
                    this.result3 = null;
                    this.result4 = null;
                    this.result5 = null;
                    this.result6 = null;
                    this.result7 = null;
                    this.result8 = null;
                    this.result9 = null;
                    this.result10 = null;
                    // reseting all the count-variables to 0
                    this.count1 = 0;
                    this.count2 = 0;
                    this.count3 = 0;
                    this.count4 = 0;
                    this.count5 = 0;
                    this.count6 = 0;
                    this.count7 = 0;
                    // reseting all the error-variables to false
                    this.error1 = 0;
                    this.error2 = 0;
                    this.error3 = 0;
                    this.error4 = 0;
                    this.error5 = 0;
                    this.error6 = 0;
                    this.error7 = 0;
                    break;
                  case 2:
                    // reseting all the query-variables to empty strings
                    this.query4 = '';
                    this.query5 = '';
                    this.query6 = '';
                    this.query7 = '';
                    this.query8 = '';
                    // reseting all the result-variables to null
                    this.result11 = null;
                    this.result12 = null;
                    this.result13 = null;
                    this.result14 = null;
                    this.result15 = null;
                    this.result16 = null;
                    this.result17 = null;
                    this.result18 = null;
                    this.result19 = null;
                    // reseting all the count-variables to 0
                    this.count8 = 0;
                    this.count9 = 0;
                    this.count10 = 0;
                    this.count11 = 0;
                    this.count12 = 0;
                    // reseting all the error-variables to false
                    this.error7 = 0;
                    this.error8 = 0;
                    this.error9 = 0;
                    this.error10 = 0;
                    this.error11 = 0;
                    break;
                }
              }
          }
      }
</script>

<style scoped>
      .container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 50px 40px;
        background: #fff;
      }
      .titleBig {
        font-size: 3.5rem;
        line-height: 1.4;
        font-weight: 300;
      }
      .titleMedium {
        font-size: 2.5rem;
        line-height: 1.27;
        font-weight: 300;
      }
      .text {
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.44;
        padding-bottom: 24px;
      }
      .table {
        display: flex;
        padding-bottom: 24px;
        padding-top: 14px;
      }
      .firstColumn {
        width: 26px;
        min-width: 2%;
      }
      .secondColumn {
        width: 46%;
        margin-left: 5px;
      }
      .thirdColumn, .fourthColumn {
        width: 26%;
        margin-left: 5px;
      }
      .cellTitle, .firstColumnCell {
        color: #7a7760;
      }
      .firstColumnCell {
        text-align: center;
      }
      .cell {
        border: 1px solid #7a7760;
        margin-top:5px;
        padding: 5px 5px;
        text-align: left;
        height: 2em;
        white-space: nowrap;
        overflow: hidden;
      }
      .emptyCell {
        height: 2em;
      }
      .cellInput {
        padding: 0;
        display: flex;
        align-items: center;
        height: 2em;
      }
      input[type=text] {
        border: 0;
        padding: 5px 5px;
        height: 20px;
        width: 97.6%;
        border-radius: 0;
        font-size: 1rem !important;
      }
      input[type=number] {
        border: 0;
        padding: 5px 5px;
        height: 20px;
        width: 96%;
        border-radius: 0;
        font-size: 1rem !important;
        -moz-appearance: textfield;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .redBorder {
        border: 1px solid red;
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
      .button {
        font-size: 1rem;
        padding: 10px 15px;
        color: #817e65;
        border: 1px solid #c0beb2;
        cursor: pointer;
        transition: all 0.25s;
      }
      .button:hover {
        background: #c0beb2;
        color: #ffffff;
      }
      @media screen and (max-width: 767px) {
        .container {
          padding: 50px 0;
        }
        .firstColumn {
          display: none;
        }
        .secondColumn {
          width: 50%;
        }
        .thirdColumn {
          width: 25%;
        }
        .fourthColumn {
          width: 25%;
        }
      }
</style>
