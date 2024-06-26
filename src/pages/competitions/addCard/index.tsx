import { baseURL } from "../../../baseUtl.ts";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { RegInput } from "./regInput/index.tsx";

import './reg.css'

const initialValues = {
    name: '',
    price: '',
    description: '',
    timer: '',
    categoryName: '',
};

const categories = [
    'Программирование',
    'Дизайн',
    'Услуги',
    'Работа с текстом',
    'Маркетинг',
    'Архитектура',
    'Приложения'
];

const RegistrationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category is required"),
    // Add other validations for other fields
});

export const Reg = () => {
    const sendRequest = async () => {

        try {
            const response = await axios.post(`${baseURL}/api/add-contest`, {
                name: registrationFormik.values.name, 
                description: registrationFormik.values.description, 
                price: registrationFormik.values.price, 
                timer: registrationFormik.values.timer, 
                categoryName: registrationFormik.values.categoryName, 
                // image: formData
            });
            console.log('request', response)
    
            setTimeout(() => {
                if (response.status === 200 && !response.data.error) {
                    // Навигация пользователя после успешной авторизации
                    window.location.reload();
                } else {
                    console.log(response.status);
                }
            }, 1000);
        } catch (error: any) {
            console.log('error', error.message);
        }
    };

    const registrationFormik = useFormik({
        initialValues,
        validationSchema: RegistrationSchema,
        onSubmit: () => {
            if (() => checkValidationReady()) sendRequest();
        },
    });

    const checkValidationReady = () => {
        // Validation logic
    };

    return(
            <div className="auth_form">
                <form className="auth_form_inputs" onSubmit={registrationFormik.handleSubmit}>
                    <RegInput
                        placeholder={'Название'}
                        value={registrationFormik.values.name}
                        onChange={registrationFormik.handleChange}
                        name={'name'}
                        error={registrationFormik.errors.name}
                    />
                    <RegInput
                        placeholder={'Описание'}
                        value={registrationFormik.values.description}
                        onChange={registrationFormik.handleChange}
                        name={'description'}
                        error={registrationFormik.errors.description}
                    />
                    <RegInput
                        placeholder={'Цена'}
                        value={registrationFormik.values.price}
                        onChange={registrationFormik.handleChange}
                        name={'price'}
                        error={registrationFormik.errors.price}
                    />
                    <RegInput
                        placeholder={'Сроки (в часах)'}
                        value={registrationFormik.values.timer}
                        onChange={registrationFormik.handleChange}
                        name={'timer'}
                        error={registrationFormik.errors.timer}
                    />
                    <div className="form-group">
                        <select
                            id="categoryName"
                            name="categoryName"
                            onChange={registrationFormik.handleChange}
                            onBlur={registrationFormik.handleBlur}
                            value={registrationFormik.values.categoryName}
                            className={`form-control ${registrationFormik.touched.categoryName && registrationFormik.errors.categoryName ? 'is-invalid' : ''}`}
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        {registrationFormik.touched.categoryName && registrationFormik.errors.categoryName ? (
                            <div className="invalid-feedback">{registrationFormik.errors.categoryName}</div>
                        ) : null}
                    </div>
                    {/* <input type="file" onChange={handleFileChange} /> */}
                    {/* <button onClick={handleUpload} type="submit" className="auth_button">
                        Создать карточку
                    </button> */}
                    <button type="submit" className="auth_button">
                        Создать карточку
                    </button>
                </form>
            </div>
    )
}
