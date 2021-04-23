<template>
  <main class="container">
    <section
      class="image"
      :style="`background: url('/${currentItem.img}') no-repeat center center`"
    ></section>
    <section class="details">
      <h1>Taco</h1>
      <h3>Price: {{ priceFormatting(currentItem.price) }}</h3>
      <div class="quantity">
        <input type="number" min="1" v-model="quantity" />
        <button class="primary">
          Add to Cart - {{ priceFormatting(currentItem.price * quantity) }}
        </button>
      </div>
      <fieldset v-if="currentItem.options">
        <legend>
          <h3>Options</h3>
        </legend>
        <div v-for="option in currentItem.options" :key="option">
          <input type="radio" :id="option" :value="option" />
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
            :id="addon"
            :value="addon"
            v-model="selectedAddons"
          />
          <label :for="addon">{{ addon }}</label>
        </div>
      </fieldset>
    </section>
    <section class="options">
      <h1>Description</h1>
      <p>{{ currentItem.description }}</p>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id,
      quantity: 1,
      selectedOption: "",
      selectedAddons: []
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
    }
  },
  methods: {
    priceFormatting(price) {
      return `$${price.toFixed(2)}`;
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
  }
  .options {
    grid-area: options;
  }
}
</style>
