<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>

  <div id="nav">
    <nav class="navbar navbar-expand">
      <div v-if="!currentUser" class="container unauth">
        With CMU Account: <a href="https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=7a2tEVznj823QypVnrBJHbRu7dnfdbrmTmwesF8K&redirect_uri=http:/localhost:8081/redirect&scope=cmuitaccount.basicinfo&state=xyz">
        Click here</a>
        With OAuth CMUSE Account <a href="http://localhost:8082/articles">Click here</a>
      </div>
      <div v-if="currentUser" class="container authenticated">
      Logged in as: {{currentUser}}
      <div>
    <button @click="logout" class="btn btn-primary">Logout</button>
  </div>
    </div>
    </nav>
    <router-link :to="{ name: 'EventList' }">Home</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link>
    <span v-if="isAdmin">
      |
      <router-link :to="{ name: 'AddEvent' }">New Event</router-link>
    </span>
  </div>

  <!-- new element -->
  <router-view />
</template>
<script>
import AuthService from '@/services/AuthService.js'
export default {
  inject: ['GStore'], // <----
  computed: {
    currentUser() {
      return AuthService.getUser()
    }
  },
  methods: {
    logout() {
      AuthService.logout()
      this.$router.push({
        name: 'EventList'
      })
      location.reload();
    }
  }
}
</script>

<style>
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h4 {
  font-size: 20px;
}
</style>
