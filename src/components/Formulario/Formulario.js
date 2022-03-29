import { useForm } from 'react-hook-form'
import { Container, Wrapper, StyledForm, InputForm, Etiqueta, CheckBox, ErrorMessage } from './Formulario.components'

export default function Formulario ({ template, onSubmit }){

    let { register, handleSubmit, errors } = useForm();
    let { title, fields } = template

    const renderFields = (fields) => {
        return fields.map(field => {
            let {title, type, name, placeholder, validationProps} = field;
            return (
                type !== "checkbox" ?
                <div key={name}>
                    <Etiqueta htmlFor={name}>{title}</Etiqueta><br/>
                    <InputForm type={type} name={name} id={name} placeholder={placeholder} ref={register(validationProps)}/><br/>
                    {errors[name] && <ErrorMessage>{errors[name]['message']}</ErrorMessage>}
                </div>
                :
                <div key={name}>
                    <CheckBox type={type} name={name} id={name} ref={register(validationProps)}/>
                    <Etiqueta htmlFor={name}>He leído y acepto las <a href='/'>condiciones de uso</a> y servicio</Etiqueta><br/>
                    {errors[name] && <ErrorMessage>{errors[name]['message']}</ErrorMessage>}
                </div>
            )
        })
    }

    return (
        <Container>
            <Wrapper>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <h2>{title}</h2>
                {renderFields(fields)}
                <br/>
                <button type='submit'>Submit</button>
                </StyledForm>
            </Wrapper>
        </Container>
    );
}