import axios from "axios";

export default function toggleFollow(setFollow,follow,id,user){
    const headers = {headers:{Authorization: `Bearer ${user.token}`}}
    if(follow){
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/unfollow`,{},headers);
        promise.then(()=>setFollow(false));
        promise.catch("desculpe nao foi possivel realizar a operação, tente novamente");
    }
    else{
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/follow`,{},headers);
        promise.then(()=>setFollow(true));
        promise.catch("desculpe nao foi possivel realizar a operação, tente novamente");
    }
}