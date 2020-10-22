import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import $t from "$t";
import ApplicationComponent from "@/App.vue";

describe("Application: page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueI18n);

  const stub = {
    VApp: true,
    VListItem: true,
    VListItemContent: true,
    VListItemTitle: true,
    VListItemSubtitle: true,
    VDivider: true,
    VList: true,
    VListItemIcon: true,
    VListItemAction: true,
    VIcon: true,
    VSelect: true,
    VMain: true,
    VContainer: true,
    VNavigationDrawer: true,
    RouterView: true
  };
  const i18n = new VueI18n({
    locale: "en",
    fallbackLocale: "en"
  });

  let wrapper;

  beforeEach(() => {
    wrapper = mountWrapper(localVue, stub, i18n);
  });

  test("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });
  describe("methods", () => {
    test("Test change lang when calls changeLang", () => {
      const oldLang = "test";
      const newLang = "new test";

      wrapper.vm.$i18n.locale = oldLang;

      expect(wrapper.vm.$i18n.locale).toBe(oldLang);

      wrapper.vm.changeLang(newLang);

      expect(wrapper.vm.$i18n.locale).toBe(newLang);
    });
  });
});

function mountWrapper(localVue, stubs, i18n) {
  return shallowMount(ApplicationComponent, {
    localVue,
    stubs,
    i18n,
    mocks: {
      $t
    }
  });
}
