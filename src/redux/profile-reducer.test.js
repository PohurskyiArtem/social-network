import profileReducer, { addPost, deletePost } from "./profile-reducer";

let state = {
  postsData: [
    {
      id: 1,
      postText: "It's my first post!"
    },
    {
      id: 2,
      postText: "Hi? how are you?"
    },
    {
      id: 3,
      postText: "Kak menya vse zaebalo, hochu obratno domoy v Japan"
    },
  ]
};


it('message of new post should be correct', () => {
  let action = addPost("avatar", "some-text");
  let newState = profileReducer(state, action);
  expect(newState.postsData[3].postText).toBe("some-text");
})

it('length of post should be incremented', () => {
  let action = addPost("avatar", "some-text");

  let newState = profileReducer(state, action);
  expect(newState.postsData.length).toBe(4);
})

it('after deleting length of posts should be decremented', () => {
  let action = deletePost(1);

  let newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(2);
})