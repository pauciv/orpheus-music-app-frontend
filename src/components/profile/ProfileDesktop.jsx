import { useState } from 'react';
import { IoIosMore, IoMdCreate, IoMdReturnLeft } from 'react-icons/io';
import { useSelector } from 'react-redux';
import FooterInfo from '../general_components/FooterInfo';
import { DivImgCircleL, Footer, ImgCircleS, ImgCircleXL } from '../style/generalStyle';
import { DivSliders } from '../style/homeStyle';
import { DivProfile, DivProfileActionsStyle, DivProfileBanner, DivProfileUserInfoContainer, DivUserGeneralData, DivUsernameWorks, DropdownContainer, DropdownHeader, H1Username, H2UserWorks, ListItem, PProfileUserInfo, SectionEditUser, SectionProfileMain, SpanProfileUserNumbers } from '../style/profileStyle';
import AddWork from './profile_main/add_work/AddWork';
import CreatePlaylist from './CreatePlaylist';
import DisconnectIcon from './DisconnectIcon';
import ProfileSlider from './profile_main/ProfileSlider';
import UpdateProfile from './UpdateProfile';


const ProfileDesktop = () => {
    const user = useSelector(state => state.userData.user);
    const [editView, setEditView] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const toggling = () => setEditIsOpen(!editIsOpen);
    

    const dataKey = [
        {id: 1, name:"Fav. playlists", type: "playlist", data: user.favPlaylists}, 
        {id: 2, name:"Fav. albums", type: "albums", data: user.favAlbums}, 
        {id: 3, name:"Fav. tracks", type: "tracks", data: user.favTracks}, 
        {id: 4, name:"Followers", type: "users", data: user.followers}, 
        {id: 5, name:"Following", type: "users", data: user.following}
    ]
    
    
    return (
        <DivProfile>
            <DivProfileBanner>
                <DropdownContainer>
                    <DropdownHeader onClick={toggling}><IoIosMore /></DropdownHeader>
                    {editIsOpen && (
                        <ul>
                            <ListItem >
                                {!editView
                                    ?
                                    <span onClick={() => setEditView(prev => prev = true)}>Edit <IoMdCreate /> </span>
                                    :
                                    <span onClick={() => setEditView(prev => prev = false)}>Return <IoMdReturnLeft /></span>
                                }
                            </ListItem >
                            <DisconnectIcon />
                        </ul>
                    )}
                </DropdownContainer>

                <DivImgCircleL>
                    <ImgCircleXL src={user.img.url} alt={user.username}/>
                </DivImgCircleL>

                <DivUserGeneralData>
                    <DivUsernameWorks>
                        <H1Username>{user.username}</H1Username>
                        <H2UserWorks>23 works</H2UserWorks>
                    </DivUsernameWorks>
                    <DivProfileUserInfoContainer>
                        <PProfileUserInfo>
                            <SpanProfileUserNumbers>{user.favPlaylists.length}</SpanProfileUserNumbers>
                            Playlists
                        </PProfileUserInfo>
                        <PProfileUserInfo>
                            <SpanProfileUserNumbers>{user.followers.length}</SpanProfileUserNumbers>
                            Followers
                        </PProfileUserInfo>
                        <PProfileUserInfo>
                            <SpanProfileUserNumbers>{user.following.length}</SpanProfileUserNumbers>
                            Following
                        </PProfileUserInfo>
                    </DivProfileUserInfoContainer>
                </DivUserGeneralData>

            </DivProfileBanner>

            {!editView
                ?
                


                <SectionProfileMain>
                    <DivProfileActionsStyle>
                        <AddWork />
                        <CreatePlaylist />
                    </DivProfileActionsStyle>

                    

                    <DivSliders>
                        {dataKey.map(key => {
                            if (key.data.length > 0){
                                return <ProfileSlider key={key.id} dataKey={key} />
                            }
                        })}
                    </DivSliders>

                </SectionProfileMain>
                :
                <SectionEditUser>
                    <UpdateProfile />

                </SectionEditUser>
            }
            <Footer><FooterInfo /></Footer>
        </DivProfile>
    )
}

export default ProfileDesktop