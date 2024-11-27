import { createRouter, createWebHistory } from 'vue-router';
import DisplayTable from './DisplayTable.vue' 
import AddBook from './AddBook.vue'; 
import EditBook from './EditBook.vue';

const routes = [
    { path: '/', name: 'DisplayTable', component: DisplayTable }, 
    { path: '/add', name: 'AddBook', component: AddBook }, 
    { path: '/edit/:id', name: 'EditBook', component: EditBook },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;