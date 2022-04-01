import '../App.css';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Logout(){
    cookies.remove("AuthToken"); // determine if authorized, from context or however you're doing it
    cookies.remove("user_mail");
    cookies.remove("UserData");
    cookies.remove("user_autorities");
    localStorage["AuthToken"] = undefined;
    window.location.href = "./login";
}
