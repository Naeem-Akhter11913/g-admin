import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
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
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { registerUser } from '../../../store/action/authAction'
import { clearMessages } from '../../../store/reducers/authSlice'

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successMessage, errorMessage, loading } = useSelector(state => state.user)
  const [userFormData, setUserFormData] = useState({ name: null, familyName: null, email: null, password: "Abcd@1234", repeat_password: "Abcd@1234" });

  const handleChange = e => {
    const { name, value } = e.target;
    setUserFormData(pre => ({ ...pre, [name]: value }))
  }


  const handleRegister = e => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!userFormData.name && !userFormData.name?.length > 1) {
      return toast.error('Please enter first Name', { position: 'top-right' })
    }
    if (!userFormData.familyName) {
      return toast.error('Please enter last Name', { position: 'top-right' })
    }
    // console.log(!userFormData.email , !userFormData.email?.includes("@"))
    if (!userFormData.email || !userFormData.email.includes("@")) {
      return toast.error(
        !userFormData.email ? "Please enter email address" : "Please enter a valid email",
        { position: "top-right" }
      );
    }

    if (!userFormData.password && !passwordRegex.test(userFormData.password)) {
      toast.error('Please enter password', {
        position: 'top-right',
      });
      return;
    }
    if (!userFormData.repeat_password && !passwordRegex.test(userFormData.repeat_password)) {
      toast.error('Please repeat password', {
        position: 'top-right',
      });
      return;
    }
    if (userFormData.repeat_password !== userFormData.password) {
      toast.error('Password miss match', {
        position: 'top-right',
      });
      return;
    }
    const { repeat_password, ...rest } = userFormData;
    dispatch(registerUser(rest));
  }


  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { position: 'top-right' });
      navigate('/login');
      setUserFormData(pre => ({ ...pre, name: null, familyName: null, email: null, password: null, repeat_password: null }));
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Register</h1>
                  {/* <p className="text-body-secondary">Create your account</p> */}
                  <p className="text-body-secondary" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput value={userFormData.name || ''} onChange={handleChange} name='name' placeholder="First name" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput value={userFormData.familyName || ''} onChange={handleChange} name='familyName' placeholder="Last name" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput value={userFormData.email || ''} name='email' onChange={handleChange} placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name='password'
                      value={userFormData.password || ''}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name='repeat_password'
                      value={userFormData.repeat_password}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <p>Already have account ? <Link to="/login">Click here..</Link></p>
                  <div className="d-grid">
                    <CButton disabled={loading} type='submit' color="success">Create Account</CButton>
                    {/* <CButton type='submit' color="success">Create Account</CButton> */}
                  </div>
                </CForm>
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
