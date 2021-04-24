<template>
  <main class="container">
    <section
      class="image"
      :style="`background: url('/${currentItem.img}') no-repeat center center`"
    ></section>
    <section class="details">
      <h1>Taco</h1>
      <h3>Price: ${{ currentItem.price.toFixed(2) }}</h3>
      <div class="quantity">
        <input type="number" min="1" v-model="count" />
        <button @click="addToCart" class="primary">
          Add to Cart - ${{ combinedPrice }}
        </button>
      </div>
      <fieldset v-if="currentItem.options">
        <legend>
          <h3>Options</h3>
        </legend>
        <div v-for="option in currentItem.options" :key="option">
          <input
            type="radio"
            name="option"
            :id="option"
            :value="option"
            v-model="itemOption"
          />
          <label :for="option">{{ option }}</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <h3>Add ons</h3>
        </legend>
        <div v-for="addon in currentItem.addOns" :key="addon">
          <input
            type="checkbox"
            name="addon"
            :id="addon"
            :value="addon"
            v-model="itemAddons"
          />
          <label :for="addon">{{ addon }}</label>
        </div>
      </fieldset>

      <AppToast v-if="cartSubmitted">
        Order submitted! <br />
        Check out more
        <nuxt-link exact to="/restaurants">restaurants?</nuxt-link>
      </AppToast>
    </section>
    <section class="options">
      <h1>Description</h1>
      <p>{{ currentItem.description }}</p>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
import AppToast from "@/components/AppToast.vue";

export default {
  name: "ItemPage",
  components: {
    AppToast
  },
  data() {
    return {
      id: this.$route.params.id,
      count: 1,
      itemOption: "",
      itemAddons: [],
      cartSubmitted: false
    };
  },
  computed: {
    ...mapState(["fooddata"]),
    currentItem() {
      let result;

      for (let i = 0; i < this.fooddata.length; i++) {
        for (let j = 0; j < this.fooddata[i].menu.length; j++) {
          if (this.fooddata[i].menu[j].id === this.id) {
            result = this.fooddata[i].menu[j];
            break;
          }
        }
      }

      return result;
    },
    combinedPrice() {
      const total = this.currentItem.price * this.count;
      return total.toFixed(2);
    }
  },
  methods: {
    addToCart() {
      let formOutput = {
        item: this.currentItem.item,
        count: this.count,
        options: this.itemOption,
        addOns: this.itemAddons,
        combinedPrice: this.combinedPrice
      };

      this.cartSubmitted = true;
      this.$store.commit("addToCart", formOutput);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 100px auto;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 400px 1fr;
  grid-template-areas:
    "image details"
    "options details";
  justify-content: center;
  align-content: center;
  gap: 60px;
  line-height: 2;

  .image {
    grid-area: image;
  }
  .details {
    grid-area: details;
    position: relative;
  }
  .options {
    grid-area: options;
  }
}
</style>
