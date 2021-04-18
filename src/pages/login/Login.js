import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import {Formik} from 'formik';
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";


const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } = auth;


  const onSubmit = async (values) => { 
    dispatch(login(values.username,values.password));
    console.log('its work')
  };


  useEffect(() => {
    if (isAuthenticated) {
      history.push("/home");
    }
  }, [isAuthenticated, history]);


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                    <Formik
                      initialValues={{ username:'', password:''}}
                      validate={ values => {
                        const errors = {}
                        !values.username && (errors.username = 'Обязательное поле')
                        !values.password && (errors.password = 'Обязательное поле')
                        return errors
                      }}                      
                      onSubmit={onSubmit}
                    >
                      {({
                            values,
                            touched,
                            errors,
                            handleSubmit,
                            handleChange,
                            handleBlur
                   
                      })=>(                             
                      
                    <CForm onSubmit={handleSubmit}>
                    <h1>Войти</h1>
                    <p className="text-muted">Войти в свой аккаунт</p>
                    <CInputGroup className="mb-3 position-rel">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                      id="username"
                        type="text"
                        placeholder="аккаунт"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className={errors.username && touched.username ? 'border-error' : ''}
                      />
                
                    <div className="text-danger position-abs">{errors.username && touched.username && errors.username}</div> 
                    </CInputGroup>
                    <CInputGroup className="mb-4 position-rel">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                      id="password"
                        type="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={errors.password && touched.password ? 'border-error' : ''}
                      />
                    <div className="text-danger position-abs">{errors.password && touched.password && errors.password}</div> 

                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">
                          Войти
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Забыли пароль?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                          )}
                        
                    </Formik>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Войти</h2>
                    <p>Зайдите в свой аккаунт, чтобы внести изменения.</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
