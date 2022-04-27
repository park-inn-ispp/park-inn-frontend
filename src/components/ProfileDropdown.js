import { useState, useRef, useEffect } from "react";
import { IconContext } from "react-icons";
import { ProfileIcon } from "./Navbar.elements";
import {FaUserCircle} from "react-icons/fa"
import { Link } from "react-router-dom";
import './ProfileDropdown.css'

import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default function DropdownMenu({onClickShowMobile}) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);
    const onClickGlobal = () => {
      setIsActive(!isActive);
    }

    useEffect(() => {
        const pageClickEvent = (e) => {
            // If the active element exists and is clicked outside of
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        };
        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }
        return () => {
            window.removeEventListener('click', pageClickEvent);
        }
    }, [isActive]);

    try{
      const user_data = cookies.get('UserData')

      var is_authorized =false
      for(let i=0;i<user_data.roles.length;i++){

          if(user_data.roles[i].name=='ROLE_ADMIN'){
              is_authorized =true
              break
          }
      }

      if (is_authorized){
          return (
            <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
              <IconContext.Provider value = {{style: {fontSize: "2.7em",verticalAlign:"center", padding:"0px"}}}>
                <ProfileIcon>
                  <FaUserCircle/>
                </ProfileIcon>
              </IconContext.Provider>
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
              <ul>
                <li><Link to="/dashboard-reservas" onClick={{onClickGlobal}}>Reservas</Link></li>
                <li><Link to="/dashboard-plazas" onClick={{onClickGlobal}}>Plazas</Link></li>
                <li><Link to="/dashboard-incidencias" onClick={{onClickGlobal}}>Incidencias</Link></li>
                <li><Link to="/dashboard-usuarios" onClick={{onClickGlobal}}>Usuarios</Link></li>
                <li><Link to={cookies.get("AuthToken")===undefined ? '' : `/clients/view/${cookies.get("UserData").id}`} 
                        onClick={{onClickGlobal}}>Perfil</Link></li>
                <li><Link to="/logout" onClick={{onClickGlobal}}>Cerrar Sesión</Link></li>
                
              </ul>
            </nav>
          </div>

              
            );
      }else{
          return (
            <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
              <IconContext.Provider value = {{style: {fontSize: "2.7em",verticalAlign:"center", padding:"0px"}}}>
                <ProfileIcon>
                  <FaUserCircle/>
                </ProfileIcon>
              </IconContext.Provider>
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
              <ul>
                <li><Link to={cookies.get("AuthToken")===undefined ? '' : `/clients/view/${cookies.get("UserData").id}`} onClick={{onClickGlobal}}>Perfil</Link></li>
                <li><Link to="/logout"  onClick={{onClickGlobal}}>Cerrar Sesión</Link></li>
              </ul>
            </nav>
          </div>
          );
      }
    }catch{
      return (
        <></>
        );
    }
}