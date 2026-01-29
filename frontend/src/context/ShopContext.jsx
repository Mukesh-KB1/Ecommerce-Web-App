import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('') //Not used rightNow tried Fro cartLogic


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("Please select product size")
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;   //Ex- [abbc][M] = 0; delete //3 update in cartItems

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find(product => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }

                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])

    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            // console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getuserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    useEffect(() => {
        if (token) {
            getuserCart(token);      // load cart from DB
        } else {
            setCartItems({});        // clear cart on logout
        }
    }, [token]);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        // const savedUserId = localStorage.getItem('userId');

        if (savedToken) {
            setToken(savedToken);
        }

        // if (savedToken && savedUserId) {
        // setToken(savedToken);
        // setUserId(savedUserId);
        // }
    }, []);

    //to check if userLoggedin if yes then checkFor if user have any stored CartItems in localStoarage if yes then Update the cartItems or else {}
    // useEffect(() => {
    //     if (token && userId) {
    //         const storedCart = localStorage.getItem(`cart_${userId}`);
    //         setCartItems(storedCart ? JSON.parse(storedCart) : {});
    //     } else {
    //         setCartItems({});
    //     }
    // }, [token, userId]);


    //save only loggedinUser Data in localstorage (specific cartItems for each loggedIn User)
    // useEffect(() => {
    //     if (token && userId) {
    //         localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    //     }
    // }, [cartItems, token, userId]);


    const value = {
        currency, delivery_fee, products, search, setSearch, showSearch, setShowSearch, addToCart,
        cartItems, setCartItems, getCartCount, updateQuantity, getCartAmount, backendUrl, token, setToken, userId, setUserId
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

export const UseShopContext = () => {
    return useContext(ShopContext);
}