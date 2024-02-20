import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useErrorToast = () => {
  const showErrorToast = (message) => {
    
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
      className: 'toast-message',
    });
  };

  return showErrorToast;
};

export default useErrorToast;