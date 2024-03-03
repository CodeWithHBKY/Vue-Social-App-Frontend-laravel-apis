import { http } from './http_service';

export function getPosts(){
    return http().get('user/posts-public')
}

export function likeUnlikePost(id){
    return http().get(`user/like/${id}`)
}
