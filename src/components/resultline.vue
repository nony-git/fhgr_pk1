<template>
  <div class="report-bereich">
    <h3>{{ bereiche[counter-1] }}</h3>
    <div  v-for="(teilbereich, index) in eingabe"
          :key='index'
          :value='teilbereich'
          class="report-line">
      <div class="report-icon">
        <span v-if="teilbereich.schnitt < 2 || teilbereich.schnitt == 'NaN'">
          <img src="../assets/cross.png">
        </span>
        <span v-if="teilbereich.schnitt >= 2 && teilbereich.schnitt < 3" class="rating-bad">
          <img src="../assets/doubleExclamation.png">
        </span>
        <span v-if="teilbereich.schnitt >= 3 && teilbereich.schnitt < 4" class="rating-medium">
          <img src="../assets/exclamation.png">
        </span>
        <span v-if="teilbereich.schnitt >= 4" class="rating-good">
          <img src="../assets/tick.png">
        </span>
      </div>
      <div class="report-teilbereich">
        <h4>{{teilbereich.name}}</h4>
      </div>
    </div>
  </div>
</template>

<!----/ Script /---->

<script>
export default {
  name: "resultline",
  props:["eingabe","textcomponents","bereiche","counter"],
  data: function () {
    return {

    };
  },
};
</script>

<!----/ Style /---->

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
td{
  padding: 1em;
  text-align:center;
}
.report-bereich{
  text-align: left;
  padding: 2em 1em 1em 1em;
  line-height: 3em;
}
.report-bereich h2{
  margin-bottom:.5em;
}
.report-line{
  display:flex;
  align-items: center;
  padding: .25em 1em;
}
.report-icon{
  color:red;
  font-size: 1.5rem;
}
.report-teilbereich{
  padding-left:1em;
}
.report-teilbereich h3{
  margin:0;
}
.rating-severe{
  background-image: url("../assets/cross.png");
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: center;
}
.rating-bad{
  background-image: url("../assets/doubleExclamation.png");
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: center;
}
.rating-medium{
  background-image: url("../assets/exclamation.png");
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: center;
}
.rating-good{
  background-image: url("../assets/tick.png");
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: center;
}
</style>
