import { useEffect, useState } from 'react';
import './styles.scss';

const Theme = () => {
    const [theme, setTheme] = useState("theme1");
    const [classButtonTheme, setClassButtonTheme] = useState("");

    const changeTheme = () => {
        if (theme === "theme1") {
            setTheme("theme2");
            setClassButtonTheme("circle-button-theme2")
        } else if (theme == "theme2") {
            setTheme("theme3");
            setClassButtonTheme("circle-button-theme3")
        } else if (theme === "theme3") {
            setTheme("theme1");
            setClassButtonTheme("");
        }
    };

    useEffect(() => {
        const body = document.body;
        body.classList.add(theme);

        return () => {
            body.classList.remove(theme);
        }
    }, [theme]);

    return (
        <div className="box-theme">
            <ol>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ol>
            <div className="slide-button" onClick={changeTheme}>
                <div className={`circle-button ${classButtonTheme}`}></div>
            </div>
        </div>
    )
}
export default Theme;
