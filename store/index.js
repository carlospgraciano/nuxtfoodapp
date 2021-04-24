import { v4 as uuidv4 } from "uuid";

export const state = () => ({
  fooddata: [],
  cart: []
});

export const getters = {
  totalPrice: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((acc, next) => acc + +next.combinedPrice, 0);
  },
  totalItems: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((acc, next) => acc + +next.count, 0);
  }
};

export const mutations = {
  updateFoodData: (state, data) => {
    state.fooddata = data;
  },
  addToCart: (state, formOutput) => {
    formOutput.id = uuidv4();
    state.cart.push(formOutput);
  }
};

export const actions = {
  async getFoodData({ state, commit }) {
    if (state.fooddata.length) return;
    try {
      const data = await fetch(`${process.env.RESTAURANT_API}/restaurants`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.AWS_API_KEY
        }
      }).then(response => response.json());
      commit("updateFoodData", data);
    } catch (err) {
      console.log(err);
    }
  }
};
