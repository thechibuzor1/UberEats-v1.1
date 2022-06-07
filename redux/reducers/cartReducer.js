let defaultState = {
  selectedItems: { items: [], restaurantName: "" },
};
let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };
      if (action.payload.checkboxValue) {
        console.log("ADD TO CART");

        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        console.log("REMOVE FROM CART");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
      console.log(newState);
      return newState;
    }
    case "ADD_QUANTITY": {
      let item_state = { ...state };
      /*  item_state.selectedItems = {
        items: [
          ...item_state.selectedItems.items.map((item) =>
            item.id === action.id
              ? {
                  qty: item.qty + 1,
                }
              : item
          ),
        ],
      }; */
      if (action.payload.checkboxValue) {
        item_state.selectedItems = {
          items: [
            ...item_state.selectedItems.items.map((item) =>
              item.title === action.payload.title
                ? {
                    ...item,
                    qty: item.qty + 1,
                  }
                : item
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };

        console.log(item_state);
        return item_state;
      }
    }
    case "SUB_QUANTITY": {
      let item_state = {...state};
      if (action.payload.checkboxValue) {
        item_state.selectedItems = {
          items: [
            ...item_state.selectedItems.items.map((item) =>
              item.title === action.payload.title
                ? {
                    ...item,
                    qty: item.qty !== 1 ? item.qty - 1 : 1,
                  }
                : item
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };

        console.log(item_state);
        return item_state;
      }
    }
    
    
    default:
      return state;
  }
};

export default cartReducer;
