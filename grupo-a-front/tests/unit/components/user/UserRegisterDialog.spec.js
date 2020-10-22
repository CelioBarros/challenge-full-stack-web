import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import flushPromises from "flush-promises";
import $t from "$t";
import UserRegisterDialog from "@/components/user/UserRegisterDialog";

describe("UserRegisterDialog Component", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const stubs = {
    VDialog: true,
    VRow: true,
    VCol: true,
    VBtn: true,
    VSpacer: true,
    VDivider: true,
    VCard: true,
    VCardTitle: true,
    VCardText: true,
    VCardActions: true,
    VTextField: true,
    VForm: true,
    VContainer: true,
    VIcon: true
  };
  const store = {
    modules: {
      user: {
        namespaced: true,
        actions: {
          saveUser: jest.fn(),
          editUser: jest.fn()
        }
      }
    }
  };
  const propsData = {
    dialog: false
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mountWrapper(localVue, stubs, store, propsData);
    wrapper.vm.$refs.form.resetValidation = jest.fn();
    jest.clearAllMocks();
  });

  test("should register modal exists", () => {
    expect(wrapper.find("vdialog-stub").exists()).toBeTruthy();
  });

  describe("methods", () => {
    beforeEach(() => {
      wrapper.vm.loading = false;
      wrapper.vm.$refs.form.resetValidation = jest.fn();
    });
    describe("#close", () => {
      test("should emit close-dialog", async () => {
        expect(wrapper.emitted().closeDialog).toBeFalsy();

        wrapper.vm.close();

        await flushPromises();

        expect(wrapper.emitted().closeDialog).toBeFalsy();
      });
      test("should call form resetValidation", async () => {
        expect(wrapper.vm.$refs.form.resetValidation).not.toHaveBeenCalled();

        wrapper.vm.close();

        await flushPromises();

        expect(wrapper.vm.$refs.form.resetValidation).toHaveBeenCalled();
      });
    });

    describe("#save", () => {
      describe("valid", () => {
        beforeEach(() => {
          wrapper.vm.valid = true;
        });
        test("should see loading", async () => {
          expect(wrapper.vm.loading).toBeFalsy();

          wrapper.vm.save();

          expect(wrapper.vm.loading).toBeTruthy();

          await flushPromises();

          expect(wrapper.vm.loading).toBeFalsy();
        });
        describe("#create", () => {
          beforeEach(() => {
            wrapper.vm.edition = false;
          });
          test("should call saveUser function", async () => {
            const saveUserSpy = jest.spyOn(wrapper.vm, "saveUser");
            expect(saveUserSpy).not.toHaveBeenCalled();
            wrapper.vm.save();

            await flushPromises();

            expect(saveUserSpy).toHaveBeenCalled();
          });
        });
        describe("#edit", () => {
          beforeEach(() => {
            wrapper.vm.edition = true;
          });
          test("should call editUser function", async () => {
            const editUserSpy = jest.spyOn(wrapper.vm, "editUser");
            expect(editUserSpy).not.toHaveBeenCalled();
            wrapper.vm.save();

            await flushPromises();

            expect(editUserSpy).toHaveBeenCalled();
          });
        });
        test("should emit saved", async () => {
          expect(wrapper.emitted().saved).toBeFalsy();

          wrapper.vm.save();

          await flushPromises();

          expect(wrapper.emitted().saved).toBeTruthy();
        });
      });
      describe("invalid", () => {
        beforeEach(() => {
          wrapper.vm.valid = false;
          wrapper.vm.$refs.form.validate = jest.fn();
        });
        test("should call form validation", () => {
          expect(wrapper.vm.$refs.form.validate).not.toHaveBeenCalled();

          wrapper.vm.save();

          expect(wrapper.vm.$refs.form.validate).toHaveBeenCalled();
        });
      });
    });
  });
});

function mountWrapper(localVue, stubs, store, propsData) {
  return shallowMount(UserRegisterDialog, {
    localVue,
    stubs,
    propsData,
    mocks: {
      $t,
      $store: new Vuex.Store(store),
      $refs: {
        form: {
          validate: jest.fn()
        }
      },
      $vuetify: {
        theme: {
          dark: true
        }
      }
    }
  });
}
