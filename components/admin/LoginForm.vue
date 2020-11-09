<template>
  <form class="login-form" @submit.prevent="submitLoginForm">
    <controlled-input v-if="!isLogin" v-model.trim="username" type="username">
      שם משתמש:
    </controlled-input>
    <p v-if="!usernameValid" class="input-validation">
      שם המשתמש צריך להיות באנגלית, בין 6-12 אותיות או מספרים ללא סימנים מיוחדים
    </p>
    <controlled-input v-model.trim="email" type="email">
      כתובת אימייל:
    </controlled-input>
    <p v-if="!emailValid" class="input-validation">
      אנא הזינו כתובת מייל חוקית
    </p>
    <controlled-input v-model.trim="password" type="password">
      ססמה:
    </controlled-input>
    <p v-if="!passwordValid" class="input-validation">
      הססמה צריכה להיות בין 6-12 אותיות או מספרים ללא סימנים מיוחדים
    </p>
    <div class="form-actions">
      <app-button type="submit">{{ isLogin ? 'כניסה' : 'הרשמה' }}</app-button>
      <app-button
        type="button"
        btn-style="inverted small"
        @click="isLogin = !isLogin"
      >
        {{ isLogin ? 'משתמש חדש? הרשמה' : 'משתמש קיים? לכניסה' }}
      </app-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AdminAuthPage',
  layout: 'admin',
  data () {
    return {
      isLogin: true,
      username: null,
      password: null,
      email: null
    }
  },
  computed: {
    usernameValid () {
      if (this.username !== null) {
        return this.username.match(/^[a-zA-Z0-9_]{6,12}$/)
      }
      return true
    },
    emailValid () {
      if (this.email !== null) {
        return this.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      }
      return true
    },
    passwordValid () {
      if (this.password !== null) {
        return this.password.match(/^[a-zA-Z0-9_]{6,12}$/)
      }
      return true
    }
  },
  methods: {
    async submitLoginForm () {
      if ((!this.isLogin && !this.username) || !this.email || !this.password || !this.usernameValid || !this.emailValid || !this.passwordValid) {
        return false
      }
      if (this.isLogin) {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$auth.setRefreshToken('local', response.data.refreshToken)
        this.$emit('login-success')
        this.$router.push('/admin')
      } else {
        const response = await this.$axios.$post('/api/auth/signup', {
          username: this.username, email: this.email, password: this.password
        })
        if (!response) {

        } else {
          const response = await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
          this.$auth.setRefreshToken('local', response.data.refreshToken)
          this.$router.push('/admin')
          this.$emit('login-success')
        }
      }
    }
  }
}
</script>

<style scoped>
  form {
    width: 90%;
    margin: 0 auto;
  }
 .form-actions {
   display: flex;
   justify-content: space-between;
 }
 .input-validation {
   color: red;
   font-size: 0.7em;
 }
</style>
