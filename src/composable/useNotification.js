import { ref } from 'vue';

export const useNotification = () => {
  const notification = ref({
    show: false,
    type: 'success',
    title: '',
    message: '',
  });

  const showNotification = ({ type = 'success', title, message, duration = 3000 }) => {
    notification.value = {
      show: true,
      type,
      title,
      message,
    };

    setTimeout(() => {
      notification.value.show = false;
    }, duration);
  };

  return {
    notification,
    showNotification,
  };
};