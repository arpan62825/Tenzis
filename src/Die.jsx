export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#48C968" : "white",
  };

  return (
    <section className="die-section">
      <button
        style={style}
        onClick={() => props.handleClick(props.id)}
        key={props.id}
      >
        {props.value}
      </button>
    </section>
  );
}
