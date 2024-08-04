export const PricingPlan = () => {
    try {
        const PricingStructure = [
            {
                link: "https://buy.stripe.com/test_3csaFsaaT9Jr19u5kl",
                price: 7.99,
                priceId: "price_1PewQ0IYLEnwtteBKeSOr7Nb",
                duration: "Monthly",
                feature: [
                    {
                        list: "Build forms effortlessly with intuitive."
                    },
                    {
                        list: "AI-Powered Smart Fields"
                    },
                    {
                        list: "24/7 Customer Support"
                    },
                    {
                        list: "Integration Options"
                    },
                    {
                        list: "Analytics and Reporting"
                    },
                    {
                        list: "Customizable Templates"
                    },
                    {
                        list: "Data Security and Privacy"
                    }
                ]

            },
            {
                link: "https://buy.stripe.com/test_4gw00Odn508R05qcMM",
                price: 49.00,
                priceId: "price_1PewMJIYLEnwtteBFGzlqpJg",
                duration: "Yearly",
                feature: [
                    {
                        list: "Build forms effortlessly with intuitive."
                    },
                    {
                        list: "AI-Powered Smart Fields"
                    },
                    {
                        list: "24/7 Customer Support"
                    },
                    {
                        list: "Integration Options"
                    },
                    {
                        list: "Analytics and Reporting"
                    },
                    {
                        list: "Customizable Templates"
                    },
                    {
                        list: "Data Security and Privacy"
                    },
                    {
                        list: "Advanced Analytics"
                    },
                    {
                        list: "Priority Support"
                    },
                    {
                        list: "Advanced Reporting"
                    }
                ]

            }
        ]

        return PricingStructure;

    } catch (error) {
        console.log(error);
    }
}