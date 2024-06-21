import { useSelector,useDispatch } from 'react-redux';
import { selectBrands,selectCategories,createProductAsync,fetchAllProductByIdAsync,selectProductById,updateProductAsync } from '../../product/productSlice';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


function ProductForm() {
  const { register, handleSubmit,setValue, formState:{errors},
 } = useForm();
  const brands=useSelector(selectBrands);
  const categories=useSelector(selectCategories);
  const dispatch=useDispatch();
  const params = useParams();
  const selectedProduct=useSelector(selectProductById);

  useEffect(()=>{
     if(params.id)
     {
       dispatch(fetchAllProductByIdAsync(params.id));
       
     }  
  },[params.id,dispatch])

  useEffect(()=>{
    if(selectedProduct){
      setValue('title',selectedProduct.title);
      setValue('description',selectedProduct.description);
      setValue('price',selectedProduct.price);      
      setValue('discountPercentage',selectedProduct.discountPercentage);
      setValue('thumbnail',selectedProduct.thumbnail);
      setValue('stock',selectedProduct.stock);
      setValue('image1',selectedProduct.images[0]);
      setValue('image2',selectedProduct.images[1]);
      setValue('image3',selectedProduct.images[2]);
      setValue('brand',selectedProduct.brand);
      setValue('category',selectedProduct.category);
    }
       
  },[selectedProduct,setValue])
  
  
    return ( 
        <form
        noValidate
        onSubmit={handleSubmit((data)=>{
          console.log(data);
          const product={...data}
          product.images=[product.image1,product.image2,product.image3,product.thumbnail];
          product.rating=0;
          delete product['image1'];
          delete product['image2'];
          delete product['image3'];
          product.price=+product.price;
          product.discountPercentage=+product.discountPercentage;
          product.stock=+product.stock;
          console.log(product);

          if(params.id) {
            product.id=params.id;
            dispatch(
              updateProductAsync(product)
            );
          }else{
            dispatch(
              createProductAsync(product)
            );
          }
          
        })}>
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
          

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    {...register('title',{required:'title is required'})}
                    id="title"
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description',{required:'description is required'})}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
            </div>


            <div className="col-span-full">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <select  {...register('brand',{required:'brand is required'})}>
                  <option value="">--choose brand--</option>
                  {brands.map(brand=>
                    <option value={brand.value}>{brand.label}</option>)
                  }
                  
                  
                </select>
              </div>
              
            </div>

            <div className="col-span-full">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select  {...register('category',{required:'category is required'})}>
                  <option value="">--choose category--</option>
                  {categories.map(category=>
                    <option value={category.value}>{category.label}</option>)
                  }
                  
                  
                </select>
              </div>
              
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  
                  <input
                    type="number"
                    {...register('price',{
                      required:'price is required',
                      min:1,
                      max:10000
                    })}
                    id="price"
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="number"
                    {...register('discountPercentage',{required:'discountPercentage is required',
                      min:0,
                      max:100
                    })}
                    id="discountPercentage"
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="number"
                    {...register('stock',{required:'stock is required',
                      min:0
                    })}
                    id="stock"
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    {...register('thumbnail',{required:'thumbnail is required'})}
                    id="thumbnail"
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                 Image 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    {...register('image1',{required:'image1 is required'})}
                    id="image1"
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                 Image 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  
                  <input
                    type="text"
                    {...register('image2',{required:'image2 is required'})}
                    id="image2"
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                 Image 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  
                  <input
                    type="text"
                    {...register('image3',{required:'image3 is required'})}
                    id="image3"
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>
            </div>

            
          </div>
        </div>

        

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
          

          <div className="mt-10 space-y-10">
            
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
     );
}

export default ProductForm;