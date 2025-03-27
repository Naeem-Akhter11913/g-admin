import Swal from "sweetalert2";
import { userLogout } from "../store/action/authAction";

export const customSweetAlert = (yesButtonText, heading, title, afterLogoutText, afterLogoutThanks, dispatch, logout, navigate) => {
  Swal.fire({
    title: heading || "Are you sure?",
    text: title || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(28 60 91)",
      cancelButtonColor: "rgb(112 20 20)",
    background:'#212631',
    confirmButtonText: yesButtonText || "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(userLogout()).then(() => {
        logout()
        // localStorage.setItem("isLogout",true);
        navigate('/login');
      });
    } 
  });
}