import { useState } from "react";
import { QuadratoHeader, SGFooter } from "@sensorario/sg-components";
import "./App.css";
import { getUsername, login, logout } from "./auth";
import { BooksAdmin } from "./BooksAdmin";

function App() {
    const [username, setUsername] = useState(() => getUsername());

    return (
        <div className="app-container">
            <QuadratoHeader
                title="Eddiethor"
                username={username}
                onLogin={login}
                onLogout={logout}
                onUserAuthenticated={(
                    isLoggedIn: boolean,
                    name: string | null
                ) => setUsername(isLoggedIn ? name : null)}
            />
            <BooksAdmin />
            <SGFooter />
        </div>
    );
}

export default App;
