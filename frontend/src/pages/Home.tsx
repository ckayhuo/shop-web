import "../utilities/Style.css";

export function Home() {
  return (
    <div className="home-container">
      <div className="main-content">
        <div>
          <h1>Welcome to Kay's Store</h1>
          <p>
            <a href="/store" className="store-link">
              Start Shopping
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
