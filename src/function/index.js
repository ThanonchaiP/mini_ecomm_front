export const toBase64 = (event) => {
  return new Promise((resolve, reject) => {
    if (event.target.files && event.target.files[0]) {
      let fileUpload = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileUpload);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }
  });
};

export const toUrl = (event) => {
  if (event.target.files && event.target.files[0]) {
    let fileUpload = event.target.files[0];
    return URL.createObjectURL(fileUpload);
  }
};
