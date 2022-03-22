import { Info, Principal } from "./Footer.elements";
import {FaPhoneSquareAlt, FaCopyright} from 'react-icons/fa'
import {HiLibrary} from 'react-icons/hi'

export default function Footer(){
    return (
        <Principal>
            <Info>
                <FaPhoneSquareAlt/>
                Contacto
            </Info>
            <Info>
                <HiLibrary/>
                Términos legales
            </Info>
            <Info>
                <FaCopyright/>
                Copyright
            </Info>
        </Principal>
    )
}