// utils.js

export const validator = (formData) => {
    if (!formData.username || formData.username.trim() === "") {
      return {
        target: "username",
        message: "Foydalanuvchi nomi kiritilmadi",
      };
    }
  
    if (!formData.password || formData.password.trim() === "") {
      return {
        target: "password",
        message: "Parol kiritilmadi",
      };
    }

  
    return null; // No validation errors
  };