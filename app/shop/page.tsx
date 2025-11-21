export default function ShopPage() {
  return (
    <div className="page">
      <h1>Shop</h1>
      <p className="lead">
        This is a placeholder shop page. For now, please use the Order Form to
        request pricing for specific sizes and quantities.
      </p>

      <section className="home-section">
        <h2>Typical options</h2>
        <ul>
          <li>Oval cameos in several standard sizes</li>
          <li>Rectangular and custom shapes on request</li>
          <li>Black and white or full color finishes</li>
          <li>Volume pricing for monument shops</li>
        </ul>
      </section>

      <p>
        To begin an order, go to the <a href="/contact">Order Form</a> page and
        describe what you need. We will reply with a quote and timeline.
      </p>
    </div>
  );
}
