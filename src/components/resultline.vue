<template>
  <div class="report-bereich">
    <h3>{{ bereiche[counter-1] }}</h3>
    <div  v-for="(teilbereich, index) in eingabe"
          :key='index'
          :value='teilbereich'
          class="report-line">
      <div class="report-icon">
        <span v-if="teilbereich.schnitt < 2 || teilbereich.schnitt == 'NaN'">
          <img src="/apps/app_cheval/img/cross.328077ea.png">
        </span>
        <span v-if="teilbereich.schnitt >= 2 && teilbereich.schnitt < 3">
          <img src="/apps/app_cheval/img/doubleExclamation.1928201c.png">
        </span>
        <span v-if="teilbereich.schnitt >= 3 && teilbereich.schnitt < 4">
          <img src="/apps/app_cheval/img/exclamation.efb4cf4d.png">
        </span>
        <span v-if="teilbereich.schnitt >= 4">
          <img src="/apps/app_cheval/img/tick.df315f95.png">
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
.report-teilbereich{
  padding-left:1em;
}
.report-teilbereich h3{
  margin:0;
}

</style>
