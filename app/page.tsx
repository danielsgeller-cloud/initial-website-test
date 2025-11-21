export default function Page() {
  return (
    <div className="home">
      <h1>Welcome to Pictures in Ceramic</h1>
      <p className="lead">
        Custom enamel portrait cameos for headstones, memorials, and keepsakes.
      </p>

      <section className="home-section">
        <h2>What we do</h2>
        <p>
          We transform your photographs into durable enamel portraits that
          withstand weather, sunlight, and time. Each piece is color balanced,
          kiln fired, and inspected by hand.
        </p>
      </section>

      <section className="home-section">
        <h2>Why families choose us</h2>
        <ul>
          <li>Over 30 years of experience with memorial ceramics</li>
          <li>Careful color matching for natural skin tones and details</li>
          <li>Multiple sizes and shapes to fit most headstone designs</li>
          <li>Worldwide shipping to monument companies and families</li>
        </ul>
      </section>

      <section className="home-section">
        <h2>Ready to order</h2>
        <p>
          When you are ready, visit the <a href="/contact">Order Form</a> page
          to send us your photo and inscription details.
        </p>
      </section>
    </div>
  );
}
