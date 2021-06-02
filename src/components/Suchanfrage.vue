<template>
<div class="suchanfrage-container">
    <!-- START: INTRO IMAGE -->
    <img src="/apps/stand1105/dist/img/suchanfragen_intro_image.916b5f6b.jpg" class="introImage" alt="Intro Image">
    <!-- END: INTRO IMAGE -->

    <!-- START: LANGUAGE SWITCH -->
    <div class="languageswitch">
        <button class="linkbutton" v-on:click="language = 'de'; loadData()" v-bind:class="{linkbuttonActive: language == 'de'}">
          Deutsch
        </button>
        <span>|</span>
        <button class="linkbutton" v-on:click="language = 'en'; loadData()" v-bind:class="{linkbuttonActive: language == 'en'}">
          English
        </button>
    </div>
    <!-- END: LANGUAGE SWITCH -->

    <!-- START: EINLEITUNGSTEXT -->
    <div class="text">
      {{ infotext }}
    </div>
    <!-- END: EINLEITUNGSTEXT -->

    <!-- START: TABELLE FÜR DIE BOOLSCHEN OPERATOREN -->
    <h2 class="titleMedium">{{ textcomponents.boolscheOperatoren }}</h2>
    <button class="button button-primary-bg" @click="emptyCells(1)">{{ textcomponents.eingabeLeeren }}</button>

    <!-- TABELLE -->
    <div class="table">
      <!-- TABELLEN-ZEILEN -->
      <div class="row">
        <div class="firstColumn cell cellTitle emptyCell">&nbsp;</div>
        <div class="secondColumn cell cellTitle">{{ textcomponents.suchanfrage }}</div>
        <div class="thirdColumn cell cellTitle">{{ textcomponents.anzahlTreffer }}</div>
        <div class="fourthColumn cell cellTitle">{{ textcomponents.korrekteAnzahl }}</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">A</div>
        <div class="secondColumn cell cellInput"><input type="text" v-model="query1" :placeholder="[[ textcomponents.placeholderSuchanfrage1 ]]"></div>
        <div class="thirdColumn cell cellInput">
          <input type="number" v-model.number="result1" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">-</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">B</div>
        <div class="secondColumn cell cellInput"><input type="text" v-model="query2" :placeholder="[[ textcomponents.placeholderSuchanfrage2 ]]"></div>
        <div class="thirdColumn cell cellInput">
          <input type="number" v-model.number="result2" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">-</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">C</div>
        <div class="secondColumn cell cellInput"><input type="text" v-model="query3" :placeholder="[[ textcomponents.placeholderSuchanfrage3 ]]"></div>
        <div class="thirdColumn cell cellInput">
          <input type="number" v-model.number="result3" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">-</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">D</div>
        <div class="secondColumn cell">{{ query1 ? query1 : 'Schweiz' }} AND {{ query2 ? query2 : 'Zürich' }}</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(1)" v-bind:class="{ redBorder: error1 }">
          <input type="number" v-model.number="result4" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          ≤ {{ count1 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip1 }}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">E</div>
        <div class="secondColumn cell">{{ query1 ? query1 : 'Schweiz' }} AND {{ query3 ? query3 : 'Johannes' }}</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(2)" v-bind:class="{ redBorder: error2 }">
          <input type="number" v-model.number="result5" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          ≤ {{ count2 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip2 }}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">F</div>
        <div class="secondColumn cell">{{ query2 ? query2 : 'Zürich' }} AND {{ query3 ? query3 : 'Johannes' }}</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(3)" v-bind:class="{ redBorder: error3 }">
          <input type="number" v-model.number="result6" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          ≤ {{ count3 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip3 }}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">G</div>
        <div class="secondColumn cell">{{ query1 ? query1 : 'Schweiz' }} OR {{ query2 ? query2 : 'Zürich' }}</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(4)" v-bind:class="{ redBorder: error4 }">
          <input type="number" v-model.number="result7" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          = {{ count4 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip4 }}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">H</div>
        <div class="secondColumn cell">({{ query1 ? query1 : 'Schweiz' }} AND {{ query2 ? query2 : 'Zürich' }}) OR {{ query3 ? query3 : 'Johannes' }}</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(5)" v-bind:class="{ redBorder: error5 }">
          <input type="number" v-model.number="result8" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          = {{ count5 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip5 }}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">I</div>
        <div class="secondColumn cell">{{ query1 ? query1 : 'Schweiz' }} AND {{ query2 ? query2 : 'Zürich' }} OR {{ query3 ? query3 : 'Johannes' }}</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(6)" v-bind:class="{ redBorder: error6 }">
          <input type="number" v-model.number="result9" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          = {{ count6 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip6 }}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">J</div>
        <div class="secondColumn cell">{{ query1 ? query1 : 'Schweiz' }} AND ({{ query2 ? query2 : 'Zürich' }} OR {{ query3 ? query3 : 'Johannes' }})</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(7)" v-bind:class="{ redBorder: error7 }">
          <input type="number" v-model.number="result10" v-on:keyup="getAmount()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          = {{ count7 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip7 }}</span></span>
        </div>
      </div>
    </div>
    <!-- END: TABELLE FÜR DIE BOOLSCHEN OPERATOREN -->


    <!-- START: TABELLE FÜR DIE TRUNKIERUNGEN UND WILDCARDS -->
    <h2 class="titleMedium">{{ textcomponents.trunkierungenWildcards }}</h2>
    <button class="button button-primary-bg" @click="emptyCells(2)">{{ textcomponents.eingabeLeeren }}</button>

    <!-- TABELLE -->
    <div class="table">
      <!-- TABELLE-ZEILEN -->
      <div class="row">
        <div class="firstColumn cell cellTitle emptyCell">&nbsp;</div>
        <div class="secondColumn cell cellTitle">{{ textcomponents.suchanfrage }}</div>
        <div class="thirdColumn cell cellTitle">{{ textcomponents.anzahlTreffer }}</div>
        <div class="fourthColumn cell cellTitle">{{ textcomponents.korrekteAnzahl }}</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">A</div>
        <div class="secondColumn cell cellInput"><input type="text" v-model="query4" :placeholder="[[ textcomponents.placeholderSuchanfrage4 ]]"></div>
        <div class="thirdColumn cell cellInput">
          <input type="number" v-model.number="result11" v-on:keyup="getCounts()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">-</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">B</div>
        <div class="secondColumn cell cellInput"><input type="text" v-model="query5" :placeholder="[[ textcomponents.placeholderSuchanfrage5 ]]"></div>
        <div class="thirdColumn cell cellInput">
          <input type="number" v-model.number="result12" v-on:keyup="getCounts()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">-</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">C</div>
        <div class="secondColumn cell cellInput"><input type="text" v-model="query6" :placeholder="[[ textcomponents.placeholderSuchanfrage6 ]]"></div>
        <div class="thirdColumn cell cellInput">
          <input type="number" v-model.number="result13" v-on:keyup="getCounts()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">-</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">D</div>
        <div class="secondColumn cell cellInput"><input type="text" v-model="query7" :placeholder="[[ textcomponents.placeholderSuchanfrage7 ]]"></div>
        <div class="thirdColumn cell cellInput">
          <input type="number" v-model.number="result14" v-on:keyup="getCounts()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">-</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">E</div>
        <div class="secondColumn cell">{{ query4 ? query4.slice(0,2) : "Jo" }}*</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(8)" v-bind:class="{ redBorder: error8 }">
          <input type="number" v-model.number="result15" v-on:keyup="getCounts()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          ≥ {{ count8 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip8 }}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">F</div>
        <div class="secondColumn cell">{{ query5 ? query5.slice(0,5) : "Johan" }}*</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(9)" v-bind:class="{ redBorder: error9 }">
          <input type="number" v-model.number="result16" v-on:keyup="getCounts()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          ≥ {{ count8 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip9 }}</span></span>
          ; &lt; {{ count9 ? count9 : 0 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip10 }}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">G</div>
        <div class="secondColumn cell">{{ query6 ? query6.slice(0,6) : "Johann" }}*</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(10)" v-bind:class="{ redBorder: error10 }">
          <input type="number" v-model.number="result17" v-on:keyup="getCounts()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          ≥ {{ count10 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip11 }}</span></span>
          ; &lt; {{ count11 ? count11 : 0  }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip12 }}</span></span>
        </div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">H</div>
        <div class="secondColumn cell cellInput"><input type="text" v-model="query8" :placeholder="[[ textcomponents.placeholderSuchanfrage8 ]]"></div>
        <div class="thirdColumn cell cellInput">
          <input type="number" v-model.number="result18" v-on:keyup="getCounts()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">-</div>
      </div>
      <div class="row">
        <div class="firstColumn cell firstColumnCell">I</div>
        <div class="secondColumn cell">{{ query8 ? query8.slice(0,10) : "Müller-Jac" }}*</div>
        <div class="thirdColumn cell cellInput" v-on:keyup="validateNumber(11)" v-bind:class="{ redBorder: error11 }">
          <input type="number" v-model.number="result19" v-on:keyup="getCounts()" :placeholder="[[ textcomponents.placeholderTreffer ]]">
        </div>
        <div class="fourthColumn cell">
          ≥ {{ count12 }}
          <span class="tooltip"><span class="tooltiptext">{{ textcomponents.tooltip13 }}</span></span>
        </div>
      </div>
    </div>
    <!-- END: TABELLE FÜR DIE TRUNKIERUNGEN UND WILDCARDS -->
  </div>
