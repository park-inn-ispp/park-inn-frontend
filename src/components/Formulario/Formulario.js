import { useForm } from 'react-hook-form'
import GeneralButton from '../GeneralButton/GeneraButton';
import { Container, Wrapper, StyledForm, InputForm, Etiqueta, CheckBox, ErrorMessage } from './Formulario.components'

export default function Formulario ({ template, onSubmit, watchFields, validate }){

    let { register, handleSubmit, errors, watch, setError, clearErrors } = useForm();
    let { title, fields } = template;
    let watchValues = watch(watchFields);
    validate(watchValues, {errors, setError, clearErrors});

    const renderFields = (fields) => {
        return fields.map(field => {
            let {title, type, name, placeholder, validationProps} = field;
            switch(type){  
                case 'checkbox':
                    return (
                        <div key={name}>
                            <CheckBox type={type} name={name} id={name} ref={register(validationProps)}/>
                            <Etiqueta htmlFor={name}>He leído y acepto las <a href='/'>condiciones de uso</a> y servicio</Etiqueta><br/>
                            {errors[name] && <ErrorMessage>{errors[name]['message']}</ErrorMessage>}
                        </div>
                    )
                case 'tel':
                    return (
                        <div key={name}>
                            <Etiqueta htmlFor={name}>{title}</Etiqueta><br/>
                            <InputForm pattern="[0-9]{9}" type={type} name={name} id={name} placeholder={placeholder} ref={register(validationProps)}/><br/>
                            {errors[name] && <ErrorMessage>{errors[name]['message']}</ErrorMessage>}
                    </div>
                    )
                    case 'password':
                        return (
                            <div key={name}>
                                <Etiqueta htmlFor={name}>{title}</Etiqueta><br/>
                                <InputForm pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" title='La contraseña debe contener 8 caracteres incluyendo una mayúscula y un número' type={type} name={name} id={name} placeholder={placeholder} ref={register(validationProps)}/><br/>
                                {errors[name] && <ErrorMessage>{errors[name]['message']}</ErrorMessage>}
                        </div>
                        )
                default:
                    return(
                    <div key={name}>
                        <Etiqueta htmlFor={name}>{title}</Etiqueta><br/>
                        <InputForm type={type} name={name} id={name} placeholder={placeholder} ref={register(validationProps)}/><br/>
                        {errors[name] && <ErrorMessage>{errors[name]['message']}</ErrorMessage>}
                    </div>
                    )
            }
        });
    }

    return (
        <Container>
            <Wrapper>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <h2>{title}</h2>
                {renderFields(fields)}
                <br/>
                <GeneralButton type='submit' content="Confirmar"></GeneralButton>
                </StyledForm>
            </Wrapper>
        </Container>
    );

}