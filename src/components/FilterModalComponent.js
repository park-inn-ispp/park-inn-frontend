import React from "react";
import { DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./FilterModalComponent.css";
 
const FilterModalComponent = React.forwardRef(
 ({ children, onSelect, onCancel }, ref) => {
   return (
    <div className="modal_wrapper" >
     <DialogOverlay
       ref={ref}
       className="modal_container"
       aria-label="modal window"
     >
       <div className="modal_header" >
         <button onClick={() => onCancel()} >x</button >
       </div >
       < div className="modal_content" >{children}</div >
       < div className="modal_actions" >
         < button onClick={() => onSelect()} >Select</button >
       </div >
     </DialogOverlay >
    </div >
   );
 });
export default FilterModalComponent;