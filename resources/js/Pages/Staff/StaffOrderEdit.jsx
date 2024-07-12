import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Sidebar from '../../Components/StaffSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentApplianceCreate.css';
import '../../../css/StudentReport.css';

const StaffOrderEdit = ({auth, order}) => {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        userID: order.userID,
        address: order.address,
        quantity: order.quantity,
        status: order.status || "",
        _method: "PUT",
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("staff.orders.update", order.id));
    };

    return (
        <div className="app-container">
                <Sidebar user={auth.user}/>
            <div className="appliance-form-container">
                <header className="appliance-form-header">
                    <h1>Update Order {order.id}</h1>
                    <a href={route("staff.orders.index")} className="view-report-link">View Orders</a>
                </header>
                <form onSubmit={handleSubmit}>
                <label>
                    1. User
                    <div>{order.userID.name}</div>
                </label>
                <label>
                    <div className="mt-8"></div>
                    2. Address
                    <div>{order.address}</div>
                </label>
                <label>
                    <div className="mt-8"></div>
                    3. Order
                    <div>{order.pizzaID.name}  {order.quantity}</div>
                </label>
                <div className="mt-8">
                    <label>
                    4. Manage status
                    <div>
                    <select name="status" onChange={(e) => setData("status", e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    </div>
                    </label>
                 </div>
                    <button type="submit" className="submit-button" disabled={processing}>
                        Submit
                    </button>
                </form>
                {errors.quantities && <div className="error">{errors.quantities}</div>}
            </div>
        </div>
    );
};

export default StaffOrderEdit;
