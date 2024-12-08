<template>
  <header>
    <nav class="navbar">
      <ul class="nav-links">
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/cities">Города</router-link></li>
        <li><router-link to="/theaters">Кинотеатры</router-link></li>
        <li><router-link to="/movies">Фильмы</router-link></li>
        <li><router-link to="/sessions">Сеансы</router-link></li>
      </ul>
      <div class="auth-section">
        <div v-if="isAuthenticated && user" class="user-info">
          Добро пожаловать, {{ user.name }}
          <button @click="logout" class="logout-button">Выход</button>
        </div>
        <div v-else class="login-form">
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Почта</label><br />
              <input v-model="email" type="email" id="email" required />
            </div>
            <div class="form-group">
              <label for="password">Пароль</label><br />
              <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit" class="submit-button">Войти</button>
            <p v-if="authError" class="error-message">{{ authError }}</p>
          </form>
        </div>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
export default {
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
    login() {
      this.authStore.login({ email: this.email, password: this.password });
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>

<style scoped>
/* Общие стили */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

/* Навигация */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #004b7a;
  color: #fff;
}

.nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0 15px;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  border-radius: 5px;
  padding: 5px 10px;
}

.nav-links a:hover {
  background-color: #f36666;
  text-decoration: underline;
}

/* Аутентификация */
.auth-section {
  display: flex;
  align-items: center;
}

.user-info {
  font-size: 18px;
  display: flex;
  align-items: center;
}

.logout-button {
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.logout-button:hover {
  background-color: #c0392b;
}

.login-form {
  text-align: right;
}

.form-group {
  margin-bottom: 15px;
}

input {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 10px 15px;
  background-color: #004b7a;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;
}

.submit-button:hover {
  background-color: #02b63e;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
