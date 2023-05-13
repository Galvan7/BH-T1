import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import './AddAmigo.css'

function AddAmigo({addchattoggler,addchattoggle}) {

    const [amigousername, setAmigoUsername] = useState()
    const [userExists, setUserExists] = useState(true);
    const { user } = useContext(AuthContext)

    const API_URL = "https://buzzhive.onrender.com/"

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`${API_URL}api/users/?username=${amigousername}`)
            if (!response.data) {
                setUserExists(false);
                return;
            }
            setAmigoUsername("")
            const data = {
                senderId: user._id,
                receiverId: response.data._id
            }
            await axios.post(API_URL+'api/chatrooms', data)
        }
        catch (err) {
        }
        window.location.reload();
    }

    return (
        <div className='add-amigo-background'>
            <div className={addchattoggle?"add-amigo-open":"add-amigo-close"}>
                <div className="close-div" ><span onClick={addchattoggler}><p className="close-symbol">x</p></span></div>
                <form>
                    <img className='add-amigo-img' src='assets/add-group.png' alt=''></img>
                    <input type="text" placeholder="Username to add to Hive" value={amigousername} onChange={(e) => { setAmigoUsername(e.target.value) }} required />
                    <button onClick={handleSubmit}>ADD CHAT</button>
                    {!userExists && <p>User does not exist.</p>}
                </form>
            </div>
        </div>
    )
}

export default AddAmigo;
