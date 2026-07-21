import { useState } from "react";
import { QuadratoHeader } from "@sensorario/sg-components";
import { getUsername, login, logout } from "./auth";

function App() {
    const [username, setUsername] = useState(() => getUsername());

    return (
        <>
            <QuadratoHeader
                title="Eddiethor"
                username={username}
                onLogin={login}
                onLogout={logout}
                onUserAuthenticated={(isLoggedIn: boolean, name: string | null) =>
                    setUsername(isLoggedIn ? name : null)
                }
            />
            <h1>EDDIETHOR</h1>
        </>
    );
}

export default App;
