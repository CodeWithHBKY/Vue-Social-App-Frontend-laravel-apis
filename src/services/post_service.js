import { http, httpFile } from './http_service';

export function getPosts(){
    return http().get('user/posts-public')
}

export function likeUnlikePost(id){
    return http().get(`user/like/${id}`)
}

export function postComment(data){
    return http().post(`user/comments`, data)
}

export function createPost(data){
    return httpFile().post(`user/posts`, data)
}
