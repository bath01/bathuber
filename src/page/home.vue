<template>
  <div class="home">
    <div class="header">
      <img
        src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg"
        alt=""
      />
      <div class="wrapper--input">
        <input
          v-model="user_search_restaurant"
          type="text"
          id=""
          placeholder="De quoi avez-vous envie?"
        />
        <div class="search">
          <div
            v-for="(restaurant, i) in search_restaurant"
            :key="i"
          name=""
            class="container--restaurant--search"
          >
            <div class="wrapper--img">
              <img :src="restaurant.image" alt="" />
            </div>
            <p>{{ restaurant.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bannier"></div>
    <restaurantRow
      v-for="(data, i) in data_restaurant"
      :key="i"
      :three_restaurant="data"
    />
  </div>
</template>

<script>
//Import
// eslint-disable-next-line no-unused-vars
import BDD from "../BDD";
// eslint-disable-next-line no-unused-vars
import { onMounted, ref, watch } from "vue";
//Components
import RestaurantRow from "../components/RestaurantRow.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    RestaurantRow,
  },
  setup() {
    console.log(BDD);
    class Restaurant {
      constructor(name, note, image, drive_time) {
        this.name = name;
        this.note = note;
        this.image = image;
        this.drive_time = drive_time;
      }
    }

    let data_restaurant = ref([]);
    let all_restaurant = [];

    const makeDataRestaurant = () => {
      let three_restaurant = [];

      for (const restaurant of BDD) {
        const new_restaurant = new Restaurant(
          restaurant.name,
          restaurant.note,
          restaurant.image,
          restaurant.drive_time
        );

        //make all restaurant array
        all_restaurant.push(new_restaurant);

        if (three_restaurant.length === 2) {
          three_restaurant.push(new_restaurant);
          data_restaurant.value.push(three_restaurant);
          three_restaurant = [];
        } else {
          three_restaurant.push(new_restaurant);
        }
      }
      //console.log(data_restaurant);
    };

    //User search restaurant
    let user_search_restaurant = ref("");
    let search_restaurant = ref([]);

    watch(user_search_restaurant, (new_value) => {
      let regex = RegExp(new_value.toLowerCase());

      let new_search_restaurant = all_restaurant.filter((restaurant) =>
        regex.test(restaurant.name.toLowerCase())
      );

      if (new_value == 0) {
        search_restaurant.value = [];
      } else {
        search_restaurant.value = new_search_restaurant;
      }

      //console.log(search_restaurant);
    });
    //
    onMounted(makeDataRestaurant);

    return {
      data_restaurant,
      user_search_restaurant,
      search_restaurant,
    };

    //makeDataRestaurant();
    //var resto = new Restaurant("Bath Dorgeles", 4.5, "img", "45min");
    //console.log(resto);
  },
};
</script>

<style lang="scss">
.home {
  .header {
    height: 120px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 200px;
    }
    .wrapper--input {
      position: relative;
      input {
        background-color: #f6f6f6;
        border: none;
        height: 60px;
        width: 400px;
        outline: none;
        padding-left: 20px;
      }
      .search {
        position: absolute;
        top: 100%;
        width: 100%;
        //height: 400px;
        background: #fff;
        //border: 1px solid red;

        .container--restaurant--search {
          display: flex;
          align-items: center;
          padding: 10px;

          &:hover {
            background: #f6f6f6;
          }

          .wrapper--img {
            height: 60px;
            width: 60px;
            margin-right: 25px;
            border-radius: 50%;
            overflow: hidden;

            img {
              height: 100%;
              width: auto;
            }
          }
        }
      }
    }
  }
  .bannier {
    height: 200px;
    width: 100%;
    background-image: url("https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_1422,h_948/v1622579402/assets/6d/caa1da-ef21-426e-b3be-170af0054fa9/original/WelcomeToUberEats.jpg");
    background-size: cover;
    background-position: center center;
  }
}
</style>
