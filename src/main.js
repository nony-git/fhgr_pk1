import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = true

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

const mountEl = document.querySelector('#app');
new Vue({
  render: createElement => {
    const context = {
      props: { ...mountEl.dataset },
    };
    return createElement(App, context);
  }, 

}).$mount('#app');