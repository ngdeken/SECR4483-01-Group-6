import React, { useState } from 'react';
import Sidebar from '../../Components/CustomerSidebar';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Pagination from "@/Components/Pagination";
import {
    REPORT_STATUS_CLASS_MAP,
    REPORT_STATUS_TEXT_MAP,
  } from "@/constants.jsx";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import '../../../css/StudentReport.css';

const CustomerOrderView = ({ auth, orders, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
        queryParams[name] = value;
        } else {
        delete queryParams[name];
        }

        router.get(route("customer.orders.index"), queryParams);
        /*const url = new URL(route("student.appliance"), window.location.origin);
        url.protocol = 'https:';
        router.get(url.toString(), queryParams);*/
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
    
        searchFieldChanged(name, e.target.value);
      };

    const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
          queryParams.sort_direction = "desc";
        } else {
          queryParams.sort_direction = "asc";
        }
      } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
      }
      router.get(route("customer.orders.index"), queryParams);
     /* const url = new URL(route("student.appliance"), window.location.origin);
      url.protocol = 'https:';
      router.get(url.toString(), queryParams);*/
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>View Order</h1>
                    <a href={route("customer.orders.create")} className="view-report-link">Make order</a>
                </header>
                <table>
                    <thead>
                        <tr className="text-nowrap">
                        <TableHeading
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                        ID
                        </TableHeading>
                        <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Date/Time
                        </TableHeading>
                        <TableHeading
                            name="userID"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            User
                        </TableHeading>
                        <TableHeading
                            name="block"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Address
                        </TableHeading>
                        <TableHeading
                            name="pizzaID"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Pizza
                        </TableHeading>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <thead>
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3">
                            <SelectInput
                            className="w-full"
                            defaultValue={queryParams.status}
                            onChange={(e) =>
                                searchFieldChanged("status", e.target.value)
                            }
                            >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            </SelectInput>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data.map((order) => (
                            <tr key={order.id}>
                                <td className='px-3 py-2'>{order.id}</td>
                                <td className='px-4 py-4'>{new Date(order.created_at).toLocaleString()}</td>
                                <td className='px-3 py-2'>{order.userID.name}</td>
                                <td className='px-2 py-2'>{order.address}</td>
                                <td className='px-3 py-2'>{order.pizzaID.name}</td>
                                <td className='px-4 py-4'>{order.quantity}</td>
                                <td className='px-4 py-4'>{order.price}</td>
                                <td className='px-3 py-2'>
                                    <span
                                        className={
                                        "px-2 py-1 rounded text-white " +
                                        REPORT_STATUS_CLASS_MAP[order.status]
                                        }
                                    >
                                        {REPORT_STATUS_TEXT_MAP[order.status]}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={orders.meta.links} />
            </div>
        </div>
    );
};

export default CustomerOrderView;
