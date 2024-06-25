import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {ITEMS_PER_PAGE,discountedPrice} from "../../../app/constants";
import { fetchAllOrdersAsync,selectTotalOrders,selectOrders,updateOrderAsync } from "../../order/orderSlice";
import { set } from "react-hook-form";
import Pagination from "../../common/Pagination";
import { ArrowDownIcon,ArrowUpIcon } from "@heroicons/react/20/solid";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId,setEditableOrderId] = useState(-1);
  const [sort,setSort] = useState({});

  const handleShow = (order) => {
    console.log("handleEdit");
  }
  const handleEdit = (order) => {
    
    setEditableOrderId(order.id);
  }

  const handleUpdate = (e,order) => {
    const updatedOrder = {...order,status:e.target.value};
    dispatch(updateOrderAsync({id:order.id,order:updatedOrder}));
    setEditableOrderId(-1);
    
  }

  const handlePage = (page) => {
    setPage(page);
    
  }

  const handleSort = (sortOption) => {
    const sort={_sort:sortOption.sort,_order:sortOption.order};
    console.log({sort});
    setSort(sort);
  }

  const chooseColor = (status) => {
    switch(status){
      case 'pending': return 'bg-yellow-200 text-yellow-600 ';
      case 'shipped': return 'bg-blue-200 text-blue-600';
      case 'delivered': return 'bg-green-200 text-green-600';
      case 'cancelled': return 'bg-red-200 text-red-600 ';
      default: return 'bg-gray-500 text-gray-50';
    }
  }

 
  useEffect(() => {
    const pagination = {_page:page,_limit:ITEMS_PER_PAGE};
    
    dispatch(fetchAllOrdersAsync({sort,pagination}));
  }, [dispatch,page,sort]);
   
   return (
<>
  <link
    href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
    rel="stylesheet"
  />
  <link
    href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
    rel="stylesheet"
  />
  <div className="flex items-center justify-center bg-gray-900">
    <div className="col-span-12">
      <div className="overflow-auto lg:overflow-visible ">
        <table className="table text-gray-400 border-separate space-y-6 text-sm">
          <thead className="bg-gray-800 text-gray-500">
            <tr>
              <th className="p-3 text-left cursor-pointer"
               onClick={(e)=>
               handleSort({
                sort:'id',
                order:sort?._order==='asc'?'desc':'asc',
                })}>
                Order# {''}
                {sort._sort==='id' &&
                (sort._order==='asc'?
                 ( <ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>)
                :(<ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>)
                )}
                </th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left cursor-pointer"
               onClick={(e)=>
               handleSort({
                sort:'totalAmount',
                order:sort?._order==='asc'?'desc':'asc',
                })}>
                Total Amount {''}
                {sort._sort==='totalAmount' &&
                (sort._order==='asc'?
                 ( <ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>)
                :(<ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>)
                )}
              </th>
              <th className="p-3 text-left">Shipping Address</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
           {orders.map(order=><tr className="bg-gray-800">                          
              <td className="p-3">{order.id}</td>
              <td className="p-3">
                {order.order.items.map(item=>
                <div className="flex align-items-center">
                  <img
                    className="rounded-full h-12 w-12  object-cover"
                    src={item.thumbnail}
                  />
                  <div className="ml-3">                    
                    <div className="p-3">{item.title} - #{item.quantity} - ${discountedPrice(item)}</div>
                  </div>
                </div>
                )}
              </td>              
              <td className="p-3 font-bold">${order.order.totalAmount}</td>
              <td className="p-3"><strong>{order.order.selectedAddress.name}</strong>,
              <br />
              {order.order.selectedAddress.street},
              <br />
              {order.order.selectedAddress.city},
              {order.order.selectedAddress.state},
              {order.order.selectedAddress.pinCode}</td>
              <td className="p-3 cursor-pointer" >
                {order.id===editableOrderId?(
                  <select onChange={e=>handleUpdate(e,order)}>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                ):(
                  <span className={`${chooseColor(order.order.status)} rounded-md px-2`}>
                  {order.order.status}
                </span>
                
                  )}
              </td>
              <td className="p-3 ">
                <div className="text-gray-400 hover:text-gray-100 mr-2">
                  <i className="material-icons-outlined text-base" onClick={e=>handleShow(order)}>
                    visibility
                  </i>
                </div>
                <div className="text-gray-400 hover:text-gray-100  mr-4">
                  <i className="material-icons-outlined text-base " onClick={e=>handleEdit(order)}>edit</i>
                </div>
                {/* <a href="#" className="text-gray-400 hover:text-gray-100  ml-2">
                  <i className="material-icons-round text-base">
                    delete_outline
                  </i>
                </a> */}
              </td>
            </tr>)}
            
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
  <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders}></Pagination>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n\t.table {\n\t\tborder-spacing: 0 15px;\n\t}\n\n\ti {\n\t\tfont-size: 1rem !important;\n\t}\n\n\t.table tr {\n\t\tborder-radius: 20px;\n\t}\n\n\ttr td:nth-child(n+5),\n\ttr th:nth-child(n+5) {\n\t\tborder-radius: 0 .625rem .625rem 0;\n\t}\n\n\ttr td:nth-child(1),\n\ttr th:nth-child(1) {\n\t\tborder-radius: .625rem 0 0 .625rem;\n\t}\n"
    }}
  />
</>
      );
}

export default AdminOrders ;