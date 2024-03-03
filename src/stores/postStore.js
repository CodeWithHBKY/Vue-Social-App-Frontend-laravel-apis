import { defineStore } from "pinia";

export const usePostStore = defineStore('postStore', {
    state: () => {
        return {
            posts: []
        }
    },
    actions: {
        async getPosts() {
            if (this.posts.length > 0) return;
            const { getPosts }  = await import('@/services/post_service');
            try {
                const response = await getPosts();
                this.posts = response.data.data;
            } catch (error) {
                throw error;
            }
        },
        async likeUnlikePost(id) {
            const { likeUnlikePost }  = await import('@/services/post_service');
            try {
                const response = await likeUnlikePost(id);
                if (response.status == 201) {
                    const index = this.posts.findIndex(p => p.id === id);
                    this.posts[index].likes.push(response.data)
                    this.posts[index].likes_count += 1;
                }else if(response.status == 200){
                    const index = this.posts.findIndex(p => p.id === id);
                    this.posts[index].likes = this.posts[index].likes.filter(l => l.id !== response.data.likeId)
                    this.posts[index].likes_count -= 1;
                }
                
            } catch (error) {
                throw error;
            }
        },
    }
});