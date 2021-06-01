export default function buildText(list,myUser) {
    const userList = []
    let filteredList = []
    let text = "";
    if (list && list.length !== 0){
        list.forEach((u)=> {
            if(u.userId === myUser.user.id){
                userList.push('You')
            }else{
                userList.push(u['user.username']||u.username)
            }
        })
        filteredList = userList.filter((u)=> u !== 'You');
    }
    if (userList.length === 0){
        text = 'Do you like this post?' 
    } else if (userList.length === 1 && !userList.includes('You')){
        text = `${filteredList[0]}`
    } else if (userList.length === 2 && !userList.includes('You')){
        text = `${filteredList[0]} and ${filteredList[1]}`
    } else if (userList.length > 2 && !userList.includes('You')){
        text = `${filteredList[0]}, ${filteredList[1]} and other ${userList.length-2} people`
    } else if (userList.length === 1 && userList.includes('You')){
        text = `You`
    } else if (userList.length === 2 && userList.includes('You')){
        text = `You and ${filteredList[0]}`
    } else if (userList.length > 2 && userList.includes('You')){
        text = `You, ${filteredList[0]} and other ${userList.length-2} people`
    }
    return(text);
}