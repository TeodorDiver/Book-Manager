<template>
    <div id="edit-book">
      <h2>Редактирование книги</h2>
      <form @submit.prevent="updateBook">
        <div>
          <label for="title">Название:</label>
          <input type="text" v-model="book.title" required />
        </div>
        <div>
          <label for="author">Автор:</label>
          <input type="text" v-model="book.author" required />
        </div>
        <div>
          <label for="desc">Описание:</label>
          <textarea v-model="book.desc" required></textarea>
        </div>
        <button type="submit">Обновить</button>
      </form>
      <div v-if="isError">{{ errorText }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditBook',
    data() {
      return {
        book: {
          title: '',
          author: '',
          desc: '',
        },
        isError: false,
        errorText: ''
      };
    },
    methods: {
      getBook() {
        const id = this.$route.params.id; 
        this.$http.get(`/books/${id}`)
          .then(response => {
            this.book = response.data; 
          })
          .catch(error => {
            this.isError = true;
            this.errorText = error.response ? error.response.data : 'An unexpected error occurred';
          });
      },
      updateBook() {
        const id = this.$route.params.id; 
        this.$http.put(`/books/${id}`, this.book)
          .then(() => {
            this.$router.push('/'); 
          })
          .catch(error => {
            this.isError = true;
            this.errorText = error.response ? error.response.data : 'An unexpected error occurred';
          });
      }
    },
    created() {
      this.getBook(); 
    }
  };
  </script>
  
  <style scoped>
  #edit-book {
    max-width: 500px;
  }
  form div {
    margin-bottom: 10px;
  }
  </style>