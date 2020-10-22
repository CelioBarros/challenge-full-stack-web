<template>
  <v-card>
    <user-register-dialog
      :dialog="dialog"
      :item="userSelected"
      @saved="savedUser"
      @close-dialog="
        dialog = false;
        userSelected = {};
      "
    />
    <v-snackbar top v-model="snackbar" :timeout="timeout" color="success">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-card-title
      :class="[
        'justify-center grey',
        $vuetify.theme.dark ? 'darken-2' : 'lighten-2'
      ]"
    >
      <span id="add-modal-title" class="headline">
        {{ $t("components.user.data-table.title") }}
      </span>
    </v-card-title>
    <v-card-actions>
      <v-text-field
        id="search-by-name"
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('components.user.data-table.search')"
        :loading="loading"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        id="add-student-button"
        color="blue-grey"
        class="white--text"
        :loading="loading"
        @click="dialog = true"
      >
        {{ $t("components.user.data-table.add-button") }}
      </v-btn>
    </v-card-actions>
    <v-data-table
      id="application-table"
      :headers="headers"
      :items="users"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      class="elevation-0 transparent"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-inline-flex">
          <tooltip>
            <v-btn
              :id="'btn-edit-' + item.ra"
              slot="button"
              nuxt
              icon
              @click="editUser(item)"
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <span slot="text">
              {{ $t("components.user.data-table.tooltip.edit") }}
            </span>
          </tooltip>
          <tooltip>
            <v-btn
              :id="'btn-delete-' + item.ra"
              slot="button"
              nuxt
              icon
              @click="removeUser(item)"
            >
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
            <span slot="text">
              {{ $t("components.user.data-table.tooltip.delete") }}
            </span>
          </tooltip>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import _ from "lodash";
import Tooltip from "@/components/utils/Tooltip";
import UserRegisterDialog from "@/components/user/UserRegisterDialog";

export default {
  name: "UserDataTable",
  components: {
    Tooltip,
    UserRegisterDialog
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("components.user.data-table.header.ra"),
          value: "ra"
        },
        {
          text: this.$t("components.user.data-table.header.name"),
          value: "name"
        },
        {
          text: this.$t("components.user.data-table.header.cpf"),
          value: "cpf"
        },
        {
          text: this.$t("components.user.data-table.header.actions"),
          sortable: false,
          align: "right",
          value: "actions"
        }
      ];
    }
  },
  data() {
    return {
      dialog: false,
      users: [],
      userSelected: {},
      search: "",
      options: {
        size: 10,
        page: 1,
        sortBy: ["name"],
        sortDesc: [false]
      },
      totalItems: 0,
      loading: false,
      snackbar: false,
      text: "",
      timeout: 2000
    };
  },
  watch: {
    options: {
      handler() {
        this.loadUsers();
      },
      deep: true
    },
    search(value) {
      this.loadUsersDebounced();
    }
  },
  methods: {
    ...mapActions("user", ["getUsers", "deleteUser"]),
    loadUsers() {
      this.loading = true;
      this.users = [];
      const sort = this.options.sortBy[0]
        ? `${this.options.sortBy[0]},${
            this.options.sortDesc[0] ? "desc" : "asc"
          }`
        : undefined;
      this.getUsers({
        page: this.options.page - 1,
        size: this.options.itemsPerPage,
        sort,
        name: this.search
      })
        .then(result => {
          this.totalItems = result.data.totalElements;
          this.users = result.data.content;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadUsersDebounced: _.debounce(function() {
      this.options.page === 1 ? this.loadUsers() : (this.options.page = 1);
    }, 500),
    editUser(item) {
      this.userSelected = item;
      this.dialog = true;
    },
    removeUser(item) {
      if (
        confirm(
          this.$t("components.user.data-table.delete-student", { ra: item.ra })
        )
      ) {
        this.deleteUser(item.ra).then(() => this.loadUsers());
      }
    },
    savedUser() {
      this.loadUsers();
      this.text = this.$t("components.user.data-table.saved");
      this.snackbar = true;
    }
  }
};
</script>
