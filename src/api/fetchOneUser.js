
const fetchOneUser = async(userID, token) => {
    console.log(import.meta.env.VITE_API_URL)
    try{
        const res = await fetch (`${import.meta.env.VITE_API_URL}/api/v1/users/${userID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.json();

    } catch(e) {
        console.log("Fail fetching user")
    }
}
export default fetchOneUser