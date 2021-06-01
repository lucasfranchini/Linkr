import axios from "axios";

export default function toggleFollow(setFollow,follow,id,user,setLoading){
    setLoading(true);
    const headers = {headers:{Authorization: `Bearer ${user.token}`}}
    if(follow){
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/unfollow`,{},headers);
        promise.then(()=>{
            setFollow(false);
            setLoading(false);
        });
        promise.catch(()=>{
            alert("desculpe nao foi possivel realizar a operação, tente novamente");
            setLoading(false);
        });
    }
    else{
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/follow`,{},headers);
        promise.then(()=>{
            setFollow(true);
            setLoading(false);
        });
        promise.catch(()=>{
            alert("desculpe nao foi possivel realizar a operação, tente novamente");
            setLoading(false);
        });
    }
}