import moment from "moment";

export function timeAgo(time){
    return moment(time).fromNow();
}