
import React, { useEffect, useRef, useState } from 'react'

import { CTable, CButton, CContainer, CSpinner, CCard, CCardHeader } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import Pagination from '../../../components/Pagination';
import { deleteProduct, getProducts } from '../../../store/action/service.product.action';
import { pClearState } from '../../../store/reducers/service.product.slice';
import { toast } from 'react-toastify';

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
  const { products, productSuccessMSG, productErrorMSG, pIsLoading, totalProductPages, totalProductItems, currentProductPage, isProductGettingLoading } = useSelector(state => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(totalProductPages);
  const [totalItem, setTotalItem] = useState(totalProductItems);
  const [rowProducts, setRowProducts] = useState([]);
  const deleteIndexRef = useRef();


  const addNewProduct = _ => {
    navigate('/product/add-products');
  }

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(28 60 91)",
      cancelButtonColor: "rgb(112 20 20)",
      confirmButtonText: "Yes, delete it!",
      background: '#212631',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct({ accessToken, id }));
        deleteIndexRef.current = id;
      }
    });
  }
  const actionButtons = (id) => {
    return (
      <>
        <Link to={`/product/add-products?productid=${id}`}>
          <CButton color="primary" size="sm" className="me-2">
            <CIcon icon={cilPencil} />
          </CButton>
        </Link>
        <CButton color="danger" size="sm" disabled={isProductGettingLoading} onClick={e => handleDelete(id)}>
          {isProductGettingLoading && <CSpinner size='sm' />} <CIcon icon={cilTrash} />
        </CButton>
      </>
    );
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
          action: actionButtons(_id),
          _cellProps: { id: { scope: 'row' } },
        };

        array.push(formattedObject)

      });

      setRowProducts([...array]);

      setTotalPage(totalProductPages);
      setTotalItem(totalProductItems);

    }
  }, [products]);


  useEffect(() => {
    if (productSuccessMSG && deleteIndexRef.current) {
      toast.success(productSuccessMSG, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      const rrr = rowProducts.filter(item => item._id !== deleteIndexRef.current).map((item, index) => ({ ...item, id: index + 1 }));
      deleteIndexRef.current = null;
      setRowProducts([...rrr]);
    }

    if (productErrorMSG) {
      toast.error(productErrorMSG, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    dispatch(pClearState())
  }, [dispatch, productSuccessMSG, productErrorMSG, deleteIndexRef.current])


  useEffect(() => {
    dispatch(getProducts({ accessToken, page, limit }))
  }, [accessToken, page, limit]);

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
        {/* <Pagination /> */}
        <Pagination
          totalItem={totalItem}
          totalPage={totalPage}
          currentPage={page} // not currentPage from Redux
          setPage={setPage}
          setLimit={setLimit} />
      </>

      )}
    </CCard>
  )
}

export default ViewAppProducts
