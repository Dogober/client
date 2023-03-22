import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [],
        currentPost: {},
        error: '',
        loading: false,
        selectedSort: '',
        socket: null,
        searchQuerry: '',
        sortOptions: [
            { value: 'title', name: 'By title' },
            { value: 'body', name: 'By discription' }
        ],
        page: 1,
        pageLimit: 1,
        totalPages: 1
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]
                ?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state) {
            return state.sortedPosts.filter(post => post.title
            .toLowerCase()
            .includes(state.searchQuerry.toLowerCase()))
        },
        getCurrentPost: (state) => async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`)
                state.currentPost = {...response.data}
            } catch (error) {
                console.log(error)
            }
        }
    },
    actions: {
        async addPost(newPost) {
            console.log(newPost)
            const { data } = await axios.post("http://localhost:5000/api/posts", newPost)
            this.socket.send(JSON.stringify({...data, method: 'addPost'}))
        },
        async deletePost(post) {
            const { data } = await axios.delete(`http://localhost:5000/api/posts/${post._id}`)
            this.socket.send(JSON.stringify({ id: data._id, method: 'deletePost' }))
        },
        async fetchPosts() {
            try {
                this.loading = true
                const response = await axios.get("http://localhost:5000/api/posts")
                this.posts = response.data
            } catch (error) {
                this.error = error.code
            } finally {
                this.loading = false
            }
        },
        setSocket(socket){
            if (!this.socket) {
                this.socket = socket
            }
            this.socket.onopen = () => {
                this.socket.send(JSON.stringify({
                    text: 'User is connected',
                    method: 'connection'
                }))
            }
            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                switch (data.method) {
                    case 'connection':
                        console.log(data.text)
                        break;
                    case 'addPost':
                        this.posts.push({...data})
                        break;
                    case 'deletePost':
                        this.posts = this.posts.filter(el => el._id !== data.id)
                }
            }
        }
    }
})