import React, { useState, useEffect, useRef } from "react";
import { CForm, CFormInput, CFormTextarea, CButton, CCard, CCardBody, CCardHeader, CFormLabel, CSpinner } from "@coreui/react";
import TyniMCE from "../../../components/TyniMCE";
import ImageShow from "../../../components/ImageShow";
import { PERSONAL_API_KEY } from "../../../config/configuration";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, getSignleBlog } from "../../../store/action/service.blog.action";
import { toast } from "react-toastify";
import { bClearState } from "../../../store/reducers/service.blog.slice";

const Blogs = () => {
  const { accessToken, errorMessage, successMessage, loading } = useSelector(state => state.user);
  const {
    blogs,
    successMSG,
    errorMSG,
    bIsLoading,
    singleBlog
  } = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    mainHeading: "",
    image: null,
    firstHeading: "",
    secondHeading: "",
    secondHeadingFirstDesc: "",
    secondHeadingImg: [],
    secondHeadingSecDesc: "",
    quote: "",
    secondHeadingThirdDesc: "",
    firstHeadingDesc: ""
  });
  const removeHeaderImageField = useRef();
  const removeSubHeaderImageField = useRef();
  const params = new URLSearchParams(window.location.search);
  const [blogid , setBlogId] = useState(params.get('blogid'))
  
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === 'secondHeadingImg') {
        const imgArray = []
        Array.from(files).forEach(el => {
          imgArray.push(el)
        })
        setFormData(pre => ({ ...pre, [name]: imgArray }));
      } else {
        setFormData(pre => ({ ...pre, [name]: files[0] }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImageFieldState = (index, name) => {

    if (removeHeaderImageField.current && name === 'image') {
      removeHeaderImageField.current.value = '';
    }

    if (removeSubHeaderImageField.current && name === 'secondHeadingImg') {
      const filesArray = Array.from(removeSubHeaderImageField.current.files);

      // Remove the file at the specified index
      filesArray.splice(index, 1);

      // Create a new DataTransfer object to update the file input
      const dataTransfer = new DataTransfer();
      filesArray.forEach((file) => dataTransfer.items.add(file));

      // Set the updated file list
      removeSubHeaderImageField.current.files = dataTransfer.files;
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const formDATA = new FormData();
    Object.keys(formData).forEach((key, index) => {
      if (key === 'image') {
        formDATA.append('image', formData[key]);
      } else if (key === "secondHeadingImg" && Array.isArray(formData[key])) {
        formData[key].forEach(element => {
          formDATA.append('secondHeadingImg', element);
        });
      } else {
        formDATA.append(key, formData[key]);
      }
    })
    // console.log(...formDATA)
    dispatch(addBlog({ formData: formDATA, accessToken }))
  };

  useEffect(() => {
    if(singleBlog && Object.keys(singleBlog).length > 0) {
      setFormData({
        type: singleBlog.type || "",
        mainHeading: singleBlog.mainHeading || "",
        image: singleBlog.image || null,
        firstHeading: singleBlog.firstHeading || "",
        secondHeading: singleBlog.secondHeading || "",
        secondHeadingFirstDesc: singleBlog.secondHeadingFirstDesc || "",
        secondHeadingImg: singleBlog.secondHeadingImg || [],
        secondHeadingSecDesc: singleBlog.secondHeadingSecDesc || "",
        quote: singleBlog.quote || "",
        secondHeadingThirdDesc: singleBlog.secondHeadingThirdDesc || "",
        firstHeadingDesc: singleBlog.firstHeadingDesc || ""
      });
    }
  },[singleBlog]);

  useEffect(() => {
    if (successMSG) {
      toast.success(successMSG, { position: 'top-right' });
      removeHeaderImageField.current.value = '';
      removeSubHeaderImageField.current.value = '';
      setFormData({
        type: "",
        mainHeading: "",
        firstHeading: "",
        secondHeading: "",
        secondHeadingFirstDesc: "",
        secondHeadingSecDesc: "",
        quote: "",
        secondHeadingThirdDesc: "",
        firstHeadingDesc: ""
      });
    }
    if (errorMSG) {
      toast.error(errorMSG, { position: 'top-right' })
    }


    dispatch(bClearState());
  }, [successMSG, errorMSG]);

  useEffect(() =>{
    if(blogid) {
      dispatch(getSignleBlog({ accessToken, id: blogid }))
    }
  },[blogid]);

  return (
    <CCard className="p-3 mb-4">
      <CCardHeader>
        <h4>Create a Blog Post</h4>
      </CCardHeader>
      <CCardBody>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CFormLabel htmlFor="blogTitle">Blog Header</CFormLabel>
          <CFormInput
            type="text"
            id="blogType"
            name="type"
            placeholder="Enter blog type"
            value={formData.type}
            feedbackValid="Looks good!"
            onChange={handleChange}
            required
          />
          <CFormInput
            type="text"
            id="blogTitle"
            name="mainHeading"
            placeholder="Enter blog header"
            value={formData.mainHeading}
            feedbackValid="Looks good!"
            onChange={handleChange}
            required
          />



          <CFormLabel htmlFor="blogHeaderImage">Blog Header Image</CFormLabel>
          <CFormInput
            type="file"
            id="blogHeaderImage"
            name="image"
            feedbackValid="Looks good!"
            onChange={handleChange}
            required
            accept="image/*"
            ref={removeHeaderImageField}
          />

          <ImageShow images={formData.image} name={"image"} setProduct={setFormData} removeImageFieldState={removeImageFieldState} />

          <CFormLabel htmlFor="blogFirstHeading">First Heading</CFormLabel>
          <CFormInput
            type="text"
            id="blogFirstHeading"
            name="firstHeading"
            placeholder="Enter first blog heading"
            value={formData.firstHeading}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <TyniMCE name={'firstHeadingDesc'} funsForStateUpdate={setFormData} />

          <CFormLabel htmlFor="blogSecondHeading">Blog Second Heading</CFormLabel>
          <CFormInput
            type="text"
            id="blogSecondHeading"
            name="secondHeading"
            placeholder="Enter Blog second heading"
            value={formData.secondHeading}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <CFormLabel htmlFor="blogSecondHeadingFirstDesc">Second Heading First Description</CFormLabel>
          <CFormTextarea
            id="blogSecondHeadingFirstDesc"
            name="secondHeadingFirstDesc"
            placeholder="Enter blog Second heading first description"
            value={formData.secondHeadingFirstDesc}
            onChange={handleChange}
            required
            className="mt-3"
            rows={3}
          />

          <CFormLabel htmlFor="blogSecondHeadingImage">Blog Second Heading Image</CFormLabel>
          <CFormInput
            type="file"
            id="blogSecondHeadingImage"
            name="secondHeadingImg"
            feedbackValid="Looks good!"
            onChange={handleChange}
            required
            multiple
            accept="image/*"
            ref={removeSubHeaderImageField}
          />

          <ImageShow images={formData.secondHeadingImg} name={"secondHeadingImg"} setProduct={setFormData} removeImageFieldState={removeImageFieldState} />

          <CFormLabel htmlFor="blogSecondHeadingSecondDesc">Second Heading Second Description</CFormLabel>
          <CFormTextarea
            type="text"
            id="blogSecondHeadingSecondDesc"
            name="secondHeadingSecDesc"
            placeholder="Enter blog Second heading second description"
            value={formData.secondHeadingSecDesc}
            onChange={handleChange}
            required
            className="mt-3"
            rows={3}
          />

          <CFormLabel htmlFor="blogQuotes">Blog Quotes</CFormLabel>
          <CFormTextarea
            id="blogQuotes"
            name="quote"
            rows="5"
            placeholder="Enter blog quotes"
            value={formData.quote}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <CFormLabel htmlFor="blogSecondHeadingThirdDesc">Second Heading Third Description</CFormLabel>
          <CFormTextarea
            type="text"
            id="blogSecondHeadingThirdDesc"
            name="secondHeadingThirdDesc"
            placeholder="Enter blog Second heading third description"
            value={formData.secondHeadingThirdDesc}
            onChange={handleChange}
            required
            className="mt-3"
            rows={3}
          />

          <CButton type="submit" color="primary" disabled={bIsLoading} className="mt-3" style={{ width: '100px' }}>
            {bIsLoading && <CSpinner size="sm" />} Submit
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default Blogs;
