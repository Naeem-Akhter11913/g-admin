
import React, { useEffect, useState } from 'react'

import { CTable, CButton, CContainer, CSpinner, CCard, CCardHeader } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../store/action/serviceAction';
import Swal from 'sweetalert2'
import Pagination from '../../../components/Pagination';

const columns = [
  {
    key: 'id',
    label: '#',
    _props: { scope: 'col' },
  },
  {
    key: 'product_name',
    label: 'Product name',
    _props: { scope: 'col' },
  },
  {
    key: 'desc',
    label: 'Product description',
    _props: { scope: 'col' },
  },
  {
    key: 'title',
    label: 'Title',
    _props: { scope: 'col' },
  },
  {
    key: 'price',
    label: 'Price',
    _props: { scope: 'col' },
  },
  {
    key: 'life',
    label: 'Life',
    _props: { scope: 'col' },
  },
  {
    key: 'stock',
    label: 'Stock',
    _props: { scope: 'col' },
  },
  {
    key: 'action',
    label: 'Action',
    _props: { scope: 'col' },
  },
]

const ViewAppProducts = () => {

  const { accessToken, errorMessage, successMessage, loading } = useSelector(state => state.user);
  const { products, productSuccessMSG, productErrorMSG, pIsLoading } = useSelector(state => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [rowProducts, setRowProducts] = useState([]);


  const addNewProduct = _ => {
    navigate('/product/add-products');
  }

  const handleDelete = e => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(28 60 91)",
      cancelButtonColor: "rgb(112 20 20)",
      confirmButtonText: "Yes, delete it!",
      background:'#212631',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          background:'#212631',    
          confirmButtonColor: "rgb(28 60 91)",      
        });
      }
    });
  }

  useEffect(() => {
    if (products && Array.isArray(products) && products.length > 0) {
      const array = []
      const parsedProducts = JSON.parse(JSON.stringify(products));

      parsedProducts.forEach((product, i) => {
        const {
          description,
          specifications,
          actualPrice,
          createdAt,
          falsePrice,
          images,
          life,
          mfg,
          productName,
          productType,
          sku,
          stock,
          tags,
          updatedAt,
          verderId,
          __v,
          _id,
          ...rest
        } = product;

        const finalObject = {
          ...description,
          ...specifications,
          ...rest,
          actualPrice,
          createdAt,
          falsePrice,
          images,
          life,
          mfg,
          productName,
          productType,
          sku,
          stock,
          tags,
          updatedAt,
          verderId,
          __v,
          _id,
        };

        const formattedObject = {
          desc: finalObject.productDisc,
          price: actualPrice,
          createdAt,
          falsePrice,
          images,
          life,
          mfg,
          product_name: productName,
          title: productType,
          sku,
          stock,
          tags,
          updatedAt,
          verderId,
          __v,
          _id,
          id: i + 1,
          ...rest,
          action: (
            <>
              <CButton color="primary" size="sm" className="me-2">
                <CIcon icon={cilPencil} />
              </CButton>
              <CButton color="danger" size="sm" onClick={e => handleDelete(e)}>
                <CIcon icon={cilTrash} />
              </CButton>
            </>
          ),
          _cellProps: { id: { scope: 'row' } },
        };

        array.push(formattedObject)

      });

      setRowProducts([...array])

    }
  }, [products]);


  useEffect(() => {
    dispatch(getProducts({ accessToken, page, limit }))
  }, []);

  return (

    <CCard className="p-3 mb-4">
      <CCardHeader className='d-flex justify-content-between mb-3'>
        <h4 style={{ textWrap: 'nowrap' }}>Total Products</h4>
        <CContainer className="d-flex justify-content-end">
          <CButton color="success" size="sm" onClick={addNewProduct}>
            <CIcon icon={cilPlus} />
          </CButton>
        </CContainer>
      </CCardHeader>



      {pIsLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <CSpinner color="primary" />
        </div>
      ) : (<>
        <CTable hover columns={columns} items={rowProducts} />
        <Pagination />
      </>

      )}
    </CCard>
  )
}

export default ViewAppProducts
