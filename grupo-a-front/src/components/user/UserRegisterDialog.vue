<template>
  <v-dialog
    id="register-modal"
    v-model="dialog"
    max-width="500px"
    @click:outside="close"
  >
    <v-card color="bgCard">
      <v-card-title
        :class="['grey', $vuetify.theme.dark ? 'darken-2' : 'lighten-2']"
      >
        <span id="add-modal-title" class="headline">
          {{ $t("components.user.register-dialog.title") }}
        </span>
        <v-spacer />
        <v-btn id="close-btn" icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-form id="register-dialog-form" ref="form" v-model="valid">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  id="name-field"
                  v-model="editedItem.name"
                  outlined
                  :rules="[rules.required]"
                >
                  <template #label>
                    {{ $t("components.user.register-dialog.fields.name") }}
                    <span class="deep-orange--text text--accent-4">
                      <strong> *</strong>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  id="email-field"
                  v-model="editedItem.email"
                  outlined
                  :rules="[rules.required]"
                >
                  <template #label>
                    {{ $t("components.user.register-dialog.fields.email") }}
                    <span class="deep-orange--text text--accent-4">
                      <strong> *</strong>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  id="ra-field"
                  v-model="editedItem.ra"
                  outlined
                  :rules="[rules.required, rules.integerValidation]"
                  :disabled="edition"
                >
                  <template #label>
                    {{ $t("components.user.register-dialog.fields.ra") }}
                    <span class="deep-orange--text text--accent-4">
                      <strong> *</strong>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  id="cpf-field"
                  v-model="editedItem.cpf"
                  outlined
                  :rules="[rules.required]"
                  :disabled="edition"
                >
                  <template #label>
                    {{ $t("components.user.register-dialog.fields.cpf") }}
                    <span class="deep-orange--text text--accent-4">
                      <strong> *</strong>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn id="cancel-button" color="accent" @click="close">
          {{ $t("components.user.register-dialog.buttons.cancel") }}
        </v-btn>
        <v-btn id="save-button" depressed color="primary" @click="save">
          {{ $t("components.user.register-dialog.buttons.save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserRegisterDialog",
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          email: "",
          name: "",
          cpf: "",
          ra: ""
        };
      }
    },
    dialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  watch: {
    item: {
      handler(value) {
        if (value.ra) this.edition = true;
        this.editedItem = Object.assign({}, this.item);
      },
      deep: true
    }
  },
  data() {
    return {
      valid: false,
      edition: false,
      loading: false,
      editedItem: {},
      rules: {
        required: value =>
          !!value || this.$t("components.user.register-dialog.rules.required"),
        integerValidation: value =>
          (Number.isInteger(Number(value)) && Number(value) >= 0) ||
          this.$t("components.user.register-dialog.rules.integer-validation")
      }
    };
  },
  created() {
    this.editedItem = Object.assign({}, this.item);
  },
  methods: {
    ...mapActions("user", ["saveUser", "editUser"]),
    async save() {
      if (this.valid) {
        this.loading = true;
        !this.edition
          ? await this.saveUser(this.editedItem)
          : await this.editUser(this.editedItem);
        this.loading = false;
        this.close();
        this.$emit("saved");
      } else {
        this.$refs.form.validate();
      }
    },
    close() {
      this.$emit("close-dialog");
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.item);
        this.$refs.form.resetValidation();
        this.edition = false;
      });
    }
  }
};
</script>
