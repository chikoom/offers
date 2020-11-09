<template>
  <form @submit.prevent="postOffer">
    <div class="form-group">
      <controlled-input v-model="editedOffer.title" name="title">
        כותרת ההצעה:
      </controlled-input>
      <p v-if="!titleValid" class="input-validation">
        הכותרת צריכה להיות בין 2-60 תווים
      </p>
    </div>
    <div class="form-group">
      <controlled-input v-model="editedOffer.description" name="description" control-type="textarea">
        תיאור ההצעה:
      </controlled-input>
      <p v-if="!descriptionValid" class="input-validation">
        תיאור ההצעה יכול להיות עד 200 תווים
      </p>
    </div>
    <div class="form-group">
      <controlled-input v-model="editedOffer.email" name="email">
        כתובת אימייל:
      </controlled-input>
      <p v-if="!emailValid" class="input-validation">
        אנא הזינו כתובת אימייל אמיתית
      </p>
    </div>
    <div class="form-group">
      <controlled-input v-model="editedOffer.phone" name="phone">
        טלפון לפרטים:
      </controlled-input>
      <p v-if="!phoneValid" class="input-validation">
        אנא הזינו מספר טלפון אמיתי
      </p>
    </div>
    <divider />
    <div class="form-group">
      <app-button type="submit" :class="{ 'invalid': offerValid }">
        פרסום ההצעה
      </app-button>
      <!-- <button class="form-submit">
      </button> -->
    </div>
  </form>
</template>

<script>

export default {
  data () {
    return {
      editedOffer: {
        title: null,
        description: null,
        email: this.$auth.user.email,
        phone: null
      }
    }
  },
  computed: {
    titleValid () {
      if (this.editedOffer.title !== null) {
        return this.editedOffer.title.match(/^[א-תa-zA-Z0-9_!?()@# ]{2,60}$/)
      }
      return true
    },
    descriptionValid () {
      if (this.editedOffer.description !== null) {
        return this.editedOffer.description.match(/^[א-תa-zA-Z0-9_!?()@#%*&:;,.' "+-=]{1,200}$/)
      }
      return true
    },
    emailValid () {
      if (this.editedOffer.email !== null) {
        return this.editedOffer.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      }
      return true
    },
    phoneValid () {
      if (this.editedOffer.phone !== null) {
        return this.editedOffer.phone.match(/^\+*\d{2,3}[- ]{0,1}\d{7,10}$/)
      }
      return true
    },
    offerValid() {
      return this.titleValid && this.descriptionValid && this.emailValid && this.phoneValid && this.editedOffer.title && this.editedOffer.description && this.editedOffer.email && this.editedOffer.phone ? true : false
    }
  },
  methods: {
    postOffer() {
      console.log(this.offerValid)
      if (!this.offerValid) {
        
      } else {
        this.$emit('submit-data', this.editedOffer)
        this.clearFields()
      }
    },
    clearFields () {
      this.editedOffer.title = null
      this.editedOffer.description = this.$auth.user.email
      this.editedOffer.email = null
      this.editedOffer.phone = null
    }
  }
}
</script>
<style scoped>
  form {
    margin: 0 auto;
    width: 90%;
  }
  .form-group {
    display: flex;
    flex-direction: column;
  }
  label {
    display: block;
  }
  input, textarea {
    border: 0;
    border-bottom: 1px solid #aaa;
    padding: 0.5em;
    background-color: #f5f5f5;
  }
  .form-submit{
    border: 0;
    width: 150px;
    padding: 20px;
    cursor: pointer;
  }
  .input-validation {
   color: red;
   font-size: 0.7em;
 }
 .disabled{
   background-color:#aaa
 }
</style>
