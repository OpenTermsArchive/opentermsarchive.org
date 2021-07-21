import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, ToastOptions, toast } from 'react-toastify';

const defaultOptions: Partial<ToastOptions> = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const useNotifier = () => {
  const notify = (
    variant: ToastOptions['type'] = 'success',
    message: string,
    options: ToastOptions = {}
  ) => {
    if (variant === 'error' && !options.autoClose) {
      options.autoClose = 5000;
    }

    return toast(message, { ...defaultOptions, type: variant, ...options });
  };

  return { notify };
};

export const NotifierContainer = ToastContainer;
export default useNotifier;
