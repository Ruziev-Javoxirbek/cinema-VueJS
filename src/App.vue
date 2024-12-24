<template>
  <Menubar :model="items">
    <template #start>
      <span>
        <img src="@/assets/logo.svg" width="60" alt="Icon"/>
      </span>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a class="flex items-center ml-6 p-4">
        <router-link v-if="item.route" :to="item.route">
          <span :class="item.icon"/>
          <span class="ml-1">{{ item.label }}</span>
        </router-link>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-fw pi-user mr-4"/>{{ user.name }}
          <Button @click="logout" class="ml-4">Выйти</Button>
        </div>
        <div v-else>
          <form @submit.prevent="login">
            <InputText v-model="email" type="email" id="email" required placeholder="Логин"
                       class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
            <InputText v-model="password" type="password" id="password" required placeholder="Пароль"
                       class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
            <Button type="submit">Войти</Button>
            <div class="ml-2"><small v-if="authError" class="error">{{ authError }}</small></div>
          </form>
        </div>
      </div>
    </template>
  </Menubar>
  <router-view></router-view>
</template>
<script>
import { useAuthStore } from '@/stores/authStore';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
export default {
  components: { Button, Menubar, InputText },
  data() {
    return {
      date: "",
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-home',
          route: '/',
          shortcut: 'Ctrl + H',
          submenu: [],
        },
        {
          label: 'Города',
          icon: 'pi pi-fw pi-map',
          route: '/cities',
        },
        {
          label: 'Кинотеатры',
          icon: 'pi pi-fw pi-video',
          route: '/theaters',
        },
        {
          label: 'Фильмы',
          icon: 'pi pi-fw pi-video',
          route: '/movies',
        },
        {
          label: 'Сеансы',
          icon: 'pi pi-fw pi-clock',
          route: '/sessions',
        },
      ],
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

</style>
