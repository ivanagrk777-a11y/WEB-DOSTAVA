export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {

    // Ukupna cena proizvoda
    state.itemsPrice = addDecimal(
        state.cartItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
        )
    );

    // Cena dostave
    state.shippingPrice = addDecimal(
        state.itemsPrice > 1500 ? 0 : 250
    );

    // Porez
    state.taxPrice = addDecimal(
        Number((0.15 * state.itemsPrice).toFixed(2))
    );

    // Ukupna cena
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
};