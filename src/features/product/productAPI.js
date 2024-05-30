// A mock function to mimic making an async request for data
// export function fetchCount(amount = 1) {
//   return new Promise(async (resolve) =>{
//     // setTimeout(() => resolve({ data: amount }), 500)
//   const response= await fetch('http://localhost:8080')
//   const result = await response.json()
//   resolve({data})
//   }
//   );
// }
export function fetchAllProducts() {
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/products');
  //     const result = await response.json();
  //     resolve({ data: result });
  //   } catch (error) {
  //     reject(error);
  //   }
  // });
  return new Promise(async (resolve) => {
    
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();
    resolve({ data });
  });
}
