<template>
  <div class="report-bereich">
    <h2>Information & Kommunikation</h2>
    <div class="report-line">
      <div class="report-icon">
        X
      </div>
      <div class="report-teilbereich">
        <h3>{{eingabe}}</h3>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "resultline",
  props:["eingabe"],
  data: function () {
    return {

    };
  },
  methods:{
    
  },
  watch: {
    
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
td{
  padding: 1em;
  text-align:center;
  /* border:1px solid black; */
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
}
.report-teilbereich{
  padding-left:1em;
}
.report-teilbereich h3{
  margin:0;
}
</style>