</template>

<script>
import dataset from './json/data_suchanfrage.json'
import datasetEn from './json/data_suchanfrage_eng.json'

export default {
          name: 'Suchanfrage',
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
            error11: false,
            language: 'de',
            infotext: dataset.infotext,
            textcomponents: dataset.textkomponenten
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
              },
              // Load data in selected language
              loadData: function() {
                if (this.language == 'de') {
                  this.infotext = dataset.infotext;
                  this.textcomponents = dataset.textkomponenten;
                }
                else {
                  this.infotext = datasetEn.infotext;
                  this.textcomponents = datasetEn.textkomponenten;
                }
              }
          }
      }
</script>

<style scoped>
      #app {
        text-align: left;
      }
      .introImage {
        width: 100%;
        object-fit: cover;
        margin-bottom: 1rem;
      }
      .suchanfrage-container {
        max-width: 900px;
        margin: 0 auto;
        text-align: left;
      }
      .languageswitch {
        margin-bottom: 2rem;
      }
      .languageswitch > span {
        margin: 0 0.2rem;
      }
      .linkbutton {
        border: 0;
        padding: 0;
        cursor: pointer;
        color: #817e65;
        position: relative;
        font-size: 1rem;
        background: #ffffff;
        outline:none;
      }
      .linkbutton:hover {
        text-decoration: underline;
      }
      .linkbuttonActive {
        text-decoration: underline;
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
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 2rem;
      }
      .row {
        width: 100%;
        max-width: 100%;
        display: flex;
        margin: 0;
      }
      .firstColumn {
        width: 26px;
        min-width: 2%;
        display: flex;
        justify-content: center;
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
        font-weight: 600;
      }
      .firstColumnCell {
        text-align: center;
      }
      .cell {
        border: 1px solid #7a7760;
        margin-top:5px;
        padding: 5px 5px;
        text-align: left;
        min-height: 2rem;
        display: flex;
        align-items: center;
      }
      .emptyCell {
        min-height: 2rem;
      }
      .cellInput {
        padding: 5px 5px;
        display: flex;
        align-items: center;
        min-height: 2rem;
        overflow: hidden;
      }
      input[type=text] {
        border: 0;
        height: 100%;
        width: 100%;
        padding: 0;
        border-radius: 0;
        font-size: 1rem !important;
      }
      input[type=number] {
        border: 0;
        height: 100%;
        width: 100%;
        padding: 0;
        border-radius: 0;
        font-size: 1rem !important;
        -moz-appearance: textfield;
      }
      input:focus{
          outline: none;
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
        margin: 0 0 0 5px;
        cursor: context-menu;
        padding: 0 4px;
        height: 100%;
        width: 12px;
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
        display: none;
        position: absolute;
        background: #B7B6A4;
        padding: 5px 8px;
        left: 0;
        top: 100%;
        z-index: 10;
        min-width: 90px;
        font-size: 0.8rem;
      }
      .button {
        font-size: 1rem;
        padding: 10px 15px;
        color: #817e65;
        border: 1px solid #c0beb2;
        cursor: pointer;
        transition: all 0.25s;
        background-color:#ffffff;
      }
      .button:hover {
        background: #c0beb2;
        color: #ffffff;
      }

      @media screen and (max-width: 767px) {
        .row {
          font-size: 0.9rem;
        }
        input[type=text] {
          font-size: 0.9rem !important;
        }
        input[type=number] {
          font-size: 0.9rem !important;
        }
        .secondColumn {
          width: 46%;
        }
        .thirdColumn {
          width: 27%;
        }
        .fourthColumn {
          width: 27%;
        }
        .tooltip {
          margin: 0 2px;
        }
      }

      @media screen and (max-width: 450px) {
        .row {
          font-size: 0.75rem;
        }
        input[type=text] {
          font-size: 0.75rem !important;
        }
        input[type=number] {
          font-size: 0.75rem !important;
        }
        .tooltip {
          display: none;
        }
        .cell, .cellInput {
          padding: 4px;
        }
      }
</style>
