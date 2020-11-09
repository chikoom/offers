<template>
  <base-card>
    <article class="offer-preview">
      <h3 class="offer-preview-title">
        {{ title }}
      </h3>
      <p class="offer-preview-sub">
        פורסם ע"י {{ userId }}
      </p>
      <p class="offer-preview-description">
        {{ offerDynamicText }}
      </p>
      <div v-if="isDeatilsOpen" class="offer-preview-details">
        <span class="offer-preview-email">אימייל: <a href="mailto:callforcopy@gmail.com">{{ email }}</a></span>
        <span class="offer-preview-phone">טלפון: <a href="tel:0528228640">{{ phone }}</a></span>
      </div>
      <divider />
      <div class="offer-preview-actions">
        <app-button btn-style="small" @click="toggleDetails">
          פרטים נוספים
        </app-button>
        <!-- <button class="offer-preview-more" @click="toggleDetails">
          פרטים נוספים
        </button> -->
        <span class="offer-preview-viewers">כרגע צופים במודעה 3 אנשים</span>
      </div>
    </article>
  </base-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { shortenText } from '~/components/common/functions'

export default Vue.extend({
  name: 'OfferPreview',
  props: {
    id: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isDeatilsOpen: false
    }
  },
  computed: {
    offerDynamicText ():string {
      return this.isDeatilsOpen ? this.$props.description : shortenText(this.$props.description, 50)
    }
  },
  methods: {
    toggleDetails () {
      this.isDeatilsOpen = !this.isDeatilsOpen
    }
  }
})
</script>
<style scoped>
  .offer-preview{
    width: 100%;
  }
  .offer-preview-sub {
    font-size: 0.7em;
    color: #999;
  }
  .offer-preview-actions {
    display: flex;
    justify-content: space-between;
  }
</style>
