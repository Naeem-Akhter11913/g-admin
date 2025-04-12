import React, { useEffect, useRef, useState } from 'react'

import {
  CCol,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CImage,
  CCard,
  CCardHeader
} from '@coreui/react'
import ImageShow from '../../../components/ImageShow'
import ColorShow from './ColorShow';
import obj from './productObject';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { pClearState } from '../../../store/reducers/service.product.slice';
import { addProducts } from '../../../store/action/service.product.action';


const AddProducts = () => {
  const { accessToken, errorMessage, successMessage, loading } = useSelector(state => state.user);
  const { products, productSuccessMSG, productErrorMSG, pIsLoading } = useSelector(state => state.products);

  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({ ...obj });
  const dispatch = useDispatch();
  const [colorPicker, setColorPicher] = useState(null);
  const fronImgeRef = useRef();
  const backImgeRef = useRef();
  const removeMultiple = useRef();


  const handleCollectFormData = e => {
    const { name, files, value } = e.target;
    if (files) {
      const element = document.getElementsByName(name);
      let array = [];
      element.forEach(el => {
        array = Array.from(el.attributes).map(attr => attr.name)
      })

      if (array.includes('multiple')) {
        setProduct(pre => ({ ...pre, [name]: Array.from(files) }))
      } else {
        setProduct(pre => ({ ...pre, [name]: files[0] }))
      }

    } else {
      if (name === 'color') {
        setColorPicher(value);
      } else
        setProduct(pre => ({ ...pre, [name]: value }));
    }

  }

  const addColor = _ => {
    let color = product.color;
    color = color.concat(`,${colorPicker}`);
    setProduct(pre => ({ ...pre, ['color']: color }));
    setColorPicher(null);
  }

  const removeImageFieldState = (index, name) => {
    if (fronImgeRef.current && name === 'frontImage') {
      fronImgeRef.current.value = "";
    }
    if (backImgeRef.current && name === 'backImage') {
      backImgeRef.current.value = "";
    }

    if (removeMultiple.current && name === 'images') {
      const filesArray = Array.from(removeMultiple.current.files);

      // Remove the file at the specified index
      filesArray.splice(index, 1);

      // Create a new DataTransfer object to update the file input
      const dataTransfer = new DataTransfer();
      filesArray.forEach((file) => dataTransfer.items.add(file));

      // Set the updated file list
      removeMultiple.current.files = dataTransfer.files;
    }
  }


  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    const formData = new FormData();

    Object.keys(product).forEach(key => {
      if (key === "frontImage" || key === "backImage") {
        if (product[key]) formData.append(key, product[key]);
      } else if (key === "images" && Array.isArray(product[key])) {
        product[key].forEach((image, index) => {
          formData.append(`images`, image);
        });
      } else {
        formData.append(key, product[key]);
      }
    });
    dispatch(addProducts({ formData: formData, accessToken }));
  }


  useEffect(() => {
    if (productSuccessMSG) {
      toast.success(productSuccessMSG, { position: 'top-right' });
    }

    if (productErrorMSG) {
      toast.error(productErrorMSG, { position: 'top-right' });
    }
    dispatch(pClearState());
  }, [productErrorMSG, productSuccessMSG]);

  return (
    <CCard className="p-3 mb-4">
      <CCardHeader>
        <h4>Create a Product</h4>
      </CCardHeader>
      <CForm
        className="row g-3 needs-validation mt-3"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom01"
            label="Product name"
            name='productName'
            required
            placeholder='Product name'
            value={product && product.productName}
            onChange={handleCollectFormData}
          />
        </CCol>
        <CCol md={4}>
          <CFormSelect
            aria-label="Default select example"
            id="validationCustom02"
            label="Product type"
            name='productType'
            value={product && product.productType}
            onChange={handleCollectFormData}
            options={[
              { label: 'Open this select menu', value: '' },
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3' },
            ]}
          />
        </CCol>

        <CCol md={4}>
          <CFormInput
            type="file"
            feedbackValid="Looks good!"
            id="validationCustom01"
            label="Front Image"
            placeholder="Front Image"
            required
            accept='image/*'
            name='frontImage'
            onChange={handleCollectFormData}
            // value={product.frontImage}
            ref={fronImgeRef}
          />
          <ImageShow images={product.frontImage} name={'frontImage'} setProduct={setProduct} removeImageFieldState={removeImageFieldState} />
        </CCol>

        <CCol md={4}>
          <CFormInput
            type="file"
            feedbackValid="Looks good!"
            id="validationCustom03"
            label="Back Image"
            placeholder="Back Image"
            required
            accept='image/*'
            name='backImage'
            onChange={handleCollectFormData}
            // value={product.backImage}
            ref={backImgeRef}
          />
          <ImageShow images={product.backImage} name={'backImage'} setProduct={setProduct} removeImageFieldState={removeImageFieldState} />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="number"
            feedbackValid="Looks good!"
            id="validationCustom04"
            label="Real Price"
            placeholder="Real Price"
            required
            name='actualPrice'
            onChange={handleCollectFormData}
            value={product && product.actualPrice}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="number"
            feedbackValid="Looks good!"
            id="validationCustom05"
            label="Discount Price"
            placeholder="Discount Price"
            required
            name='falsePrice'
            onChange={handleCollectFormData}
            value={product && product.falsePrice}
          />
        </CCol>

        <CCol md={4}>
          <CFormInput
            type="file"
            feedbackValid="Looks good!"
            id="validationCustom06"
            label="Select show images"
            placeholder="Select show images"
            required
            multiple
            accept='image/*'
            name='images'
            onChange={handleCollectFormData}
            // value={product.images}
            ref={removeMultiple}
          />
          <ImageShow images={product.images} name={'images'} setProduct={setProduct} removeImageFieldState={removeImageFieldState} />
        </CCol>

        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom07"
            label="Stock keeping unit"
            required
            placeholder='Stock keeping unit'
            name='sku'
            onChange={handleCollectFormData}
            value={product && product.sku}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="number"
            feedbackValid="Looks good!"
            id="validationCustom08"
            label="Manufacturing"
            placeholder="Manufacturing"
            required
            name='mfg'
            onChange={handleCollectFormData}
            value={product && product.mfg}
          />
        </CCol>

        <CCol md={4}>
          <CFormSelect
            aria-label="Default select example"
            id="validationCustom09"
            label="Tags"
            name='tags'
            value={product && product.tags}
            onChange={handleCollectFormData}
            options={[
              { label: 'Open this select menu', value: '' },
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3' },
            ]}
          />
        </CCol>

        <CCol md={4}>
          <CFormInput
            type="number"
            feedbackValid="Looks good!"
            id="validationCustom10"
            label="Life"
            placeholder="Life"
            required
            name='life'
            onChange={handleCollectFormData}
            value={product && product.life}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="number"
            feedbackValid="Looks good!"
            id="validationCustom11"
            label="Stock"
            placeholder="Stock"
            required
            name='stock'
            onChange={handleCollectFormData}
            value={product && product.stock}
          />
        </CCol>
        <h3>Product description</h3>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom12"
            label="Type Of Packing"
            placeholder='Type Of Packing'
            required
            name='typeOfPacking'
            onChange={handleCollectFormData}
            value={product && product.typeOfPacking}
          />
        </CCol>
        <CCol md={4} className='d-flex align-items-center gap-3'>
          <ColorShow colorArray={product && product.color} setProduct={setProduct} />
          {product && Array.isArray(product?.color) ? product?.color?.length !== 0 : product?.color?.split(',').filter(item => item.length > 0).length < 5 && <><div>
            <CFormInput
              type="color"
              feedbackValid="Looks good!"
              id="validationCustom13"
              label="Select color"
              placeholder="Select color"
              required
              name='color'
              onChange={handleCollectFormData}
              value={colorPicker}
              disabled={product && Array.isArray(product?.color) ? product?.color?.length !== 0 : product?.color?.split(',').filter(item => item.length > 0).length > 5}
            />
          </div>

            {product && Array.isArray(product?.color) ? product?.color?.length !== 0 : product?.color?.split(',').filter(item => item.length > 0).length > 5 || colorPicker && <CButton onClick={addColor} color="primary" type="button">
              Add
            </CButton>}
          </>}

        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom14"
            label="Quantity per case"
            placeholder="Quantity per case"
            required
            name='quantityPerCase'
            onChange={handleCollectFormData}
            value={product && product.quantityPerCase}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="number"
            feedbackValid="Looks good!"
            id="validationCustom15"
            label="Ethyl Alcohol"
            placeholder="Ethyl Alcohol"
            required
            name='ethylAlcohol'
            onChange={handleCollectFormData}
            value={product && product.ethylAlcohol}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom16"
            label="Piece In One"
            placeholder="Piece In One"
            required
            name='pieceInOne'
            onChange={handleCollectFormData}
            value={product && product.pieceInOne}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom17"
            label="Packaging And Delivery"
            placeholder="Packaging And Delivery"
            required
            name='packagingAndDelivery'
            onChange={handleCollectFormData}
            value={product && product.packagingAndDelivery}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom18"
            label="Suggested use"
            placeholder='comma separator'
            required
            name='suggestedUse'
            onChange={handleCollectFormData}
            value={product && product.suggestedUse}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom19"
            label="Other ingredients"
            placeholder='Other ingredients'
            required
            name='otherIngredients'
            onChange={handleCollectFormData}
            value={product && product.otherIngredients}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom20"
            label="Warnings"
            placeholder='Warnings'
            required
            name='warnings'
            onChange={handleCollectFormData}
            value={product && product.warnings}
          />
        </CCol>
        <CCol md={12}>
          <CFormTextarea
            id="exampleFormControlTextarea1"
            label="Product description"
            rows={3}
            name='productDisc'
            placeholder='Product description'
            onChange={handleCollectFormData}
            value={product && product.productDisc}
          ></CFormTextarea>
        </CCol>
        <h3>Specifications</h3>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom21"
            label="Stand up"
            placeholder='Stand up'
            required
            name='standUp'
            onChange={handleCollectFormData}
            value={product && product.standUp}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom22"
            label="Folded without wheels"
            placeholder='Folded without wheels'
            name='foldedWithoutWheels'
            onChange={handleCollectFormData}
            value={product && product.foldedWithoutWheels}
            required
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom23"
            label="Folded with wheels"
            placeholder='Folded with wheels'
            name='foldedWithWheels'
            onChange={handleCollectFormData}
            value={product && product.foldedWithWheels}
            required
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom24"
            label="Door pass through"
            placeholder='Door pass through'
            name='doorPassThrough'
            required
            onChange={handleCollectFormData}
            value={product && product.doorPassThrough}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom25"
            label="Frame"
            placeholder='Frame'
            name='frame'
            required
            onChange={handleCollectFormData}
            value={product && product.frame}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom26"
            label="Weight without wheels"
            placeholder='Weight without wheels'
            name='weightWithoutWheels'
            required
            onChange={handleCollectFormData}
            value={product && product.weightWithoutWheels}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom27"
            label="Weight capacity"
            placeholder='Weight capacity'
            name='weightCapacity'
            value={product && product.weightCapacity}
            onChange={handleCollectFormData}
            required
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom28"
            label="Width"
            placeholder='Width'
            name='width'
            value={product && product.width}
            onChange={handleCollectFormData}
            required
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom29"
            label="Height"
            placeholder='Height'
            name='handleHeight'
            required
            value={product && product.handleHeight}
            onChange={handleCollectFormData}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom30"
            label="Wheels"
            placeholder='Wheels'
            name='wheels'
            required
            value={product && product.wheels}
            onChange={handleCollectFormData}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom31"
            label="Seat back height"
            placeholder='Seat back height'
            name='seatBackHeight'
            required
            value={product && product.seatBackHeight}
            onChange={handleCollectFormData}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom32"
            label="Head room inside canopy"
            placeholder='Head room inside canopy'
            name='headRoomInsideCanopy'
            required
            value={product && product.headRoomInsideCanopy}
            onChange={handleCollectFormData}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom33"
            label="Product color separate"
            placeholder='Product color separate by comma'
            name='productColor'
            required
            value={product && product.productColor}
            onChange={handleCollectFormData}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            feedbackValid="Looks good!"
            id="validationCustom34"
            label="Size"
            placeholder='Size separate by comma like(X,XI)'
            name='size'
            required
            value={product && product.size}
            onChange={handleCollectFormData}
          />
        </CCol>
        <CCol xs={12} className='mb-4'>
          <CButton color="primary" type="submit" disabled={pIsLoading}>
            Submit form
          </CButton>
        </CCol>
      </CForm>
    </CCard>
  )
}

export default AddProducts