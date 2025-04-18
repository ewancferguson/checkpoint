import Swal, { SweetAlertOptions } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { logger } from './Logger';
import { AxiosError } from 'axios';

const colorConfig: SweetAlertOptions = {
  confirmButtonColor: 'var(--bs-primary)',
  cancelButtonColor: 'var(--bs-secondary)',
  background: 'var(--bs-tertiary-bg)',
  color: 'var(--bs-body-color)'
};

function _error(error: AxiosError | Error | string, eventTrigger = ''): SweetAlertOptions {
  logger.error(eventTrigger, error);

  const config: SweetAlertOptions = {
    ...colorConfig,
    title: 'Error!',
    icon: 'error',
    iconColor: 'var(--bs-danger-text-emphasis)',
    text: 'Uh-oh',
    position: 'top-right',
    timer: 1000 * 5,
    toast: true,
    showConfirmButton: false,
    color: 'var(--bs-danger-text-emphasis)',
    background: 'var(--bs-danger-bg-subtle)'
  };

  if (error instanceof AxiosError) {
    const { response } = error;
    config.text = 'An error occurred';
    config.title += (' ' + response?.status.toString());
    if (response?.data) {
      config.html = typeof response.data === 'string' ? response.data : response.data.message;
    }
  } else if (error instanceof Error) {
    config.text = error.message;
  } else {
    config.text = error;
  }

  return config;
}

export default class Pop {
  static async confirm(
    title = 'Are you sure?',
    text = "You won't be able to revert this!",
    confirmButtonText = 'Yes',
    icon: 'success' | 'error' | 'info' | 'warning' | 'question' = 'warning'
  ): Promise<boolean> {
    try {
      const res = await Swal.fire({
        ...colorConfig,
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton: true,
        reverseButtons: true
      });
      return res.isConfirmed;
    } catch (error) {
      logger.error('CONFIRMATION', error);
      return false;
    }
  }

  static toast(
    title = 'Warning!',
    icon: 'success' | 'error' | 'info' | 'warning' | 'question' = 'warning',
    position: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end' = 'top-end',
    timer = 3000,
    progressBar = true
  ): void {
    Swal.fire({
      ...colorConfig,
      title: title || 'Warning!',
      icon,
      position,
      timer,
      timerProgressBar: progressBar,
      toast: true,
      showConfirmButton: false,
    });
  }

  static success(message = 'Success!'): void {
    this.toast(message, 'success');
  }

  static error(error: AxiosError | Error | string, eventTrigger = ''): void {
    const config = _error(error, eventTrigger);
    Swal.fire(config);
  }
}