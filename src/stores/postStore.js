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
                await likeUnlikePost(id);
            } catch (error) {
                throw error;
            }
        },
        async postComment(data) {
            const { postComment }  = await import('@/services/post_service');
            try {
                await postComment(data);
            } catch (error) {
                throw error;
            }
        },
        async createPost(data) {
            console.log(data);
            const { createPost }  = await import('@/services/post_service');
            try {
                await createPost(data);
            } catch (error) {
                throw error;
            }
        },
        addToPostArray(data){
            this.posts.unshift(data);
        },
        addToCommentArray(data){
            if (data) {
                const index = this.posts.findIndex(p => p.id === data.post_id);
                this.posts[index].comments.push(data)
                this.posts[index].comments_count += 1;
            }
        },
        addToLikeArray(data){
            if (data.type == 'like') {
                const index = this.posts.findIndex(p => p.id === parseInt(data.like.post_id));
                this.posts[index].likes.push(data)
                this.posts[index].likes_count += 1;
            }else if(data.type == 'unlike'){
                const index = this.posts.findIndex(p => p.id === data.like.post_id);
                this.posts[index].likes = this.posts[index].likes.filter(l => l.id !== data.like_id)
                this.posts[index].likes_count -= 1;
            }
        },
    }
});