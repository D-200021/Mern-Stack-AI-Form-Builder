import React, { useEffect, useState } from 'react';
import "./Upgrade.css";
import { PricingPlan } from '../../../data/PricingPlan'; // Assuming this imports your pricing data

const Upgrade = () => {
    const [pricePlans, setPricePlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null); // State to track selected plan
    const userDetail = localStorage.getItem("user");
    const { email } = userDetail ? JSON.parse(userDetail) : {};

    useEffect(() => {
        const data = PricingPlan(); // Assuming PricingPlan is a function that fetches pricing data
        setPricePlans(data);
    }, []);

    const handlePlanSelect = (index) => {
        setSelectedPlan(index); // Update selected plan state
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                    {pricePlans.map((plan, index) => (
                        <div key={index} className={`rounded-2xl border p-6 shadow-sm ${selectedPlan === index ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-200'} sm:order-last sm:px-8 lg:p-12`}>
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-900">
                                    {plan.duration}
                                    <span className="sr-only">Plan</span>
                                </h2>
                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {plan.price}$ </strong>
                                    <span className="text-sm font-medium text-gray-700">/{plan.duration}</span>
                                </p>
                            </div>

                            <div className="mt-6 space-y-2">
                                {plan.feature.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-indigo-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <span className="text-gray-700">{feature.list}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href={`${plan.link}?prefilled_email=${email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`mt-8 block rounded-full border ${selectedPlan === index ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700' : 'border-gray-200 bg-white text-indigo-600 hover:bg-indigo-100 hover:ring-1 hover:ring-indigo-600'} px-12 py-3 text-center text-sm font-medium focus:outline-none focus:ring active:text-indigo-500`}
                                style={{ marginTop: '1rem' }} // Adding inline style for margin-top
                                onClick={() => handlePlanSelect(index)} // Handle click to select plan
                            >
                                {selectedPlan === index ? <div style={{ color: "#ffffff" }}>Selected</div> : <div>Select</div>}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Upgrade;
