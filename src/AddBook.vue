<template>
    <div id="add-book">
      <h2>Добавить новую книгу</h2>
      <form @submit.prevent="addBook">
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
        <button type="submit">Сохранить</button>
      </form>
      <div v-if="isError">{{ errorText }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddBook',
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
      addBook() {
        this.$http.post('/books', this.book)
          .then(response => {
            console.log('Book added:', response.data);
            this.$router.push('/'); 
          })
          .catch(error => {
            this.isError = true;
            this.errorText = error.response ? error.response.data : 'An error occurred';
            setTimeout(() => {
              this.isError = false;
              this.errorText = '';
            }, 4000);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  #add-book {
    max-width: 500px;
  }
  form div {
    margin-bottom: 10px;
  }
  </style>