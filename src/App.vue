<template>
  <div id="app">
    <nav>
      <router-link to="/">Просмотр</router-link>
      <router-link to="/add">Добавить книгу</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 15px;
}
</style>