import React, { useState, useEffect, useRef } from "react";
import { CForm, CFormInput, CFormTextarea, CButton, CCard, CCardBody, CCardHeader, CFormLabel } from "@coreui/react";
import TyniMCE from "../../../components/TyniMCE";
import ImageShow from "../../../components/ImageShow";
import { PERSONAL_API_KEY } from "../../../config/configuration";

const Blogs = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    blog_header: "",
    blog_header_image: null,
    blog_first_heading: "",
    blog_second_heading: "",
    blog_second_heading_first_desc: "",
    blog_second_heading_image: [],
    blog_second_heading_second_desc: "",
    blog_quotes: "",
    blog_second_heading_third_desc: "",
    blog_tiny_desc: ""
  });
  const removeHeaderImageField = useRef();
  const removeSubHeaderImageField = useRef();

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, author: "John Doe" }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === 'blog_second_heading_image') {
        const imgArray = []
        Array.from(files).forEach(el =>{
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
    if (removeHeaderImageField.current && name === 'blog_header_image') {
      removeHeaderImageField.current.value = ''
    }

    if (removeSubHeaderImageField.current && name === 'blog_second_heading_image') {
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
  console.log(PERSONAL_API_KEY)
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    const formDATA = new FormData();

    Object.keys(formData).forEach((key, index) => {
      if (formDATA[key] === 'blog_header_image') {
        formDATA.append('blog_header_image', formDATA[key])
      } else if (formDATA[key] === "blog_second_heading_image" && Array.isArray(formDATA[key])) {
        formDATA[key].forEach(element => {
          formDATA.append('blog_second_heading_image', element);
        });
      } else {
        formDATA.append(key, formDATA[key]);
      }
    })
    console.log(...formDATA)
    // setValidated(true);
  };

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
            id="blogTitle"
            name="blog_header"
            placeholder="Enter blog header"
            value={formData.blog_header}
            feedbackValid="Looks good!"
            onChange={handleChange}
            required
            
          />



          <CFormLabel htmlFor="blogHeaderImage">Blog Header Image</CFormLabel>
          <CFormInput
            type="file"
            id="blogHeaderImage"
            name="blog_header_image"
            feedbackValid="Looks good!"
            onChange={handleChange}
            required
            accept="image/*"
            ref={removeHeaderImageField}
          />

          <ImageShow images={formData.blog_header_image} name={"blog_header_image"} setProduct={setFormData} removeImageFieldState={removeImageFieldState} />

          <CFormLabel htmlFor="blogFirstHeading">First Heading</CFormLabel>
          <CFormInput
            type="text"
            id="blogFirstHeading"
            name="blog_first_heading"
            placeholder="Enter first blog heading"
            value={formData.blog_first_heading}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <TyniMCE name={'blog_tiny_desc'} funsForStateUpdate={setFormData} />

          <CFormLabel htmlFor="blogSecondHeading">Blog Second Heading</CFormLabel>
          <CFormInput
            type="text"
            id="blogSecondHeading"
            name="blog_second_heading"
            placeholder="Enter Blog second heading"
            value={formData.blog_second_heading}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <CFormLabel htmlFor="blogSecondHeadingFirstDesc">Second Heading First Description</CFormLabel>
          <CFormInput
            id="blogSecondHeadingFirstDesc"
            name="blog_second_heading_first_desc"
            placeholder="Enter blog Second heading first description"
            value={formData.blog_second_heading_first_desc}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <CFormLabel htmlFor="blogSecondHeadingImage">Blog Second Heading Image</CFormLabel>
          <CFormInput
            type="file"
            id="blogSecondHeadingImage"
            name="blog_second_heading_image"
            feedbackValid="Looks good!"
            onChange={handleChange}
            required
            multiple
            accept="image/*"
            ref={removeSubHeaderImageField}
          />

          <ImageShow images={formData.blog_second_heading_image} name={"blog_second_heading_image"} setProduct={setFormData} removeImageFieldState={removeImageFieldState} />

          <CFormLabel htmlFor="blogSecondHeadingSecondDesc">Second Heading Second Description</CFormLabel>
          <CFormInput
            type="text"
            id="blogSecondHeadingSecondDesc"
            name="blog_second_heading_second_desc"
            placeholder="Enter blog Second heading second description"
            value={formData.blog_second_heading_second_desc}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <CFormLabel htmlFor="blogQuotes">Blog Quotes</CFormLabel>
          <CFormTextarea
            id="blogQuotes"
            name="blog_quotes"
            rows="5"
            placeholder="Enter blog quotes"
            value={formData.blog_quotes}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <CFormLabel htmlFor="blogSecondHeadingThirdDesc">Second Heading Third Description</CFormLabel>
          <CFormInput
            type="text"
            id="blogSecondHeadingThirdDesc"
            name="blog_second_heading_third_desc"
            placeholder="Enter blog Second heading third description"
            value={formData.blog_second_heading_third_desc}
            onChange={handleChange}
            required
            className="mt-3"
          />

          <CButton type="submit" color="primary" className="mt-3 w-25">
            Submit
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default Blogs;
