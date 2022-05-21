import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";
const OrderDetails = createContext()

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount)
}

export const useOrderDetails = () => {
    const context = useContext(OrderDetails)

    if (!context) {
        throw new Error('userOderDetails must be used within an OrderDetailsProvider')
    }
    return context
}

const calculateSubtotal = (optionType, optionCounts) => {
    let optionCount = 0
    for (const count of optionCounts[optionType].values()) {
        optionCount += count
    }

    return optionCount * pricePerItem[optionType]
}

export const OrderDetailsProvider = (props) => {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    })

    const zeroCurrency = formatCurrency(0)

    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    })

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts)
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts)
        const grandTotal = scoopsSubtotal + toppingsSubtotal

        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal)
        })
    }, [optionCounts])


    const value = useMemo(() => {
        const updateItemCount = (itemName, newItemCount, optionType) => {
            const newOptionCounts = { ...optionCounts }

            const optionCountsMap = optionCounts[optionType]
            optionCountsMap.set(itemName, parseInt(newItemCount))
            setOptionCounts(newOptionCounts)
        }

        return [{ ...optionCounts, totals }, updateItemCount]
    }, [optionCounts, totals])

    return <OrderDetailsProvider value={value} {...props} />
}

export { OrderDetailsProvider, useOrderDetails }