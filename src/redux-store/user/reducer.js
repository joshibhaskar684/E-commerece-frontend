

export const UserReducer = (state = { user: null }, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { user: action.payload };
      default:
        return state;
    }
}



