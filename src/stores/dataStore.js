import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore("data", {
  state: () => ({
    movies: [], // Список фильмов
    create_movie: [],
    movies_total: null, // Общее количество фильмов
    cities: [],
    cities_total: null,
    theaters: [],
    theaters_total: null,
    sessions: [],
    sessions_total: null,
    errorMessage: "", // Сообщение об ошибке
    errorCode: '',
  }),
  actions: {
    // Получение списка фильмов с постраничной загрузкой movies
    async get_movies(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/movies', {
          params: {
            page,
            perpage: perpage
          },
        });
        this.movies = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response);
        } else if (error.request) {
          this.errorMessage = "Нет ответа от сервера.";
          console.log(error.request);
        } else {
          this.errorMessage = "Ошибка: " + error.message;
          console.log(error);
        }
      }
    },

    async get_movies_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/movies_total');
        this.movies_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response);
        } else if (error.request) {
          this.errorMessage = "Нет ответа от сервера.";
          console.log(error.request);
        } else {
          this.errorMessage = "Ошибка: " + error.message;
          console.log(error);
        }
      }
    },
    /*---------------CITIES------------------*/
    async get_cities(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/cities', {
          params: {
            page,
            perpage: perpage
          },
        });
        this.cities = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response);
        } else if (error.request) {
          this.errorMessage = "Нет ответа от сервера.";
          console.log(error.request);
        } else {
          this.errorMessage = "Ошибка: " + error.message;
          console.log(error);
        }
      }
    },

    async get_cities_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/cities_total');
        this.cities_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response);
        } else if (error.request) {
          this.errorMessage = "Нет ответа от сервера.";
          console.log(error.request);
        } else {
          this.errorMessage = "Ошибка: " + error.message;
          console.log(error);
        }
      }
    },
    /*------------------THEATERS-------------------*/
    async get_theaters(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/theaters', {
          params: {
            page,
            perpage: perpage
          },
        });
        this.theaters = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response);
        } else if (error.request) {
          this.errorMessage = "Нет ответа от сервера.";
          console.log(error.request);
        } else {
          this.errorMessage = "Ошибка: " + error.message;
          console.log(error);
        }
      }
    },

    async get_theaters_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/theaters_total');
        this.theaters_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response);
        } else if (error.request) {
          this.errorMessage = "Нет ответа от сервера.";
          console.log(error.request);
        } else {
          this.errorMessage = "Ошибка: " + error.message;
          console.log(error);
        }
      }
    },
    /*--------------sessions---------------*/
    async get_sessions(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/sessions', {
          params: {
            page,
            perpage,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.sessions = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message || "Ошибка ответа сервера.";
          console.log(error.response);
        } else if (error.request) {
          this.errorMessage = "Нет ответа от сервера.";
          console.log(error.request);
        } else {
          this.errorMessage = "Ошибка: " + error.message;
          console.log(error);
        }
      }
    },

    async get_sessions_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/sessions_total', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.sessions_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message || "Ошибка ответа сервера.";
          console.log(error.response);
        } else if (error.request) {
          this.errorMessage = "Нет ответа от сервера.";
          console.log(error.request);
        } else {
          this.errorMessage = "Ошибка: " + error.message;
          console.log(error);
        }
      }
    },
    // Доавление фильма
    async create_movie(formData) {
      this.errorMessage = "";
      try {
        const response = await axios.post(backendUrl + '/movies', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.errorCode = response.data.code;
        this.errorMessage = response.data.message;
      } catch (error) {
        if (error.response) {
          this.errorCode = 11;
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorCode = 12;
          this.errorMessage = error.message;
          console.log(error);
        } else {
          this.errorCode = 13;
          console.log(error);
        }
      }
    },
  },
});
