import UserOrders from "../features/user/components/UserOrders";
import NavBar from "../features/navbar/Navbar";
function UserOrdersPage() {
    return (
        <div>
            <NavBar>
                <h1 className='mx-auto text-2'>My Orders</h1>
                <UserOrders></UserOrders>
            </NavBar>
        </div>
      );
}

export default UserOrdersPage;