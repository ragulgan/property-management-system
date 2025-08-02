import Swal from 'sweetalert2'

function successAlert (title) {
  Swal.fire({
    type: 'success',
    icon: 'success',
    title: `<p className="text-lg font-muli">${title}</p>`,
    showConfirmButton: false,
    timer: 2500
  })
}

function confirmationAlert (
  title,
  text,
  type,
  confirmButtonText,
  cancelButtonText,
  confirmAction,
  cancelAction
) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: `btn btn-${type} m-1`,
      cancelButton: 'btn btn-secondary m-1'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons
    .fire({
      title,
      text,
      type,
      icon: type,
      showCancelButton: true,
      confirmButtonColor: '#f68681',
      cancelButtonColor: '#d69911',
      confirmButtonText,
      cancelButtonText,
      allowOutsideClick: false,
      allowEscapeKey: true
    })
    .then(result => {
      if (result.value) {
        confirmAction()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        cancelAction()
      }
    })
}
function warningAlert (
  title,
  text,
  type,
  confirmButtonText,
  cancelButtonText,
  confirmAction
) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger m-1',
      cancelButton: 'btn btn-secondary m-1'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons
    .fire({
      title,
      text,
      type,
      icon: 'warning',
      showCancelButton: !!cancelButtonText,
      confirmButtonColor: '#f68681',
      cancelButtonColor: '#d69911',
      confirmButtonText,
      cancelButtonText,
      allowOutsideClick: false
    })
    .then(result => {
      if (result.value) {
        confirmAction && confirmAction()
      }
    })
}

function confirmAlert (
  title,
  text,
  type,
  confirmButtonText,
  cancelButtonText,
  confirmAction,
  cancelAction
) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: `btn btn-${type} m-1`,
      cancelButton: 'btn btn-secondary m-1'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons
    .fire({
      title,
      text,
      type,
      icon: type,
      showCancelButton: false,
      confirmButtonColor: '#f68681',
      cancelButtonColor: '#d69911',
      confirmButtonText,
      cancelButtonText,
      allowOutsideClick: false,
      allowEscapeKey: true
    })
    .then(result => {
      if (result.value) {
        confirmAction()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        cancelAction()
      }
    })
}

export { successAlert, confirmationAlert, warningAlert, confirmAlert }
