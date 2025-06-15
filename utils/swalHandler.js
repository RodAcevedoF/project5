import Swal from "sweetalert2";

export const showConfirm = async ({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmText = "Yes, continue",
  cancelText = "Cancel",
  icon = "warning"
} = {}) => {
  return await Swal.fire({
    icon,
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText
  });
};

export const showSuccess = async (
  message = "Operation completed successfully"
) => {
  return await Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 1000,
    showConfirmButton: false
  });
};

export const showError = async (message = "Something went wrong") => {
  return await Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    confirmButtonColor: "#d33"
  });
};

export const showWarning = async (message = "Please check your input") => {
  return await Swal.fire({
    icon: "warning",
    title: "Warning",
    text: message,
    timer: 1400,
    showConfirmButton: false
  });
};

export const showToast = (
  message = "Saved!",
  type = "success",
  timer = 1000
) => {
  return Swal.fire({
    toast: true,
    position: "top-end",
    icon: type,
    title: message,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
};

export const closeSwal = () => {
  Swal.close();
};

export const showInfo = async (message = "Here is some information") => {
  return await Swal.fire({
    icon: "info",
    title: "Info",
    text: message,
    timer: 1500,
    showConfirmButton: false
  });
};
