import { useAuth0 } from '@auth0/auth0-react'
import { IoIosHeartEmpty } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneUser } from '../../../api'
import { UPDATE } from '../../../redux/features/user_data/userSlice'
import { DivOptionsIcon } from '../../style/generalStyle'

const BtnAddToFavTracks = ({ trackId }) => {
    const dispatch = useDispatch()

    const { getAccessTokenSilently } = useAuth0()
    const token = getAccessTokenSilently()
    
    const userFavTracks = useSelector((state) => state.userData.user.favTracks)
    const userId = useSelector((state) => state.userData.user._id)
    const userFavPlaylists = useSelector((state) => state.userData.user.favPlaylists)

    const fetchAddTrackToFav = async () => {
        try {
            console.log("userFavTracks", userFavTracks)
            
            const isAlreadyInPlaylist = userFavTracks.find(track => track._id === trackId)

            if (isAlreadyInPlaylist) {
                console.log(`Track ${trackId} is already in fav tracks`)
                return
            }

            const formData = new FormData()
            formData.append("favTracks", trackId)
            userFavTracks.map(track => (
                formData.append("favTracks", track._id)
            ))

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`, {
                method: 'PATCH',
                body: formData,
                headers: { Authorization: `Bearer ${token}` },
            })
            return await res.json()

        } catch (error) {
            console.log(error.message)
            console.warn(`An error occurred when updating fav tracks`);
        }
    }

    const addTrackToFav = async () => {
        await fetchAddTrackToFav()
        const updatedUser = await fetchOneUser(userId, token)
        dispatch(UPDATE(updatedUser))
    }

    return (
        <DivOptionsIcon onClick={() => addTrackToFav()}><IoIosHeartEmpty size={20} /></DivOptionsIcon>
    )
}

export default BtnAddToFavTracks