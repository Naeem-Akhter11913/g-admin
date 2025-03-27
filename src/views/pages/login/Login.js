import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useAuth } from '../../../hook/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearMessages } from '../../../store/reducers/authSlice'
import { loginUser } from '../../../store/action/authAction'

const Login = () => {
  const { accessToken , errorMessage, successMessage, loading } = useSelector(state => state.user)
  const { useIsAuthenticate, valid } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginFormData, setLoginFormData] = useState({
    email: 'dreamabroad83@gmail.com', password: 'Abcd@1234'
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginFormData(pre => ({ ...pre, [name]: value }))
  }
  const handLogin = e => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // useIsAuthenticate(" ");
    if (!loginFormData.email || !loginFormData.email.includes('@')) {
      toast.error("Enter valid email")
      return;
    }
    if (!loginFormData.password || !passwordRegex.test(loginFormData.password)) {
      toast.error("Enter valid password")
      return;
    }
    dispatch(loginUser(loginFormData));
  }

  useEffect(() => {
    if (accessToken) {
      useIsAuthenticate(accessToken);
    }
  }, [accessToken])

  useEffect(() => {
    if (valid) navigate('/dashboard')
  }, [valid]);

  useEffect(() => {
      if (successMessage) {
        toast.success(successMessage, { position: 'top-right' });
        navigate('/login');
        setLoginFormData(pre => ({ ...pre, name: null, familyName: null, email: null, password: null, repeat_password: null }));
      }
      if (errorMessage) {
        toast.error(errorMessage, { position: 'top-right' })
      }
      dispatch(clearMessages());
    }, [errorMessage, successMessage])


  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      {/* <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText> */}
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput onChange={handleChange} value={loginFormData.email} type='email' name='email' placeholder="Enter your email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        onChange={handleChange}
                        name='password'
                        value={loginFormData.password}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton disabled={loading} color="primary" type='submit' className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
