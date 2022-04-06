import './Input.css'

export default function Input() {
    return (
        <div className='input'>
            <div className='label'>{this.props.label}</div>
            <input type={this.props.type} placeholder={this.props.placeholder}></input>
        </div>  
    ); 
}


