import produce from "immer";
const initialState = {
  allNewsData: null,
  categoryData: null,
};

const fireBaseData = (state = initialState, action) => {
  switch (action.type) {
    case "getNewsData":
      return {
        ...state,
        allNewsData: action.payload.data,
      };
    case "setCatgeoryData":
      return {
        ...state,
        categoryData: action.payload.data,
      };
    case "likesData":
      return produce(state, (draftState) => {
        draftState.allNewsData[action.payload.index]["like"] =
          action.payload.like;
      });
    case "CommentsData":
      return produce(state, (draftState) => {
        draftState.allNewsData[action.payload.index]["comments"] =
          action.payload.commentsData;
      });
    default:
      return state;
  }
};
export default fireBaseData;
