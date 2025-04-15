import React, { useEffect, useRef, useState } from 'react'
import {
    CCol,
    CButton,
    CForm,
    CFormInput,
    CCard,
    CCardHeader,
    CSpinner
} from '@coreui/react'
import ImageShow from '../../components/ImageShow'
import { useDispatch, useSelector } from 'react-redux';
import { addSlider } from '../../store/action/admin.slider.action';
import { toast } from 'react-toastify';
import { sliderClearState } from '../../store/reducers/admin.slider.slice';

const SliderContent = () => {
    const { accessToken, errorMessage, successMessage, loading } = useSelector(state => state.user);
    const { slider, sliderPostLoading, sliderGetLoading, sliderUpdateLoading, sliderDeleteLoading, sliderErrorMSG, sliderSuccessMSG } = useSelector(state => state.sliders);

    const [validated, setValidated] = useState(false);
    const [sliderFormData, setSliderFormData] = useState({
        sliderHeading: '',
        sliderTitle: '',
        sliderImage: null,
    });
    const dispatch = useDispatch();

    const removeImageInputPrefilled = useRef();

    const removeImageFieldState = () => {
        if (removeImageInputPrefilled.current) {
            removeImageInputPrefilled.current.value = '';
        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files)
            setSliderFormData(pre => ({ ...pre, [name]: files[0] }));
        else
            setSliderFormData(pre => ({ ...pre, [name]: value }));

    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault()
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            setValidated(true)
        }

        const formData = new FormData();
        formData.append('sliderHeading', sliderFormData['sliderHeading']);
        formData.append('sliderTitle', sliderFormData['sliderTitle']);
        formData.append('sliderImage', sliderFormData['sliderImage']);

        dispatch(addSlider({ accessToken, formData }));
    }

    useEffect(() => {
        if (sliderErrorMSG) {
            toast.error(sliderErrorMSG, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (sliderSuccessMSG) {
            toast.success(sliderSuccessMSG, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        dispatch(sliderClearState())
    }, [dispatch, sliderErrorMSG, sliderSuccessMSG]);

    return (
        <CCard className="p-3">
            <CCardHeader className='d-flex justify-content-between mb-3'>
                <h4 style={{ textWrap: 'nowrap' }}>Add slider content</h4>
            </CCardHeader>

            <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <CCol md={12}>
                    <CFormInput
                        type="text"
                        feedbackValid="Looks good!"
                        id="validationCustom01"
                        label="Slider Heading "
                        required
                        name='sliderHeading'
                        placeholder="separated by comma ',' at least one comma separator"
                        value={sliderFormData.sliderHeading}
                        onChange={handleChange}
                    />
                </CCol>
                <CCol md={12}>
                    <CFormInput
                        type="text"
                        feedbackValid="Looks good!"
                        id="validationCustom02"
                        label="Slider title"
                        required
                        name='sliderTitle'
                        placeholder='Slider title'
                        value={sliderFormData.sliderTitle}
                        onChange={handleChange}
                    />
                </CCol>

                <CCol md={12}>
                    <CFormInput
                        type="file"
                        aria-describedby="validationCustom03Feedback"
                        feedbackInvalid="Insert your slider image."
                        id="validationCustom03"
                        label="Slider image"
                        required
                        accept='image/*'
                        name='sliderImage'
                        ref={removeImageInputPrefilled}
                        onChange={handleChange}
                    />
                    <ImageShow images={sliderFormData.sliderImage} name={'sliderImage'} setProduct={setSliderFormData} removeImageFieldState={removeImageFieldState} />
                </CCol>

                <CCol xs={12}>
                    <CButton color="primary" type="submit" disabled={sliderPostLoading || sliderUpdateLoading}>
                        {(sliderPostLoading || sliderUpdateLoading) && <CSpinner size='sm' />} Submit form
                    </CButton>
                </CCol>
            </CForm>

        </CCard>
    )
}

export default SliderContent