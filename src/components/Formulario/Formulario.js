import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import GeneralButton from "../GeneralButton/GeneraButton";
import { Wrapper, StyledForm, InputForm, Etiqueta, CheckBox, ErrorMessage, Div} from "./Formulario.components";

export default function Formulario ({ template, onSubmit, watchFields, validate }){

    //Hook de react para el uso de formluarios con una función handleSubmit
    let { register, handleSubmit, errors, watch, setError, clearErrors } = useForm();
    let { title, fields } = template;
    let watchValues = watch(watchFields);
    validate(watchValues, {errors, setError, clearErrors});

    const renderFields = (fields) => {
        return fields.map(field => {
            let {title, type, name, placeholder, validationProps} = field;
            switch(type){  
                case "text":
                    return(
                        <Div key={name}>
                            <Etiqueta htmlFor={name}>{title}</Etiqueta>
                            <InputForm pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,50}" title="Rellena este campo solo con letras de una longitud de 2 a 50 caracteres" type={type} name={name} id={name} placeholder={placeholder} ref={register(validationProps)}/>
                            {errors[name] && <ErrorMessage>{errors[name]["message"]}</ErrorMessage>}
                        </Div>
                    )
                case "checkbox":
                    return (
                        <Div key={name}>
                            <CheckBox type={type} name={name} id={name} ref={register(validationProps)}/>
                            <Etiqueta htmlFor={name}>He leído y acepto las <Link to="/Terminos-y-condiciones">condiciones de uso</Link> y servicio</Etiqueta>
                            {errors[name] && <ErrorMessage>{errors[name]["message"]}</ErrorMessage>}
                        </Div>
                    )
                case "tel":
                    return (
                        <Div key={name}>
                            <Etiqueta htmlFor={name}>{title}</Etiqueta>
                            <InputForm pattern="(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}" title="El teléfono debe empezar por 6 o 7 y tener 9 dígitos" type={type} name={name} id={name} placeholder={placeholder} ref={register(validationProps)}/>
                            {errors[name] && <ErrorMessage>{errors[name]["message"]}</ErrorMessage>}
                        </Div>
                    )
                    case "password":
                        return (
                            <Div key={name}>
                                <Etiqueta htmlFor={name}>{title}</Etiqueta>
                                <InputForm pattern = "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" title='La contraseña debe contener 8 caracteres incluyendo una mayúscula y un número' type={type} name={name} id={name} placeholder={placeholder} ref={register(validationProps)}/>
                                {errors[name] && <ErrorMessage>{errors[name]["message"]}</ErrorMessage>}
                            </Div>
                        )
                default:
                    return(
                        <Div key={name}>
                            <Etiqueta htmlFor={name}>{title}</Etiqueta>
                            <InputForm type={type} name={name} id={name} placeholder={placeholder} ref={register(validationProps)}/>
                            {errors[name] && <ErrorMessage>{errors[name]["message"]}</ErrorMessage>}
                        </Div>
                    )
            }
        });
    }

    return (
        <Wrapper>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <h2>{title}</h2>
            {renderFields(fields)}<br/>
            <GeneralButton type="submit" content="Confirmar"></GeneralButton>
            </StyledForm>
        </Wrapper>
    );
}