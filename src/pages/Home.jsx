const Home = () => {
  return (
    <div>
      <h1>首页</h1>
      <p>欢迎来到 Shelter</p>
      <Profile />
    </div>
  );
};
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default Home;
