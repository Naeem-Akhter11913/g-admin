import React from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from '/images/avatars/1.jpg'
import avatar2 from '/images/avatars/2.jpg'
import avatar3 from '/images/avatars/3.jpg'
import avatar4 from '/images/avatars/4.jpg'
import avatar5 from '/images/avatars/5.jpg'
import avatar6 from '/images/avatars/6.jpg'
import Pagination from '../../components/Pagination'

const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

const Payments = () => {
    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4">
                    <CCardHeader>Traffic {' & '} Sales</CCardHeader>
                    <CCardBody>
                        
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead className="text-nowrap">
                                <CTableRow>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        <CIcon icon={cilPeople} />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        Country
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        Payment Method
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {tableExample.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell className="text-center">
                                            <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.user.name}</div>
                                            <div className="small text-body-secondary text-nowrap">
                                                <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                                                {item.user.registered}
                                            </div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div className="d-flex justify-content-between text-nowrap">
                                                <div className="fw-semibold">{item.usage.value}%</div>
                                                <div className="ms-3">
                                                    <small className="text-body-secondary">{item.usage.period}</small>
                                                </div>
                                            </div>
                                            <CProgress thin color={item.usage.color} value={item.usage.value} />
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CIcon size="xl" icon={item.payment.icon} />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div className="small text-body-secondary text-nowrap">Last login</div>
                                            <div className="fw-semibold text-nowrap">{item.activity}</div>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                        <Pagination />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Payments