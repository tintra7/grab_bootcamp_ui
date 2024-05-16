export const successAlert = (message: string) => {
  return {
    title: `SUCCESS`,
    icon: 'success',
    html: `<span>${message}</span>`,
    confirmButtonColor: 'var(--dark-cream)',
    confirmButtonText: `<span style="color: var(--dark-green); font-weight: 900;">OK</span>`
  }
}

export const errorAlert = (message: string) => {
  return {
    title: `ERROR`,
    icon: 'error',
    html: `<span>${message}</span>`,
    confirmButtonColor: 'var(--dark-cream)',
    confirmButtonText: `<span style="color: var(--dark-green); font-weight: 900;">RETRY</span>`
  }
}

export const warningAlert = (message: string) => {
  return {
    title: `WARNING`,
    icon: 'warning',
    html: `<span>${message}</span>`,
    confirmButtonColor: 'var(--dark-cream)',
    confirmButtonText: `<span style="color:var(--dark-green); font-weight: 900;">OK</span>`
  }
}

export const confirmAlert = (message: string) => {
  return {
    html: `<span style="font-weight: bold">${message}</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#cfc3d4',
    cancelButtonColor: '#f7c4c4',
    cancelButtonText: `<span style="color:#e53838; font-weight: 900;">CANCEL</span>`,
    confirmButtonText: `<span style="color:#5e366e; font-weight: 900;">YES</span>`
  }
}

export const loading = {
  html: `<div class="loader">Loading...</div>`,
  background: 'rgba(32,32,32,0)',
  showConfirmButton: false,
  allowOutsideClick: false,
  allowEscapeKey: false
}
