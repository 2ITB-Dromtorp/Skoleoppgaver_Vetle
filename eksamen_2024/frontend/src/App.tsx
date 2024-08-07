import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./assets/Layout";
import Home from "./pages/Home";
import Sports from "./pages/Sports";
import Request from "./pages/Request";
import Tournaments from "./pages/Tournaments";
import Protected from "./assets/Protected";
import Profile from "./pages/Profile";
import AnswerRequests from "./pages/AnswerRequests";
import CreateSport from "./pages/CreateSport";
import CreateTournament from "./pages/CreateTournament";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="sports" element={<Sports />} />
                    <Route path="send-request/:sport" element={<Request />} />
                    <Route path="tournaments" element={<Tournaments />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="/" element={<Protected />}>
                        <Route path="answer-requests" element={<AnswerRequests />} />
                        <Route path="create-sport" element={<CreateSport />} />
                        <Route path="create-tournament" element={<CreateTournament />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
