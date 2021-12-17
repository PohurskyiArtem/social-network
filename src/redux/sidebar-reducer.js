const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

let initialState = {
    isSidebarOpen: false,
    friendsList: [
        {
          id: 1,
          name: "Dimych"
        },
        {
          id: 2,
          name: "Artem"
        },
        {
          id: 3,
          name: "Nastya"
        },
        {
          id: 4,
          name: "Olga"
        },
        {
          id: 5,
          name: "Lesha Domachuk"
        }
      ]
}

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
    return {
      ...state,
      isSidebarOpen: typeof(action.payload) === 'boolean' ? action.payload : !state.isSidebarOpen
    }

    default:
       return state;
  }
}

export const toggleSidebarAC = (isOpen) => ({
  type: TOGGLE_SIDEBAR,
  payload: isOpen
});

export const toggleSidebar = (isOpen) => dispatch => {
  dispatch(toggleSidebarAC(isOpen));
}

export default sidebarReducer;