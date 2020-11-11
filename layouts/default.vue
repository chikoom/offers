<template>
  <div class="site-layout">
    <the-nav-bar @sidenavToggle="displaySideNav = !displaySideNav" />
    <the-sidenav :show="displaySideNav" @close="displaySideNav = false" />
    <Nuxt />
    <the-footer />
  </div>
</template>
<script>

export default {
  data () {
    return {
      displaySideNav: false
    }
  },
  async mounted () {
    this.socket = await this.$nuxtSocket({ name: 'home', channel: '/', persist: 'home' })
    await this.$store.dispatch(
      '$nuxtSocket/emit',
      {
        label: 'home',
        evt: 'getViewers',
        msg: {}
      }
    )
  }
}
</script>
<style>
html {
  font-family:
    'M PLUS Rounded 1c',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  direction:rtl;
}

.site-layout {
  padding-top:var(--menu-height);
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
