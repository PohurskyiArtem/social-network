const ADD_MESSAGE = "ADD-MESSAGE-TO-DIALOG_TEST";

let initialState = {
  dialogsData: [
    {
      id: 1,
      userId: 2, 
      name: "Dimych",
    },
    {
      id: 2,
      userId: 99992, 
      name: "Nastya",
    },
    {
      id: 3,
      userId: 99993, 
      name: "Artem",
    },
    {
      id: 4,
      userId: 99994, 
      name: "Lesha Domachuk",
    },
    {
      id: 5,
      userId: 99995, 
      name: "Olga",
    },
  ],
  messagesData: [
    {
      messageId: 1,
      dialogsId: 1,
      userId: 18640,
      messageText: "Hello Dimych!",
    },
    {
      messageId: 2,
      dialogsId: 1,
      userId: 2,
      messageText: "Hi Artem!",
    },
    {
      messageId: 3,
      dialogsId: 1,
      userId: 2,
      messageText: "How are you?",
    },
    {
      messageId: 4,
      dialogsId: 4,
      userId: 99994,
      messageText: "Здравстуйте! Меня зовут Алексей, я представитель компании Орифлейм. Есть выгодное предложения для вас, от которого вы не сможете отказаться =)",
    },
    {
      messageId: 5,
      dialogsId: 5,
      userId: 99995,
      messageText: "JavaScript is my favorite programming language",
    },
    {
      messageId: 6,
      dialogsId: 5,
      userId: 18640,
      messageText: "My to =))",
    }
  ]
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messagesData: [...state.messagesData, {
          messageId: state.messagesData.length + 1,
          dialogsId: action.dialogsId,
          userId: action.userId,
          messageText: action.messageText
        }]
      };

    default:
      return state;
  }
};

export default dialogsReducer;

const addMessage = (dialogsId, userId, messageText) => ({ type: ADD_MESSAGE, dialogsId, userId, messageText });

export const createMessage = (dialogsId, messageText) => (dispatch, getState) => {
  const userId = getState().auth.userId;
  dispatch(addMessage(dialogsId, userId, messageText))
}