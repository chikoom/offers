<template>
  <section>
    <div v-if="$auth.loggedIn" class="nav-logout">
      <app-button btn-style="small" @click="$auth.logout()">התנתקות</app-button>
    </div>
    <div v-else>
      <!-- <nuxt-link to="/admin/auth">Login/Signup</nuxt-link> -->
      <app-button btn-style="small" @click="openLoginForm()">התחברות</app-button>
    </div>
    <div class="nav-logo">
      <nuxt-link to="/">
        Offerzzz
      </nuxt-link>
    </div>
    <nav>
      <nuxt-link to="/">
        בית
      </nuxt-link>
      <nuxt-link v-if="$auth.loggedIn" to="/admin">
        ההצעות שלך
      </nuxt-link>
    </nav>
    <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
    <base-modal v-if="showLogin" @close-modal="closeLoginForm">
      <login-form @login-success="closeLoginForm" />
    </base-modal>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      showLogin: false
    }
  },
  methods: {
    openLoginForm() {
      this.showLogin = true
    },
    closeLoginForm() {
      this.showLogin = false
    }
  }
})
</script>
<style scoped>
  section {
    position: fixed;
    top:0;
    left:0;
    display: flex;
    width: 100%;
    background-color: var(--bg-secondary);
    justify-content: space-between;
    align-content: center;
    align-items: center;
    direction: rtl;
    flex-direction: row-reverse;
    padding: 0 1em;
    box-shadow: 0px 2px 11px var(--shadow-color);
    height: var(--menu-height);
  }
  .nav-logo a{
    font-family: 'Lobster', cursive;
    color: var(--color-primary);
    text-decoration: none;
    font-size: 1.5em;
  }
  nav{
    display: flex;
    flex-direction: row-reverse;
  }
  nav a,
  nav a:visited
  {
    color: #333;
    text-decoration: none;
    font-size: 1em;
    display: inline-block;
    border-bottom: 2px solid #333;
    padding: 5px;
    margin-right: 5px;
  }
  nav a.nuxt-link-exact-active
  {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
  nav,
  .nav-logout {
    display: none;
  }
  .nav-logo{
    width: 100%;
    text-align: center;
  }
  @media (min-width: 768px) {
  nav,
  .nav-logout {
    display: block;
  }
  .nav-logo{
    width: auto;
  }
}
</style>
