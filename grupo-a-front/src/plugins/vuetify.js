import Vue from "vue";
import Vuetify from "vuetify/lib";
import pt from "vuetify/es5/locale/pt";
import en from "vuetify/es5/locale/en";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt, en },
    current: "pt"
  }
});
