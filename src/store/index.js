import { reactive } from 'vue'
export default reactive({
    flashMessage: '',
    event: null,
    organizers: null,
    currentUser: localStorage.getItem('user')
})