<template>
  <div id="app">
    <v-app id="auth-app">
      <v-navigation-drawer permanent fixed app>
        <v-list-item>
          <v-list-item-content class="text-center">
            <v-list-item-title>
              <img id="logo" src="@/assets/logo-grupoa.webp" alt="logo" />
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t("navigation-item.home") }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="item in menuItems"
            :to="item.to"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list>
            <v-list-item @click="$vuetify.theme.dark = !$vuetify.theme.dark">
              <v-list-item-action>
                <v-icon>mdi-brightness-6</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  v-text="$t('navigation-item.change-theme')"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                v-text="$t('navigation-item.change-language')"
              />
              <v-list-item-action>
                <v-select
                  v-model="$i18n.locale"
                  :items="langs"
                  @change="changeLang"
                />
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
      <v-container>
        <v-main>
          <router-view />
        </v-main>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  computed: {
    menuItems() {
      return [
        {
          icon: "mdi-account-cog",
          title: this.$t("navigation-item.user"),
          to: "/"
        }
      ];
    }
  },
  data() {
    return {
      langs: ["pt", "en"]
    };
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
    }
  }
};
</script>
<style lang="scss" scoped>
#logo {
  height: 65px;
}
</style>
