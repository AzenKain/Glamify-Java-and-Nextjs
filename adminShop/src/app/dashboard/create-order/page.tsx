"use client";
import { AddListProduct } from '@/app/redux/features/product/product.redux';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { createOrderApi, getAllProductApi, makeRequestApi } from '@/lib/api';
import { orderCreateDto, orderDetailDto } from '@/lib/dtos/order';
import { OrderType } from '@/types/order';
import { ProductType } from '@/types/product';
import { useSession } from 'next-auth/react';
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { toast } from 'react-toastify';


const OrderCreateForm: React.FC = () => {
    const [order, setOrder] = useState<orderCreateDto>({
        totalAmount: 0,
        listProducts: [],
        notes: '',
        deliveryType: '',
        city: '',
        district: '',
        address: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [currentProduct, setCurrentProduct] = useState<Omit<orderDetailDto, 'productId' | 'productName'>>({
        quantity: 1,
        size: '',
        color: ''
    });
    const { data: session } = useSession()
    const productList = useAppSelector((state) => state.ProductRedux.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData: ProductType[] = await getAllProductApi();
                dispatch(AddListProduct(responseData));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [dispatch])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
        if (name == "deliveryType") {
            setOrder(prev => ({
                ...prev,
                totalAmount: (prev.totalAmount ?? 0) + (value === "standard" ? 20000 : value === "express" ? 40000 : 0)
            }));
        }
    };

    const filteredProducts = productList.filter(product =>
        product.productName?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setSelectedProduct(null);
    };

    const handleProductSelect = (product: ProductType) => {
        setSelectedProduct(product);
        setSearchTerm(product.productName);
    };

    const handleProductDetailsChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value
        }));
    };

    const addProduct = () => {
        if (selectedProduct && currentProduct.quantity) {
            const newProduct: orderDetailDto = {
                productId: selectedProduct.id || "",
                productName: selectedProduct.productName || "",
                quantity: currentProduct.quantity,
                size: currentProduct.size,
                color: currentProduct.color
            };

            setOrder(prev => ({
                ...prev,
                listProducts: [...(prev.listProducts || []), newProduct],
                totalAmount: (prev.totalAmount || 0) + (selectedProduct.price * (currentProduct.quantity || 0))
            }));

            // Reset states
            setSelectedProduct(null);
            setSearchTerm('');
            setCurrentProduct({
                quantity: 1,
                size: '',
                color: ''
            });
        }
    };

    const removeProduct = (index: number) => {
        const removedProduct = order?.listProducts?.[index] ?? null;
        const productToRemove = productList.find(p => p.id === removedProduct?.productId);

        setOrder(prev => ({
            ...prev,
            listProducts: prev.listProducts?.filter((_, i) => i !== index) ?? [],
            totalAmount: (prev.totalAmount ?? 0) - (productToRemove ? productToRemove.price * (removedProduct?.quantity ?? 0) : 0)
        }));
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataOrder: OrderType = await makeRequestApi(
            createOrderApi,
            order,
            session?.refresh_token,
            session?.access_token,
        );
        if (!dataOrder) {
            toast.error("Failed to update order!");
            return;
        }


        toast.success("Update order successfully!");
        setOrder({
            totalAmount: 0,
            listProducts: [],
            notes: '',
            deliveryType: '',
            city: '',
            district: '',
            address: '',
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: ''
        })
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4">
                <div className="card border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Create New Order</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Personal Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">First Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={order.firstName}
                                        onChange={handleInputChange}
                                        placeholder="First Name"
                                        className="input input-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Last Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={order.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Last Name"
                                        className="input input-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={order.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="input input-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={order.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        className="input input-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Delivery Type</span>
                                </label>
                                <select
                                    name="deliveryType"
                                    value={order.deliveryType}
                                    onChange={handleInputChange}
                                    className="select select-bordered  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                >
                                    <option value="">Select Delivery Type</option>
                                    <option value="standard">Standard Delivery</option>
                                    <option value="express">Express Delivery</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">City</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={order.city}
                                        onChange={handleInputChange}
                                        placeholder="City"
                                        className="input input-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">District</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={order.district}
                                        onChange={handleInputChange}
                                        placeholder="District"
                                        className="input input-bordered  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={order.address}
                                    onChange={handleInputChange}
                                    placeholder="Detailed Address"
                                    className="input input-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            {/* Product Search and Addition */}
                            <div className="border p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Add Products</h3>

                                {/* Product Search */}
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Search Product</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            placeholder="Search product by name"
                                            className="input input-bordered w-full border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {searchTerm && !selectedProduct && (
                                            <ul className="absolute z-10 bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto w-full">
                                                {filteredProducts.map(product => (
                                                    <li
                                                        key={product.id}
                                                        onClick={() => handleProductSelect(product)}
                                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {product.productName} - ${product.price}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                {/* Product Details Input */}
                                {selectedProduct && (
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Quantity</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={currentProduct.quantity}
                                                onChange={handleProductDetailsChange}
                                                placeholder="Quantity"
                                                min="1"
                                                className="input input-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Size</span>
                                            </label>
                                            <select
                                                name="size"
                                                value={currentProduct.size}
                                                onChange={handleProductDetailsChange}
                                                className="select select-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            >
                                                <option value="">Select Size</option>
                                                {selectedProduct?.size?.map(size => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Color</span>
                                            </label>
                                            <select
                                                name="color"
                                                value={currentProduct.color}
                                                onChange={handleProductDetailsChange}
                                                className="select select-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            >
                                                <option value="">Select Color</option>
                                                {selectedProduct?.color?.map(color => (
                                                    <option key={color} value={color}>{color}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {/* Add Product Button */}
                                {selectedProduct && (
                                    <button
                                        type="button"
                                        onClick={addProduct}
                                        className="btn btn-primary w-full"
                                        disabled={
                                            currentProduct.quantity === 0
                                            || currentProduct.color === ""
                                            || currentProduct.size === ""
                                            || selectedProduct.stockQuantity === 0
                                        }
                                    >
                                        Add Product
                                    </button>
                                )}
                            </div>

                            {/* Added Products List */}
                            {order?.listProducts && order.listProducts?.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Added Products</h3>
                                    {order.listProducts.map((product, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center bg-base-200 p-2 rounded mb-2"
                                        >
                                            <span>
                                                {product.productName} |
                                                Quantity: {product.quantity} |
                                                Size: {product.size} |
                                                Color: {product.color}
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-error btn-sm"
                                                onClick={() => removeProduct(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Notes */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Additional Notes</span>
                                </label>
                                <textarea
                                    name="notes"
                                    value={order.notes}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder="Additional Notes (Optional)"
                                ></textarea>
                            </div>

                            {/* Total Amount */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Total Amount</span>
                                </label>
                                <div className="input input-bordered border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                                    {(order.totalAmount ?? 0).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </div>
                            </div>


                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Create Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default OrderCreateForm;