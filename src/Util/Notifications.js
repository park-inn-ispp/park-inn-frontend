import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component'

function displaySucessNotification(title,message){
    Store.addNotification({
        title: title,
        message: message,
        type: "success",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
}
export default displaySucessNotification