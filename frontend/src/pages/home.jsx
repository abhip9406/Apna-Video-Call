import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return alert("Enter valid meeting code!");
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <>
            <div className="navBar">
                <h2>Apna Video Call</h2>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconButton onClick={() => navigate("/history")}>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="homePage">

                <div className="heroLeft">
                    <h1>Start or Join Video Meeting</h1>

                    <div className="inputBox">
                        <TextField
                            label="Meeting Code"
                            variant="outlined"
                            value={meetingCode}
                            onChange={(e) => setMeetingCode(e.target.value)}
                        />
                        <Button
                            variant='contained'
                            className="joinBtn"
                            onClick={handleJoinVideoCall}
                        >
                            Join
                        </Button>
                    </div>
                </div>

                <div className="heroRight">
                    <img src="/logo3.png" alt="Video Call" />
                </div>

            </div>
        </>
    )
}

export default withAuth(HomeComponent)
