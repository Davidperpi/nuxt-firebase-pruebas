<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-firebase</h1>
      <b-form-input
        style="margin-top: 5px"
        v-model="user.name"
        placeholder="Enter your name"
      ></b-form-input>
      <b-form-input
        style="margin-top: 5px"
        v-model="user.email"
        placeholder="Enter your email"
      ></b-form-input>
      <b-form-input
        style="margin-top: 5px"
        v-model="user.password"
        placeholder="Enter your password"
      ></b-form-input>
      <b-form-input
        style="margin-top: 5px"
        v-model="user.role"
        placeholder="Enter your role"
      ></b-form-input>
      <b-button style="margin-top: 5px" @click="writeUserData()"
        >Guardar</b-button
      >
      <hr />
      <div style="margin-top: 20px">
        <b-form-input
          v-model="ball.code"
          placeholder="Code ball"
        ></b-form-input>
      </div>
      <hr />
      <div style="margin-top: 20px">
        <ul>
          <li v-for="(user, index) in users" :key="index">
            {{ user.name }} - {{ user.email }}
            <ul v-if="watchBall">
              Bolas:
              <li v-for="(ball, index) in balls" :key="index">
                {{ ball.code }}
                <b-button style="margin-top: 5px" @click="editBall(ball.id)"
                  >Editar</b-button
                >
              </li>
            </ul>
            <b-button style="margin-top: 5px" @click="watchBall = !watchBall"
              >Ver bolas</b-button
            >
            <b-button style="margin-top: 5px" @click="editUser(user.id)"
              >Editar</b-button
            >
            <b-button style="margin-top: 5px" @click="writeBallData(user.id)"
              >Guardar Bola</b-button
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";

export default {
  data() {
    return {
      balls: [],
      ball: {
        id: "",
        userId: "",
        code: "",
      },
      users: [],
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        ball: [""],
        role: "",
      },
      watchBall: false,
    };
  },
  created() {
    this.onUsers();
    this.onBalls();
  },
  methods: {
    // FIREBASE
    onUsers() {
      try {
        var starCountRef = db.ref("users/");
        starCountRef.on("value", (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            this.users = data;
            console.log(this.users);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    onBalls() {
      try {
        var starCountRef = db.ref("balls/");
        starCountRef.on("value", (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            this.balls = data;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    writeUserData() {
      let newUserKey = db.ref().child("users").push().key;
      this.user.id = newUserKey;
      db.ref("users/" + newUserKey).set(this.user);
      this.user = {
        id: "",
        name: "",
        email: "",
        username: "",
        password: "",
        balls: [""],
        role: "",
      };
    },
    editUser(id) {
      db.ref("users/" + id).set(this.user);
      this.user = {
        id: "",
        name: "",
        email: "",
        username: "",
        password: "",
        balls: [""],
        role: "",
      };
    },
    writeBallData(userId) {
      let newUserKey = db.ref().child("balls").push().key;
      this.ball.id = newUserKey;
      this.ball.userId = userId;
      db.ref("balls/" + newUserKey).set(this.ball);
      this.ball = {
        id: "",
        userId: "",
        code: "",
      };
      const user = this.users.filter((user) => user.id === userId);
      const balls = user.balls.push(newUserKey);
      console.log(balls);
      db.ref("users/" + userId + "/balls").set(balls);
    },
    editBall(ball) {
      db.ref("balls/" + id).set(ball);
      this.ball = {
        id: "",
        userId: "",
        code: "",
      };
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
