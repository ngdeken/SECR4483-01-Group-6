import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Sidebar from '../../Components/CustomerSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentApplianceCreate.css';
import '../../../css/StudentReport.css';

const CustomerOrder = ({auth}) => {
    const { pizzas } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        address: '',
        status: 'pending',
        quantities: {},
    });

    useEffect(() => {
        const initialQuantities = pizzas.reduce((acc, pizza) => {
            acc[pizza.id] = 0;
            return acc;
        }, {});
        setData('quantities', initialQuantities);
    }, [pizzas]);

    const handleQuantityChange = (id, value) => {
        const quantity = parseInt(value) || 0;
        setData('quantities', {
            ...data.quantities,
            [id]: quantity,
        });
    };

    const calculateTotalCost = () => {
        return pizzas.reduce((total, pizza) => {
            const quantity = data.quantities[pizza.id] || 0;
            return total + pizza.price * quantity;
        }, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('customer.orders.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="appliance-form-container">
                <header className="appliance-form-header">
                    <h1>Order</h1>
                    <a href={route("customer.orders.index")} className="view-report-link">View Orders</a>
                </header>
                <form onSubmit={handleSubmit}>
                    <label>
                   
                        1. Address
                        <div>
                            <input type="text" name="address" value={data.address} onChange={(e) => setData("address", e.target.value)} />
                        </div>
                    </label>
                    <div className="mt-8">
                    <table>
                        <thead>
                            <tr>
                                <th>Pizzas</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pizzas.map((pizza) => (
                                <tr key={pizza.id}>
                                    <td>{pizza.name}</td>
                                    <td>RM{pizza.price}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.quantities[pizza.id] || ''}
                                            onChange={(e) => handleQuantityChange(pizza.id, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    <div className="total-cost">
                        <strong>Total: RM {calculateTotalCost().toFixed(2)}</strong>
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

export default CustomerOrder;
