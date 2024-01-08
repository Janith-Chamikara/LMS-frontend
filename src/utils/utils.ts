export const convertToBase64 = (file) => {
 return new Promise((reslove,reject)=>{
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.onload = () => {
   reslove(fileReader.result)
  }
  fileReader.onerror = (error) => {
   reject(error)
  }
 })
}

