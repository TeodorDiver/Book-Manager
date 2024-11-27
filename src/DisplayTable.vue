<template>
  <div id="display-table">
    <h2>Книги:</h2>
    <button @click="$router.push('/add')">Новая книга</button>
    <div v-if='isError'>{{ errorText }}</div>
    <table v-if="books.length">
      <thead>
        <tr>
          <th>id</th>
          <th>Нзвание</th>
          <th>Автор</th>
          <th>Описание</th>
          <th>Правка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in books" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.desc }}</td>
          <td>
            <button @click="editBook(item.id)">Редакт...</button>
            <button @click="deleteBook(item.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>в настоящее время нет книг для просмотра</p>
  </div>
</template>

<script>
export default {
  name: 'DisplayTable',
  data() {
    return {
      url: "/books", // Измените на относительный путь
      books: [],
      isError: false,
      errorText: ""
    };
  },
  methods: {
    getBooks() {
      this.$http.get(this.url)
        .then(response => {
          this.books = response.data;
        })
        .catch(err => {
          // Проверяем наличие объекта ошибки и его статус
          this.isError = true;
          this.errorText = err && err.response ? `Error ${err.response.status}: ${err.response.statusText}` : 'An unexpected error occurred';

          setTimeout(() => {
            this.isError = false;
            this.errorText = "";
          }, 4000);
        });
    },

    deleteBook(id) {
      let pass = prompt('Введите пароль');
      if (pass == '1234') {
        this.$http.delete(this.url + "/" + id)
          .then(() => this.getBooks()) // Обновление списка книг после удаления книги
          .catch(err => {
            // Проверяем наличие объекта ошибки и его статус
            this.isError = true;
            this.errorText = err && err.response ? `Error ${err.response.status}: ${err.response.statusText}` : 'An unexpected error occurred';

            setTimeout(() => { this.isError = false; this.errorText = ""; }, 4000);
          });
      } else {
        alert('Пароли не совпадают');
      }
    },

    editBook(id) { this.$router.push("/edit/" + id); }
  },

  created() { this.getBooks(); }
};

</script>

<style scoped>
#display-table {
  max-width: 800px;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

button {
  margin-right: 5px;
}
</style>
